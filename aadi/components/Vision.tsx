"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Send, ShoppingBag } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const CARDS = [
  {
    icon: ShoppingBag,
    title: "The Personal Shopper",
    body: "E-commerce is exhausting. Aadi monitors prices, compares specs, and executes the purchase. It handles the cart so you don't have to.",
  },
  {
    icon: CalendarCheck,
    title: "The Concierge",
    body: "Dinner reservations, flight changes, doctor's appointments. Aadi navigates the booking systems, finds the best slots, and locks them into your calendar.",
  },
  {
    icon: Send,
    title: "The GTM Operator",
    body: "Aadi is already running B2B outbound. It writes strategic follow-ups, respects timezones, and handles email compliance automatically. It doesn't just draft; it sends.",
  },
];

export function Vision() {
  return (
    <SectionReveal id="vision" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          One Agent. Infinite Capabilities.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                whileHover={{ scale: 1.035, y: -6 }}
                className="glass group rounded-3xl p-7 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(139,92,246,0.7)]"
                style={{ transformPerspective: 1000 }}
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet/15 ring-1 ring-violet/30">
                  <Icon className="h-5 w-5 text-violet" />
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionReveal>
  );
}
