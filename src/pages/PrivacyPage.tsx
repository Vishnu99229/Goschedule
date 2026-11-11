import { LegalDoc } from "../components/aadi/LegalDoc";
import SEO from "../components/SEO";

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy — Aadi | GoSchedule"
        description="How Aadi handles messages, voice notes, calendar events, and multi-model LLM routing."
        canonical="https://www.goschedule.ai/privacy"
      />
      <LegalDoc>
        <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-white mt-8">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last Updated: November 2026</p>
        <p className="mt-8 text-base leading-relaxed text-slate-400">
          Aadi is an autonomous AI agent. Because Aadi executes tasks, it
          processes highly sensitive personal and business data. This policy
          outlines how your data is handled.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          1. Data Collection
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          When you interact with Aadi, we collect the content of your messages,
          voice notes (transcribed via third-party APIs), emails, and calendar
          events required to fulfill your requests.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          2. Multi-Model LLM Routing
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          Aadi does not use a single AI model. Your prompts and context are
          dynamically routed to third-party API providers, including Google
          (Gemini), DeepSeek, and Anthropic (Claude). These providers process
          the text to generate responses and execute tools.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          3. Local Storage
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          Your conversation history, vector embeddings, and agent memories are
          stored in a local SQLite database managed by the Aadi harness. API
          keys and authentication tokens are stored securely and are never
          exposed to the LLM context.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          4. Autonomous Actions
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          Aadi is designed to take actions (sending emails, booking meetings,
          purchasing items). You maintain ultimate control over these actions
          via explicit approval gates (Owner Lock and Receipt Checks).
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          5. Data Deletion
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          You can clear your conversational context at any time by using the
          /reset command.
        </p>
      </LegalDoc>
    </>
  );
}
