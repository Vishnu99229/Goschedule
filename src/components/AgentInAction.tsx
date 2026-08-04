/**
 * AgentInAction — replaces the former Ecosystem section.
 *
 * Shows a refined heading + supporting copy beside a looping "live
 * mockup" of the AI agent at work: an inbound call connects, the
 * agent speaks while a waveform pulses, a WhatsApp thread types in,
 * and the conversation lands on a booked appointment confirmation.
 *
 * The animation is pure CSS keyframes (no JS state, no rerenders),
 * loops every 12s, and falls back to a clean static end-state under
 * prefers-reduced-motion (see .agent-live styles in index.css).
 */

import { Calendar, MessageCircle, Phone } from 'lucide-react'
import Reveal from './Reveal'

export default function AgentInAction() {
    return (
        <section id="agent-live" className="section agent-live">
            <div className="container">
                <div className="agent-live__grid">

                    {/* Copy */}
                    <Reveal>
                        <div className="agent-live__copy">
                            <span className="agent-live__eyebrow">Agents at work</span>
                            <h2 className="agent-live__heading">
                                Voice and WhatsApp, running the playbook we proved.
                            </h2>
                            <p className="agent-live__sub">
                                After manual validation, agents handle the conversations at scale — qualifying prospects, answering in real time, and booking the meetings that matter.
                            </p>
                            <div className="agent-live__caps">
                                <span>AI voice agent</span>
                                <span>WhatsApp outreach</span>
                                <span>Qualifies leads</span>
                                <span>Books meetings</span>
                            </div>
                        </div>
                    </Reveal>

                    {/* Live mockup */}
                    <Reveal delayMs={250}>
                        <div className="agent-live__device" role="img" aria-label="Live demo: an AI agent answering an inbound call, chatting on WhatsApp, and booking an appointment.">

                            {/* Flow rail (purple dot travelling through the cards) */}
                            <div className="agent-live__rail" aria-hidden>
                                <div className="agent-live__rail-dot" />
                            </div>

                            {/* Card 1 — Incoming call */}
                            <div className="agent-live__card agent-live__call">
                                <div className="agent-live__card-head">
                                    <div className="agent-live__card-icon">
                                        <Phone style={{ width: 16, height: 16 }} aria-hidden />
                                    </div>
                                    <div>
                                        <div className="agent-live__card-title">Inbound call</div>
                                        <div className="agent-live__card-sub">Lead from Meta Ad</div>
                                    </div>
                                </div>
                                <div className="agent-live__call-states" aria-hidden>
                                    <span className="agent-live__call-status agent-live__status-label--ringing">
                                        <span className="agent-live__status-dot agent-live__status-dot--ringing" />
                                        Ringing
                                    </span>
                                    <span className="agent-live__call-status agent-live__status-label--connected">
                                        <span className="agent-live__status-dot agent-live__status-dot--connected" />
                                        Connected · AI voice agent speaking
                                    </span>
                                    <span className="agent-live__call-status agent-live__status-label--complete">
                                        <span className="agent-live__status-dot" />
                                        Call complete · 02:14
                                    </span>
                                </div>
                                <div className="agent-live__waveform" aria-hidden>
                                    <span /><span /><span /><span /><span /><span /><span />
                                </div>
                            </div>

                            {/* Card 2 — WhatsApp thread */}
                            <div className="agent-live__card">
                                <div className="agent-live__card-head">
                                    <div className="agent-live__card-icon">
                                        <MessageCircle style={{ width: 16, height: 16 }} aria-hidden />
                                    </div>
                                    <div>
                                        <div className="agent-live__card-title">WhatsApp · +91 98xxx</div>
                                        <div className="agent-live__card-sub">Conversation auto-handled</div>
                                    </div>
                                </div>
                                <div className="agent-live__chat" aria-hidden>
                                    <div className="agent-live__bubble agent-live__bubble--lead agent-live__bubble--lead-1">
                                        Hi, can I book a demo this week?
                                    </div>
                                    <div className="agent-live__typing">
                                        <span /><span /><span />
                                    </div>
                                    <div className="agent-live__bubble agent-live__bubble--agent agent-live__bubble--agent-1">
                                        Sure. I have Tue 3 PM or Wed 11 AM. Which works?
                                    </div>
                                    <div className="agent-live__bubble agent-live__bubble--lead agent-live__bubble--lead-2">
                                        Tue 3 PM works.
                                    </div>
                                    <div className="agent-live__bubble agent-live__bubble--agent agent-live__bubble--agent-2">
                                        Booked. Calendar invite is on its way.
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 — Booking confirmation */}
                            <div className="agent-live__booking" aria-label="Booking confirmation">
                                <div className="agent-live__booking-icon">
                                    <Calendar style={{ width: 18, height: 18 }} aria-hidden />
                                </div>
                                <div className="agent-live__booking-text">
                                    <div className="agent-live__booking-title">Demo booked · Tue 3 PM</div>
                                    <div className="agent-live__booking-sub">Synced to your calendar</div>
                                </div>
                            </div>

                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
