import { motion } from "framer-motion";
import { CalendarDays, Play, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative z-10 mx-auto grid min-h-svh w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 text-left lg:grid-cols-2 lg:py-20">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.025] px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted backdrop-blur-md"
        >
          AADI // AUTONOMOUS AGENT HARNESS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl"
        >
          Stop prompting. Start delegating.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.16,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
        >
          Aadi is a deterministic agent harness. It combines multi-model LLM
          routing with strict, rule-based guardrails to execute complex tasks,
          manage your calendar, and handle outbound GTM autonomously.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-9 flex flex-col items-start gap-3 sm:flex-row"
        >
          <a
            href="#early-access"
            className="inline-flex h-12 items-center justify-center rounded-full bg-violet px-7 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(139,92,246,0.65)]"
          >
            Request Early Access
          </a>
          <a
            href="#vision"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-md transition-shadow duration-300 hover:border-violet/50 hover:shadow-[0_0_28px_rgba(139,92,246,0.35)]"
          >
            See What Aadi Can Do
          </a>
        </motion.div>
      </div>

      <PhoneMockup />
    </section>
  );
}

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:justify-self-end"
      style={{ perspective: 1400 }}
    >
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotateX: [8, 5, 8],
          rotateY: [-10, -6, -10],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-[2.4rem] border border-white/15 bg-white/[0.04] p-2.5 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.45)] backdrop-blur-md"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-violet/20 blur-3xl" />

        <div className="relative overflow-hidden rounded-[1.95rem] border border-white/10 bg-[#070910]">
          <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-medium text-white/70">
            <span>9:41</span>
            <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-black/80" />
            <span>5G</span>
          </div>

          <div className="flex items-center gap-3 border-b border-white/8 px-4 pb-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet/20 ring-1 ring-violet/40">
              <Sparkles className="h-4 w-4 text-violet" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Aadi</p>
              <p className="text-[11px] text-emerald">Autonomous • Online</p>
            </div>
          </div>

          <div className="flex min-h-[360px] flex-col gap-3 px-3 py-4 text-left">
            <div className="ml-8 rounded-2xl rounded-tr-sm bg-white/10 px-3.5 py-2.5 text-[13px] leading-5 text-white">
              Call the dentist and book the earliest slot.
            </div>

            <div className="mr-4 rounded-2xl rounded-tl-sm border border-violet/25 bg-violet/15 px-3.5 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet text-white shadow-[0_0_18px_rgba(139,92,246,0.35)]">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                <div
                  className="flex h-7 flex-1 items-center gap-1"
                  aria-label="Voice note waveform"
                >
                  {[8, 14, 20, 11, 24, 17, 9, 19, 25, 13, 21, 10].map(
                    (height, index) => (
                      <span
                        key={index}
                        className="w-1 rounded-full bg-violet/80"
                        style={{ height }}
                      />
                    ),
                  )}
                </div>
                <span className="font-mono text-[10px] text-muted">0:12</span>
              </div>
              <p className="mt-3 border-t border-white/10 pt-3 text-[12px] leading-5 text-white/90">
                I called Dr. Smith&apos;s office. They had a cancellation. I
                booked you for tomorrow at 10 AM and added it to your calendar.
              </p>
            </div>

            <div className="mr-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <div className="flex items-center gap-3 px-3 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald/25 bg-emerald/10">
                  <CalendarDays className="h-4 w-4 text-emerald" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-white">
                    Appointment Confirmed
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    Added to Google Calendar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
