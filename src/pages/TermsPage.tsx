import { LegalDoc } from "../components/aadi/LegalDoc";
import SEO from "../components/SEO";

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms & Conditions — Aadi | GoSchedule"
        description="Terms for using Aadi, including early access, liability, acceptable use, and API costs."
        canonical="https://www.goschedule.ai/terms"
      />
      <LegalDoc>
        <h1 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-white mt-8">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-sm text-slate-500">Last Updated: November 2026</p>
        <p className="mt-8 text-base leading-relaxed text-slate-400">
          By using Aadi, you agree to the following terms.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          1. Nature of the Service
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          Aadi is an autonomous AI agent currently in active development (Early
          Access). It combines deterministic code execution with probabilistic
          Large Language Models (LLMs). You acknowledge that AI systems can
          hallucinate or make errors.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          2. No Guarantees & Limitation of Liability
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          Aadi is provided &quot;as is&quot; without warranty of any kind. We
          are not liable for any missed meetings, deleted emails, accidental
          purchases, or financial damages caused by the agent&apos;s autonomous
          actions.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          3. Acceptable Use
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          You agree not to use Aadi to generate spam, violate CAN-SPAM or GDPR
          regulations, execute malicious code, or bypass security guardrails.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          4. API Costs
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          You are responsible for the API costs incurred by Aadi (LLM inference,
          voice transcription, embeddings). Aadi&apos;s self-optimizing loops
          aim to keep these costs minimal, but you are liable for the billing
          on your connected accounts.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white mt-12 mb-3">
          5. Termination
        </h2>
        <p className="text-base leading-relaxed text-slate-400">
          We reserve the right to revoke access to the early access program at
          any time if the agent is used for malicious purposes.
        </p>
      </LegalDoc>
    </>
  );
}
