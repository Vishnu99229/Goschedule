import { ArrowRight } from 'lucide-react';

export default function CTA() {
    return (
        <section id="book" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Ambient background glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                height: 800,
                background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
                    <h2 className="h1" style={{ marginBottom: 'var(--space-4)' }}>
                        Stop Paying For Noise.<br />
                        <span className="text-gradient">Start Closing Qualified Buyers.</span>
                    </h2>
                    <a href="https://cal.com/vishnu-rajan-3siibd/goschedule" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 18, padding: '18px 40px' }}>
                        Book Strategy Call <ArrowRight style={{ width: 20, height: 20, marginLeft: 10 }} />
                    </a>
                </div>
            </div>
        </section>
    );
}
