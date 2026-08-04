import type { ReactNode } from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import Reveal from './Reveal'

const CHANNELS: { id: string; icon: ReactNode; title: string; description: string }[] = [
    {
        id: 'whatsapp',
        icon: <MessageCircle style={{ width: 22, height: 22 }} aria-hidden />,
        title: 'WhatsApp',
        description: 'Personalized outreach and follow-ups that feel like a human conversation — not a broadcast blast.',
    },
    {
        id: 'email',
        icon: <Mail style={{ width: 22, height: 22 }} aria-hidden />,
        title: 'Email',
        description: 'Sequences written from what already converted in live threads — then run at volume by agents.',
    },
    {
        id: 'voice',
        icon: <Phone style={{ width: 22, height: 22 }} aria-hidden />,
        title: 'Voice',
        description: 'Qualification and booking calls that follow the talk track we proved works for your buyers.',
    },
]

export default function Channels() {
    return (
        <section id="channels" className="section channels-section" style={{ background: 'var(--bg-base)' }}>
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                        Three channels. One playbook.
                    </h2>
                    <p className="body-lg text-center mx-auto" style={{ maxWidth: 520, marginBottom: 'var(--space-8)' }}>
                        The same validated messaging, run where your prospects actually respond.
                    </p>
                </Reveal>

                <Reveal stagger className="channels-grid">
                    {CHANNELS.map((channel) => (
                        <article key={channel.id} className="channel-card">
                            <div className="channel-card__icon">{channel.icon}</div>
                            <h3 className="channel-card__title">{channel.title}</h3>
                            <p className="channel-card__description">{channel.description}</p>
                        </article>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}
