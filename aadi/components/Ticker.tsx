"use client";

const ACTIONS = [
  "Aadi just booked a meeting with Talkdesk",
  "Aadi just sent a follow-up to NiCE",
  "Aadi just filtered 14 spam emails",
  "Aadi just ordered coffee beans",
];

export function Ticker() {
  const sequence = [...ACTIONS, ...ACTIONS].join("  •  ") + "  •  ";

  return (
    <section
      aria-label="Live Aadi activity"
      className="relative z-10 overflow-hidden border-y border-white/10 bg-white/[0.03] py-4 backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent" />
      <div className="flex w-max animate-marquee">
        <p className="px-4 text-sm tracking-wide text-muted whitespace-nowrap">
          {sequence}
        </p>
        <p
          aria-hidden="true"
          className="px-4 text-sm tracking-wide text-muted whitespace-nowrap"
        >
          {sequence}
        </p>
      </div>
    </section>
  );
}
