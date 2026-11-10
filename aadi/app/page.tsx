import { FooterCta } from "@/components/FooterCta";
import { Hero } from "@/components/Hero";
import { TerminalFlex } from "@/components/TerminalFlex";
import { Ticker } from "@/components/Ticker";
import { Vision } from "@/components/Vision";

export default function Home() {
  return (
    <main className="relative z-10 flex flex-1 flex-col">
      <Hero />
      <Vision />
      <TerminalFlex />
      <Ticker />
      <FooterCta />
    </main>
  );
}
