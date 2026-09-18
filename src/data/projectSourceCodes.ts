/**
 * Real Production-Grade Source Code Samples for Portfolio Projects
 * Allows visitors to inspect full file trees, copy code, download files, and run simulations.
 */

export interface SourceFile {
  filename: string;
  language: 'typescript' | 'javascript' | 'python' | 'php' | 'sql' | 'markdown' | 'json';
  code: string;
  description: string;
  size: string;
}

export interface ProjectSourceCode {
  projectId: number;
  projectTitle: string;
  architectureSummary: string;
  simulationOutput: {
    command: string;
    logs: string[];
    benchmark: string;
  };
  files: SourceFile[];
}

export const PROJECT_SOURCE_CODES: Record<number, ProjectSourceCode> = {
  1: {
    projectId: 1,
    projectTitle: "CloudPulse AI SaaS Platform",
    architectureSummary:
      "Enterprise telemetry collector coupled with an autonomous Gemini LLM diagnostic agent that analyzes latency anomalies, reads cluster pod metrics, and auto-proposes mitigation strategies.",
    simulationOutput: {
      command: "npm run test:ai-agent -- --cluster=prod-us-west-01",
      logs: [
        "[INFO] Connecting to telemetry event stream at wss://telemetry.cloudpulse.internal...",
        "[EVENT] P99 latency spike detected on 'payment-worker-pod-4': 1420ms (Threshold: 450ms)",
        "[AI AGENT] Invoking Gemini Diagnostic Engine with 60s metric window...",
        "[AI AGENT] Tool Call: fetchPodMemory(clusterId='prod-us-west-01', pod='payment-worker-pod-4')",
        "[ANALYSIS] Memory leak identified in Redis connection pool (idle sockets: 1,024 / max: 1,024).",
        "[RECOMMENDATION] Evict stagnant socket handles and scale pod replica from 3 -> 5.",
        "[AUTO-HEAL] Executing mitigation webhook... Status 200 OK. Latency normalized to 112ms."
      ],
      benchmark: "Evaluation latency: 318ms | Agent accuracy: 99.4% | Memory footprint: 48MB"
    },
    files: [
      {
        filename: "server/ai/telemetryAgent.ts",
        language: "typescript",
        size: "2.8 KB",
        description: "Gemini AI Agent loop analyzing cluster telemetry anomalies with function calling.",
        code: `import { GoogleGenAI, Type } from '@google/genai';

interface AnomalyEvent {
  clusterId: string;
  metric: string;
  observedValue: number;
  baselineValue: number;
  timestamp: string;
}

export class TelemetryAgent {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Evaluates anomalous telemetry spikes and outputs structured remediation steps.
   */
  async diagnoseAnomaly(anomaly: AnomalyEvent) {
    const prompt = \`You are an expert SRE diagnostic agent.
Analyze the following telemetry anomaly:
- Cluster: \${anomaly.clusterId}
- Metric: \${anomaly.metric}
- Observed: \${anomaly.observedValue} (Normal: \${anomaly.baselineValue})
- Timestamp: \${anomaly.timestamp}

Determine root cause and return corrective actions in strict JSON format.\`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rootCause: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
            recommendedAction: { type: Type.STRING },
            autoRemediable: { type: Type.BOOLEAN },
          },
          required: ['rootCause', 'severity', 'recommendedAction', 'autoRemediable'],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  }
}`
      },
      {
        filename: "app/Http/Controllers/ClusterController.php",
        language: "php",
        size: "3.1 KB",
        description: "Laravel REST API Controller managing high-throughput telemetry ingestion.",
        code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Cluster;
use App\\Services\\TelemetryIngestionService;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Cache;

class ClusterController extends Controller
{
    protected TelemetryIngestionService $telemetryService;

    public function __construct(TelemetryIngestionService $telemetryService)
    {
        $this->telemetryService = $telemetryService;
    }

    /**
     * Ingest batch metrics with Redis pipeline buffer and anomaly trigger.
     */
    public function ingestMetrics(Request $request, string $clusterId): JsonResponse
    {
        $validated = $request->validate([
            'metrics' => 'required|array|min:1',
            'metrics.*.timestamp' => 'required|date',
            'metrics.*.cpu_utilization' => 'required|numeric|between:0,100',
            'metrics.*.memory_mb' => 'required|integer',
            'metrics.*.p99_latency_ms' => 'required|numeric',
        ]);

        $cluster = Cluster::where('uuid', $clusterId)->firstOrFail();

        $processed = $this->telemetryService->processBatch(
            $cluster, 
            $validated['metrics']
        );

        // Invalidate cached cluster summary
        Cache::tags(["cluster:{$clusterId}"])->forget('health_metrics');

        return response()->json([
            'success' => true,
            'ingested_records' => count($validated['metrics']),
            'anomalies_detected' => $processed['anomalies_count'],
        ], 202);
    }
}`
      },
      {
        filename: "database/migrations/create_clusters_table.sql",
        language: "sql",
        size: "1.4 KB",
        description: "PostgreSQL optimized telemetry and tenant schema with BRIN indexing.",
        code: `-- CloudPulse Telemetry & Cluster Architecture Migration
CREATE TABLE IF NOT EXISTS clusters (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    tenant_id BIGINT NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    cluster_name VARCHAR(100) NOT NULL,
    region VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS telemetry_records (
    id BIGSERIAL,
    cluster_uuid UUID NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL,
    cpu_percent NUMERIC(5,2) NOT NULL,
    memory_percent NUMERIC(5,2) NOT NULL,
    p99_latency_ms NUMERIC(8,2) NOT NULL,
    is_anomaly BOOLEAN NOT NULL DEFAULT FALSE
) PARTITION BY RANGE (recorded_at);

-- Create BRIN index for high-density chronological time-series
CREATE INDEX idx_telemetry_time_brin ON telemetry_records USING BRIN (recorded_at);`
      }
    ]
  },

  2: {
    projectId: 2,
    projectTitle: "DevFlow CI/CD Pipeline Visualizer",
    architectureSummary:
      "Directed Acyclic Graph (DAG) executor and real-time visualization canvas for automated build stages, parallel test runners, and multi-cloud rollback hooks.",
    simulationOutput: {
      command: "devflow execute --pipeline=deploy-production.yaml",
      logs: [
        "[DAG] Resolving dependencies for 6 stages...",
        "[STAGE 1/4] lint_applet & type_check: Passed (1.4s)",
        "[STAGE 2/4] parallel_unit_tests [Workers 1-4]: Passed 420 tests (3.2s)",
        "[STAGE 3/4] docker_build_multistage: Target 'dist/server.cjs' (4.1s)",
        "[STAGE 4/4] canary_deploy: 10% traffic routed. Healthchecks: 100% OK.",
        "[COMPLETE] Deployment complete with 0 failures."
      ],
      benchmark: "Total execution: 8.7s | Concurrency factor: 4x"
    },
    files: [
      {
        filename: "src/pipelines/dagEngine.ts",
        language: "typescript",
        size: "3.2 KB",
        description: "Topological sorting and concurrent execution engine for CI/CD tasks.",
        code: `export interface PipelineStage {
  id: string;
  name: string;
  dependsOn: string[];
  execute: () => Promise<void>;
}

export class DAGEngine {
  private stages: Map<string, PipelineStage> = new Map();

  register(stage: PipelineStage): void {
    this.stages.set(stage.id, stage);
  }

  /**
   * Computes topological execution order and identifies parallel execution sets.
   */
  getExecutionTiers(): PipelineStage[][] {
    const inDegree = new Map<string, number>();
    const dependents = new Map<string, string[]>();

    for (const [id, stage] of this.stages) {
      inDegree.set(id, stage.dependsOn.length);
      for (const dep of stage.dependsOn) {
        if (!dependents.has(dep)) dependents.set(dep, []);
        dependents.get(dep)!.push(id);
      }
    }

    const tiers: PipelineStage[][] = [];
    let ready = Array.from(this.stages.keys()).filter((id) => inDegree.get(id) === 0);

    while (ready.length > 0) {
      tiers.push(ready.map((id) => this.stages.get(id)!));
      const nextReady: string[] = [];

      for (const current of ready) {
        for (const next of dependents.get(current) || []) {
          inDegree.set(next, inDegree.get(next)! - 1);
          if (inDegree.get(next) === 0) {
            nextReady.push(next);
          }
        }
      }
      ready = nextReady;
    }

    return tiers;
  }
}`
      },
      {
        filename: "src/components/PipelineCanvas.tsx",
        language: "typescript",
        size: "2.4 KB",
        description: "Interactive SVG visualizer for active build pipelines.",
        code: `import React from 'react';

export interface NodeStatus {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration?: string;
}

export const PipelineCanvas: React.FC<{ nodes: NodeStatus[] }> = ({ nodes }) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto py-6 px-4 bg-slate-950 rounded-2xl border border-slate-800">
      {nodes.map((node, i) => (
        <React.Fragment key={node.id}>
          <div className="flex flex-col items-center p-3.5 rounded-xl bg-slate-900 border border-slate-700/70 min-w-[140px]">
            <span className="text-xs font-mono text-slate-400 mb-1">{node.id}</span>
            <span className="text-sm font-semibold text-white">{node.label}</span>
            <span className={\`text-[10px] mt-2 px-2 py-0.5 rounded-full font-mono \${
              node.status === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
              node.status === 'running' ? 'bg-indigo-500/20 text-indigo-400 animate-pulse' :
              'bg-slate-800 text-slate-400'
            }\`}>
              {node.status.toUpperCase()}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <div className="w-6 h-0.5 bg-slate-700 rounded-full" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};`
      }
    ]
  },

  3: {
    projectId: 3,
    projectTitle: "ApexCraft E-Commerce Engine",
    architectureSummary:
      "Enterprise Laravel backend featuring idempotent Stripe webhooks, distributed Redis inventory locking, and high-concurrency order placement queues.",
    simulationOutput: {
      command: "php artisan queue:work --queue=orders,payments",
      logs: [
        "[QUEUE] Processing job: ProcessStripePaymentWebhook",
        "[STRIPE] Event verified: 'checkout.session.completed' for session_id=cs_live_9921",
        "[INVENTORY] Acquired Redis lock: 'stock:item:4092' (TTL 5000ms)",
        "[INVENTORY] Deducted quantity 2. Remaining stock: 48.",
        "[DATABASE] Order #10849 status updated to PAID. Invoice email enqueued.",
        "[QUEUE] Finished job in 48ms."
      ],
      benchmark: "Throughput: 1,850 req/sec | Idempotency lock collisions: 0"
    },
    files: [
      {
        filename: "app/Services/StripeReconciliation.php",
        language: "php",
        size: "2.9 KB",
        description: "Idempotent payment webhook processor with transactional inventory guards.",
        code: `<?php

namespace App\\Services;

use App\\Models\\Order;
use App\\Models\\WebhookEvent;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Support\\Facades\\Log;
use Stripe\\Event;

class StripeReconciliationService
{
    /**
     * Handles Stripe webhooks idempotently using database locks.
     */
    public function handleEvent(Event $stripeEvent): void
    {
        DB::transaction(function () use ($stripeEvent) {
            $alreadyProcessed = WebhookEvent::where('stripe_event_id', $stripeEvent->id)
                ->lockForUpdate()
                ->exists();

            if ($alreadyProcessed) {
                Log::info("Webhook {$stripeEvent->id} already processed. Skipping.");
                return;
            }

            WebhookEvent::create([
                'stripe_event_id' => $stripeEvent->id,
                'type' => $stripeEvent->type,
                'payload' => json_encode($stripeEvent->data->object),
            ]);

            if ($stripeEvent->type === 'checkout.session.completed') {
                $session = $stripeEvent->data->object;
                $this->fulfillOrder($session->client_reference_id, $session->payment_intent);
            }
        });
    }

    protected function fulfillOrder(string $orderId, string $paymentIntentId): void
    {
        $order = Order::where('id', $orderId)->lockForUpdate()->firstOrFail();
        $order->update([
            'status' => Order::STATUS_PAID,
            'payment_intent_id' => $paymentIntentId,
            'paid_at' => now(),
        ]);
    }
}`
      }
    ]
  },

  4: {
    projectId: 4,
    projectTitle: "CollabSync Real-Time Studio",
    architectureSummary:
      "Peer-to-peer collaborative editor utilizing WebRTC DataChannels and Conflict-Free Replicated Data Types (CRDT) for zero-latency multi-user document synchronization.",
    simulationOutput: {
      command: "npm run test:crdt-sync -- --peers=4",
      logs: [
        "[MESH] Peer 'user_alice' joined room 'studio-room-404'",
        "[WEBRTC] ICE connection state: connected via STUN/TURN",
        "[CRDT] Alice inserted 'const model = new Gemini();' at position 12",
        "[CRDT] Bob concurrent delete character 14",
        "[RESOLVER] Applied LWW Lamport timestamp reconciliation. State unified in 1.2ms.",
        "[PRESENCE] Broadcasting 4 cursor coordinates at 60 FPS."
      ],
      benchmark: "P2P Latency: 16ms | Memory usage per peer: 12MB"
    },
    files: [
      {
        filename: "src/crdt/ConflictResolver.ts",
        language: "typescript",
        size: "2.1 KB",
        description: "Lamport timestamp conflict-free character sequence resolution.",
        code: `export interface CRDTOperation {
  id: string;
  peerId: string;
  lamportClock: number;
  type: 'insert' | 'delete';
  char: string;
  position: number;
}

export class CollaborativeConflictResolver {
  private localClock = 0;
  private documentBuffer: CRDTOperation[] = [];

  receiveRemoteOp(remoteOp: CRDTOperation): string {
    this.localClock = Math.max(this.localClock, remoteOp.lamportClock) + 1;
    this.documentBuffer.push(remoteOp);

    // Sort by Lamport Clock, breaking ties with Peer ID deterministic hash
    this.documentBuffer.sort((a, b) => {
      if (a.lamportClock === b.lamportClock) {
        return a.peerId.localeCompare(b.peerId);
      }
      return a.lamportClock - b.lamportClock;
    });

    return this.renderDocument();
  }

  renderDocument(): string {
    return this.documentBuffer
      .filter((op) => op.type === 'insert')
      .map((op) => op.char)
      .join('');
  }
}`
      }
    ]
  },

  5: {
    projectId: 5,
    projectTitle: "FinancePulse Asset Ledger",
    architectureSummary:
      "Cryptographically verified personal financial ledger utilizing SQLite WAL caching, multi-currency conversion, and automated FIFO tax-lot gain calculations.",
    simulationOutput: {
      command: "cargo run --bin ledger_evaluator -- --tax-year=2026",
      logs: [
        "[LEDGER] Loading transaction entries from encrypted SQLite cache...",
        "[FIFO] Reconciling 1,420 buy/sell trade lots for equities & ETFs...",
        "[CALC] Short-Term Capital Gains: $12,480.50 USD",
        "[CALC] Long-Term Capital Gains: $34,120.00 USD",
        "[AUDIT] Checksum match: SHA-256 integrity verified across 4,200 records.",
        "[COMPLETE] Generated Schedule-D compatible asset summary in 34ms."
      ],
      benchmark: "Reconciliation speed: 41,000 lots/sec"
    },
    files: [
      {
        filename: "src/engine/TaxLotCalculator.ts",
        language: "typescript",
        size: "2.7 KB",
        description: "First-In-First-Out (FIFO) tax lot allocation and capital gains algorithm.",
        code: `export interface TradeLot {
  id: string;
  symbol: string;
  quantity: number;
  costBasis: number;
  acquiredDate: Date;
}

export interface RealizedGain {
  symbol: string;
  quantitySold: number;
  gainAmount: number;
  isLongTerm: boolean;
}

export class TaxLotCalculator {
  static computeFIFOGains(buyLots: TradeLot[], sellQty: number, sellPrice: number, sellDate: Date): RealizedGain[] {
    const results: RealizedGain[] = [];
    let remainingToSell = sellQty;

    for (const lot of buyLots) {
      if (remainingToSell <= 0) break;
      if (lot.quantity <= 0) continue;

      const taken = Math.min(lot.quantity, remainingToSell);
      const proceeds = taken * sellPrice;
      const cost = taken * lot.costBasis;
      const daysHeld = (sellDate.getTime() - lot.acquiredDate.getTime()) / (1000 * 60 * 60 * 24);

      results.push({
        symbol: lot.symbol,
        quantitySold: taken,
        gainAmount: proceeds - cost,
        isLongTerm: daysHeld >= 365,
      });

      lot.quantity -= taken;
      remainingToSell -= taken;
    }

    return results;
  }
}`
      }
    ]
  },

  6: {
    projectId: 6,
    projectTitle: "TaskDaemon AI Automation Suite",
    architectureSummary:
      "Autonomous Python background worker leveraging the Gemini API to continuously ingest scanned PDF invoices, parse structured JSON entities, and trigger accounting ERP updates.",
    simulationOutput: {
      command: "python -m daemon.agent_worker --input=/var/inbox/invoices",
      logs: [
        "[DAEMON] Watching inbox directory '/var/inbox/invoices'...",
        "[DETECT] New file: 'INV-2026-09-041.pdf' (Size: 248KB)",
        "[AI OCR] Extracting text layout via Gemini multimodal parsing...",
        "[EXTRACT] Vendor: 'Acme Cloud Services Inc.' | Total: $4,250.00 | VAT: 10%",
        "[VERIFY] Cross-referenced with Purchase Order #PO-8812. Status: VALID.",
        "[DATABASE] Inserted invoice record into ERP queue with UUID 9f41b.",
        "[DISPATCH] Archived original PDF to s3://vault-invoices/2026/09/."
      ],
      benchmark: "Average invoice extraction time: 820ms | Extraction confidence: 99.8%"
    },
    files: [
      {
        filename: "daemon/agent_worker.py",
        language: "python",
        size: "2.6 KB",
        description: "Autonomous Python background daemon with Gemini structured invoice extraction.",
        code: `import os
import json
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

class InvoiceExtraction(BaseModel):
    vendor_name: str = Field(description="Name of the billing vendor")
    invoice_number: str = Field(description="Unique invoice or bill number")
    subtotal: float = Field(description="Subtotal amount before taxes")
    tax_amount: float = Field(description="Total tax amount")
    grand_total: float = Field(description="Grand total payable in USD")
    currency: str = Field(default="USD", description="Currency code")

def process_invoice_document(file_content: bytes) -> dict:
    """
    Submits raw invoice bytes to Gemini with Pydantic JSON schema constraints.
    """
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            types.Part.from_bytes(data=file_content, mime_type="application/pdf"),
            "Extract all invoice metadata strictly conforming to the requested schema."
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=InvoiceExtraction,
            temperature=0.1
        )
    )

    return json.loads(response.text)

if __name__ == "__main__":
    print("[DAEMON] Worker initialized. Awaiting incoming documents...")`
      }
    ]
  }
};
