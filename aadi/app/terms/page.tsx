import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms — Aadi",
};

export default function TermsPage() {
  return (
    <main className="relative z-10 mx-auto max-w-2xl px-6 py-24">
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-white">
          ← Back to Aadi
        </Link>
      </p>
      <h1 className="font-heading mt-6 text-4xl font-extrabold tracking-tight">
        Terms
      </h1>
      <p className="mt-6 leading-relaxed text-muted">
        Aadi is currently a private pilot. Early access is invitation-only and
        may change as the product evolves. By requesting access you agree we
        may email you about the product.
      </p>
    </main>
  );
}
