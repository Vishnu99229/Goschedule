"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { SectionReveal } from "./SectionReveal";

export function FooterCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <SectionReveal id="early-access" className="relative z-10 px-6 pt-28 pb-10">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Ready to get your time back?
        </h2>
        <p className="mt-5 text-lg text-muted">
          Aadi is currently onboarding a limited number of pilot users.
        </p>

        {submitted ? (
          <p className="mt-10 rounded-2xl border border-emerald/30 bg-emerald/10 px-6 py-4 text-emerald">
            You&apos;re on the list. We&apos;ll reach out shortly.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Enter your email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="glass h-14 flex-1 rounded-full px-6 text-sm text-white outline-none placeholder:text-muted focus:border-violet/50 focus:shadow-[0_0_28px_rgba(139,92,246,0.35)]"
            />
            <button
              type="submit"
              className="h-14 shrink-0 rounded-full bg-violet px-7 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(139,92,246,0.65)]"
            >
              Request Early Access
            </button>
          </form>
        )}
      </div>

      <footer className="mx-auto mt-24 flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
        <p className="font-heading text-sm font-bold tracking-tight text-white">
          Aadi
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted"
        >
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
        </nav>
      </footer>
    </SectionReveal>
  );
}
