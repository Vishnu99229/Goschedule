const ACTIONS = [
  "Aadi just booked a meeting with Talkdesk",
  "Aadi just sent a follow-up to NiCE",
  "Aadi just filtered 14 spam emails",
  "Aadi just ordered coffee beans",
];

export function Ticker() {
  const sequence = [...ACTIONS, ...ACTIONS].join("  •  ") + "  •  ";

  return (
    <section aria-label="Live Aadi activity">
      <div className="w-full py-4 border-y border-white/10 overflow-hidden relative z-10 bg-white/[0.02]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent" />
        <div className="flex w-max animate-marquee">
          <p className="px-4 text-sm tracking-wide text-slate-400 whitespace-nowrap">
            {sequence}
          </p>
          <p
            aria-hidden="true"
            className="px-4 text-sm tracking-wide text-slate-400 whitespace-nowrap"
          >
            {sequence}
          </p>
        </div>
      </div>
    </section>
  );
}
