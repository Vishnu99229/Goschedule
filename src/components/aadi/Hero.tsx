import { motion } from "framer-motion";
import {
  CalendarDays,
  Gamepad2,
  Hash,
  MessageCircle,
  Mic,
  Phone,
  Play,
  Send,
  Sparkles,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const WAVEFORM = [8, 14, 20, 11, 24, 17, 9, 19, 25, 13, 21, 10];

// Side badges hang outside the phone, so they only appear from md up; on mobile
// just the top/bottom badges show, kept inside the phone's width.
const CHANNELS = [
  { label: "Voice Notes", icon: Mic, position: "-top-6 left-16", duration: 5, delay: 0, showOnMobile: true },
  { label: "WhatsApp", icon: MessageCircle, position: "top-16 -right-5", duration: 6, delay: 0.4, showOnMobile: false },
  { label: "Slack", icon: Hash, position: "top-28 -left-10", duration: 5.5, delay: 0.8, showOnMobile: false },
  { label: "Telegram", icon: Send, position: "top-[52%] -right-9", duration: 6.5, delay: 0.2, showOnMobile: false },
  { label: "Discord", icon: Gamepad2, position: "bottom-32 -left-8", duration: 7, delay: 0.6, showOnMobile: false },
  { label: "Phone Call", icon: Phone, position: "-bottom-6 right-6", duration: 5.8, delay: 1, showOnMobile: true },
] as const;

export function Hero() {
  return (
    <section className="relative z-10 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[70vh]">
          <div className="flex flex-col items-start justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.025] px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] text-slate-400"
            >
              AADI // AUTONOMOUS AGENT HARNESS
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white"
            >
              Stop prompting. Start delegating.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
              className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-400"
            >
              Aadi is a deterministic agent harness. It combines multi-model LLM
              routing with strict, rule-based guardrails to execute complex
              tasks, manage your calendar, and handle outbound GTM
              autonomously.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <a
                href="#early-access"
                className="inline-flex h-12 items-center justify-center rounded-full bg-violet px-7 text-sm font-semibold text-white whitespace-nowrap transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(139,92,246,0.65)]"
              >
                Request Early Access
              </a>
              <a
                href="#vision"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-7 text-sm font-semibold text-white whitespace-nowrap transition-shadow duration-300 hover:border-violet/50 hover:shadow-[0_0_28px_rgba(139,92,246,0.35)]"
              >
                See What Aadi Can Do
              </a>
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-full max-w-[320px]">
      <div className="pointer-events-none absolute -inset-10 rounded-[4rem] bg-violet/20 blur-3xl" />

      {CHANNELS.map((channel, index) => (
        <ChannelBadge key={channel.label} channel={channel} index={index} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.9, delay: 0.32, ease: EASE },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
        className="w-full max-w-[320px] aspect-[9/19] relative rounded-[3rem] border-[8px] border-gray-800 bg-black overflow-hidden shadow-2xl"
      >
        <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-gray-900" />

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-7 pt-4 text-[10px] font-medium text-white/70">
            <span>9:41</span>
            <span>5G</span>
          </div>

          <div className="mt-6 flex items-center gap-3 border-b border-white/10 px-5 pb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet/20 ring-1 ring-violet/40">
              <Sparkles className="h-4 w-4 text-violet" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Aadi</p>
              <p className="text-[11px] text-emerald">Autonomous • Online</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 px-4 py-5 text-left">
            <div className="ml-10 rounded-2xl rounded-tr-sm bg-white/10 px-4 py-3 text-[13px] leading-5 text-white">
              Call the dentist and book the earliest slot.
            </div>

            <div className="mr-4 rounded-2xl rounded-tl-sm border border-violet/25 bg-violet/15 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet text-white">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                <div
                  className="flex h-7 flex-1 items-center gap-1"
                  aria-label="Voice note waveform"
                >
                  {WAVEFORM.map((height, index) => (
                    <span
                      key={index}
                      className="w-1 rounded-full bg-violet/80"
                      style={{ height }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-slate-400">
                  0:12
                </span>
              </div>
              <p className="mt-3 border-t border-white/10 pt-3 text-[12px] leading-5 text-slate-300">
                I called Dr. Smith&apos;s office. They had a cancellation. I
                booked you for tomorrow at 10 AM and added it to your calendar.
              </p>
            </div>

            <div className="mr-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald/25 bg-emerald/10">
                <CalendarDays className="h-4 w-4 text-emerald" />
              </span>
              <div>
                <p className="text-[12px] font-semibold text-white">
                  Appointment Confirmed
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Added to Google Calendar
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChannelBadge({
  channel,
  index,
}: {
  channel: (typeof CHANNELS)[number];
  index: number;
}) {
  const Icon = channel.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: 0.6 + index * 0.08 },
        scale: { duration: 0.5, delay: 0.6 + index * 0.08, ease: EASE },
        y: {
          duration: channel.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: channel.delay,
        },
      }}
      title={channel.label}
      className={`absolute z-20 ${channel.position} ${channel.showOnMobile ? "flex" : "hidden md:flex"} p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl items-center justify-center text-white/80 hover:text-white transition-colors`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">{channel.label}</span>
    </motion.div>
  );
}
