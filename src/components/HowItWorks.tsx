import Reveal from './Reveal'

const STEPS = [
    {
        num: '01',
        title: 'We do it manually.',
        body: 'We run your outreach by hand across WhatsApp, email, and voice. Real conversations, real replies, real objections — before any automation is deployed.',
    },
    {
        num: '02',
        title: 'We learn what actually works.',
        body: 'We map the nuances of your product and how your prospects behave — which messages land, which channel converts, what objections come up, and what a genuinely qualified lead looks like for you.',
    },
    {
        num: '03',
        title: 'Then we deploy the agents.',
        body: 'Once the playbook is proven, we deploy AI agents to run it at scale across every channel — with the same messaging we validated by hand.',
    },
]

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="section how-it-works">
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                        How we get you qualified leads
                    </h2>
                    <p className="body-lg text-center mx-auto" style={{ maxWidth: 560, marginBottom: 'var(--space-8)' }}>
                        Humans learn first. Agents scale second. The automation is trained on validated learning — not guesses.
                    </p>
                </Reveal>

                <Reveal stagger className="how-it-works__grid">
                    {STEPS.map((step) => (
                        <article key={step.num} className="how-step">
                            <span className="how-step__num" aria-hidden="true">{step.num}</span>
                            <h3 className="how-step__title">{step.title}</h3>
                            <p className="how-step__body">{step.body}</p>
                        </article>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}
