import { motion } from "framer-motion";
import { Cpu, Network, RefreshCw, ShieldCheck } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const MODULES = [
  {
    icon: Cpu,
    module: "module_01",
    path: "orchestration/pipelines",
    title: "100+ Algorithmic Pipelines",
    body: "A custom orchestration layer that routes tasks through over 100 purpose-built algorithms. Includes vector embeddings, semantic search, dynamic chunking, and multi-agent debate for high-stakes reasoning.",
    tags: ["RAG", "VectorDB", "NLP"],
  },
  {
    icon: ShieldCheck,
    module: "module_02",
    path: "safety/guardrails",
    title: "Deterministic Guardrails",
    body: "Zero-tolerance for hallucinated actions. We use strict AST parsing, schema validation, and a hardcoded Receipt Check. If a tool doesn't execute successfully, the LLM is forced to admit failure.",
    tags: ["AST", "JSON Schema", "Receipt Check"],
  },
  {
    icon: RefreshCw,
    module: "module_03",
    path: "learning/rlhf",
    title: "Reinforcement Learning (RLHF)",
    body: "Continuous system optimization. Aadi learns from human feedback loops and background evaluations to dynamically adjust its own prompt weights, token budgets, and fallback cascades.",
    tags: ["RLHF", "Feedback Loops", "Cost Routing"],
  },
  {
    icon: Network,
    module: "module_04",
    path: "io/omnichannel",
    title: "Omnichannel Execution",
    body: "One unified brain, infinite surface area. Native integration with Slack, Discord, WhatsApp, and Telegram, alongside direct API access for external CI/CD and webhook triggers.",
    tags: ["Webhooks", "MCP", "API First"],
  },
];

export function Vision() {
  return (
    <SectionReveal
      id="vision"
      className="bg-black/40 border-y border-white/5 py-32 relative z-10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="aadi-blueprint pointer-events-none absolute inset-0"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center">
          <p className="mb-4 font-mono text-xs tracking-[0.18em] text-violet-400 uppercase">
            {"// capabilities"}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight text-white">
            One Agent. Infinite Capabilities.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {MODULES.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <motion.article
                key={mod.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className="group bg-[#0A0D14] border border-white/10 rounded-2xl overflow-hidden shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-violet-500/40"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[0.02] px-5 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    </div>
                    <span className="truncate font-mono text-[11px] text-slate-500">
                      &gt; {mod.module}
                      <span className="hidden sm:inline"> · {mod.path}</span>
                    </span>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-emerald uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                    Active
                  </span>
                </div>

                <div className="p-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 transition-colors duration-300 group-hover:bg-violet-500/20">
                    <Icon className="h-5 w-5 text-violet-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 tracking-tight text-white">
                    {mod.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {mod.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2 list-none" aria-label="Technologies">
                    {mod.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-violet-500/20 bg-violet-500/[0.06] px-2.5 py-1 font-mono text-xs text-violet-400"
                      >
                        [{tag}]
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
