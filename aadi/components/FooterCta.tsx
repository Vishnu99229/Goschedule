"use client";

import { FormEvent, useState } from "react";
import { SectionReveal } from "./SectionReveal";

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.563l-5.14-6.72L5.25 22H2l8.03-9.17L1.75 2h6.72l4.64 6.17L18.244 2Zm-1.15 18.08h1.8L7.01 3.83H5.08l12.014 16.25Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-current"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
    </svg>
  );
}

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
          <a href="/privacy" className="transition-colors hover:text-white">
            Privacy
          </a>
          <a href="/terms" className="transition-colors hover:text-white">
            Terms
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <XIcon />
            Twitter
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <GitHubIcon />
            GitHub
          </a>
        </nav>
      </footer>
    </SectionReveal>
  );
}
