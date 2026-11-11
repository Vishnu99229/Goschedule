import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
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
    <SectionReveal id="early-access" className="relative z-10">
      <div className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-white">
            Ready to get your time back?
          </h2>
          <p className="text-base md:text-lg text-slate-400">
            Aadi is currently onboarding a limited number of pilot users.
          </p>

          {submitted ? (
            <p className="mt-8 w-full max-w-md rounded-lg border border-emerald/30 bg-emerald/10 px-6 py-4 text-emerald">
              You&apos;re on the list. We&apos;ll reach out shortly.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto mt-8">
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
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors whitespace-nowrap"
                >
                  Request Early Access
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 sm:flex-row">
        <p className="font-heading text-sm font-semibold tracking-tight text-white">
          Aadi
        </p>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
        >
          <Link to="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
        </nav>
      </footer>
    </SectionReveal>
  );
}
