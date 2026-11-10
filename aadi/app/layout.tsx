import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { WaveBackground } from "@/components/WaveBackground";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aadi — Autonomous AI Agent",
  description:
    "Aadi is an autonomous agent that executes your life and business. Draft follow-ups, book meetings, and soon handle shopping, ordering, and logistics.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="relative min-h-full overflow-x-hidden bg-navy font-sans text-white">
        <WaveBackground />
        {children}
      </body>
    </html>
  );
}
