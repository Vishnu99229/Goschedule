import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { WaveBackground } from "./WaveBackground";
import "../../styles/aadi.css";

type Props = {
  children: ReactNode;
};

export function LegalDoc({ children }: Props) {
  return (
    <div className="aadi-root min-h-svh bg-[#0A0D14]">
      <WaveBackground />
      <main id="main-content" className="relative z-10 py-24 lg:py-32">
        <article className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
          <Link
            to="/"
            className="inline-flex text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          {children}
        </article>
      </main>
    </div>
  );
}
