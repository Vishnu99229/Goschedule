import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy — Aadi",
};

export default function PrivacyPage() {
  return (
    <main className="relative z-10 mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-white">
          ← Back to Aadi
        </Link>
      </p>
      <h1 className="font-heading mt-6 text-4xl font-extrabold tracking-tight">
        Privacy
      </h1>
      <p className="mt-6 leading-relaxed text-muted">
        Aadi collects only the information you choose to share — typically an
        email address for early access. We use it to contact you about the
        pilot and nothing else. We do not sell personal data.
      </p>
    </main>
  );
}
