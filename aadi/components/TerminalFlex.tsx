"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const FEATURES = [
  {
    title: "The Agent Harness",
    body: "An 8-iteration execution loop that decides which tools to use, executes them in TypeScript, and verifies the output. It doesn't just generate text; it forces deterministic function calls.",
  },
  {
    title: "Rules & Guardrails",
    body: "Zero hallucination tolerance. A strict Receipt Check rejects any claim of an action (sent, booked, deleted) unless a successful tool execution is logged. Owner locks and API cost limits prevent runaway loops.",
  },
  {
    title: "Multi-LLM Routing",
    body: "Algorithmic task routing. DeepSeek handles background classification, Gemini handles command execution with forced tooling, and Claude acts as the ultimate fallback for complex reasoning.",
  },
  {
    title: "Voice & Text Interface",
    body: "Aadi transcribes voice notes, speaks back in natural prose, and makes outbound calls via programmable telephony. The interface is wherever you are.",
  },
];

const LOG_LINES = [
  { text: "> [SYS] Initializing Agent Harness...", tone: "text-white/90" },
  { text: "> [SYS] Task: Book meeting with Talkdesk", tone: "text-white/90" },
  {
    text: "> [LLM] Routing to Gemini-3.6-flash (Command Intent)",
    tone: "text-violet",
  },
  {
    text: "> [GUARDRAIL] Verifying recipient... [PASS]",
    tone: "text-emerald",
  },
  {
    text: "> [GUARDRAIL] Checking calendar availability... [PASS]",
    tone: "text-emerald",
  },
  { text: "> [SYS] Executing tool: create_event", tone: "text-white/90" },
  {
    text: "> [SYS] Receipt Check: Verified. Action complete.",
    tone: "text-emerald",
  },
];

export function TerminalFlex() {
  return (
    <SectionReveal className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-xs tracking-[0.18em] text-violet uppercase">
            Under the hood
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            An agent harness engineered for deterministic execution.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Aadi isn&apos;t a ChatGPT wrapper. It is a rule-bound execution
            system that routes, acts, verifies, and fails over without losing
            the user&apos;s intent.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              className="bg-[#0a0d14]/90 p-6 backdrop-blur-md sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.15em] text-muted">
                  0{index + 1}
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald/25 bg-emerald/10">
                  <Check
                    className="h-3.5 w-3.5 text-emerald"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold tracking-tight text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {feature.body}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass mt-10 overflow-hidden rounded-2xl shadow-[0_24px_80px_-32px_rgba(139,92,246,0.55)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-muted">
              aadi-harness / execution-trace
            </span>
          </div>
          <div className="overflow-x-auto bg-black/50 px-5 py-6 font-mono text-xs leading-7 sm:px-7 sm:py-8 sm:text-sm">
            {LOG_LINES.map((line, index) => (
              <motion.p
                key={line.text}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.18 }}
                className={`${line.tone} whitespace-nowrap`}
              >
                {line.text}
              </motion.p>
            ))}
            <span className="mt-1 inline-block h-4 w-2 bg-violet align-middle animate-caret" />
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
