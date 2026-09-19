import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { PORTFOLIO_SYSTEM_INSTRUCTION, getFallbackAnswer } from './server/portfolioKnowledge';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Lazy initialize Gemini client to avoid crashes if key is missing on startup
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

// AI Chat Endpoint powered by Gemini API (gemini-3.8-flash)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body as {
      message?: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'A valid message string is required.' });
      return;
    }

    const trimmedMessage = message.trim();
    const ai = getGeminiClient();

    // If no Gemini API key is configured, respond with the grounded knowledge base fallback
    if (!ai) {
      console.warn('[Gemini API] GEMINI_API_KEY not configured. Using portfolio fallback.');
      const fallbackReply = getFallbackAnswer(trimmedMessage);
      res.json({
        reply: fallbackReply,
        source: 'portfolio-data-offline',
      });
      return;
    }

    // Build conversation contents for multi-turn chat if history exists
    const contentsPayload: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

    if (Array.isArray(history) && history.length > 0) {
      // Limit history to last 10 turns to keep token usage lean
      const recentHistory = history.slice(-10);
      for (const item of recentHistory) {
        if (item.content && (item.role === 'user' || item.role === 'model')) {
          contentsPayload.push({
            role: item.role,
            parts: [{ text: item.content }],
          });
        }
      }
    }

    // Append the latest user query
    contentsPayload.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    // Call Gemini 3.8 Flash model, with fallback to gemini-3.1-flash-lite if rate-limited or high demand
    let replyText = '';
    let usedModel = 'gemini-3.8-flash';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentsPayload,
        config: {
          systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      replyText = response.text?.trim() || '';
    } catch (primaryErr: any) {
      console.warn('[Gemini 3.8 Flash Warning]:', primaryErr?.message || primaryErr);
      // Attempt fallback to Gemini 3.1 Flash Lite
      try {
        const responseLite = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: contentsPayload,
          config: {
            systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        replyText = responseLite.text?.trim() || '';
        usedModel = 'gemini-3.1-flash-lite';
      } catch (secondaryErr: any) {
        console.warn('[Gemini 3.1 Flash Lite Warning]:', secondaryErr?.message || secondaryErr);
      }
    }

    if (!replyText) {
      res.json({
        reply: getFallbackAnswer(trimmedMessage),
        source: 'portfolio-fallback',
      });
      return;
    }

    res.json({
      reply: replyText,
      source: usedModel,
    });
  } catch (error: any) {
    console.error('[Gemini API Error]:', error);
    // Gracefully provide a helpful fallback answer grounded in portfolio data
    const userMessage = typeof req.body?.message === 'string' ? req.body.message : '';
    res.json({
      reply: getFallbackAnswer(userMessage),
      source: 'portfolio-data-fallback',
      notice: 'Answered via Kim San Portfolio Knowledge Base.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
