import { useEffect, useRef, useState } from 'react';

/*
  Qualification Flow Animation
  ─────────────────────────────
  Stage 1 – Input tags drift rightward toward filter stack
  Stage 2 – Three horizontal filter layers reject some, pass others
  Stage 3 – One refined "SQL" tag emerges from the bottom
  Loop: 7s, smooth reset
*/

const INPUT_LABELS = [
    'Website Visit',
    'LinkedIn',
    'Email Reply',
    'Form Fill',
    'Intent Signal',
    'Data Enriched',
    'Ad Click',
    'Referral',
];

// Which inputs survive each layer (indices into INPUT_LABELS)
// Layer 1 keeps 5 of 8, Layer 2 keeps 3 of 5, Layer 3 keeps 1 of 3
const SURVIVE_L1 = [0, 2, 3, 4, 5];
const SURVIVE_L2 = [2, 4, 5];
const SURVIVE_L3 = [4];

export default function HeroAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let triggered = false;
        const handleScroll = () => {
            if (window.scrollY > 80 && !triggered) {
                triggered = true;
                setScrolled(true);
                setTimeout(() => {
                    setScrolled(false);
                    triggered = false;
                }, 2000);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`qual-flow ${scrolled ? 'qual-flow--scrolled' : ''}`}
        >
            {/* ─── DESKTOP ─── */}
            <div className="qual-flow__desktop">
                {/* Stage 1: Input Tags */}
                <div className="qual-inputs">
                    {INPUT_LABELS.map((label, i) => {
                        const rejected1 = !SURVIVE_L1.includes(i);
                        return (
                            <div
                                key={label}
                                className={`qual-tag qual-tag--input ${rejected1 ? 'qual-tag--reject-early' : ''}`}
                                style={{ animationDelay: `${i * 0.35}s` }}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>

                {/* Stage 2: Filter Stack */}
                <div className="qual-filter-stack">
                    <div className="qual-filter-layer">
                        <span className="qual-filter-label">Signal Check</span>
                        <div className="qual-filter-line" />
                    </div>
                    <div className="qual-filter-layer">
                        <span className="qual-filter-label">Intent Scoring</span>
                        <div className="qual-filter-line" />
                    </div>
                    <div className="qual-filter-layer">
                        <span className="qual-filter-label">Qualification Rules</span>
                        <div className="qual-filter-line" />
                    </div>

                    {/* Pass-through tags that shrink through layers */}
                    {SURVIVE_L1.map((idx) => {
                        const survivesL2 = SURVIVE_L2.includes(idx);
                        const survivesL3 = SURVIVE_L3.includes(idx);
                        let className = 'qual-tag qual-tag--filtering qual-tag--pass-l1';
                        if (!survivesL2) className += ' qual-tag--reject-l2';
                        else if (!survivesL3) className += ' qual-tag--reject-l3';
                        else className += ' qual-tag--pass-all';
                        return (
                            <div
                                key={INPUT_LABELS[idx]}
                                className={className}
                                style={{ animationDelay: `${idx * 0.35 + 2.8}s` }}
                            >
                                {INPUT_LABELS[idx]}
                            </div>
                        );
                    })}
                </div>

                {/* Stage 3: SQL Output */}
                <div className="qual-output">
                    <div className="qual-output-line" />
                    <div className="qual-tag qual-tag--sql">
                        SQL
                    </div>
                </div>
            </div>

            {/* ─── MOBILE (simplified) ─── */}
            <div className="qual-flow__mobile">
                <div className="qual-filter-stack qual-filter-stack--mobile">
                    <div className="qual-filter-layer">
                        <span className="qual-filter-label">Signal Check</span>
                        <div className="qual-filter-line" />
                    </div>
                    <div className="qual-filter-layer">
                        <span className="qual-filter-label">Intent Scoring</span>
                        <div className="qual-filter-line" />
                    </div>
                    <div className="qual-filter-layer">
                        <span className="qual-filter-label">Qualification</span>
                        <div className="qual-filter-line" />
                    </div>
                </div>
                <div className="qual-output-line qual-output-line--mobile" />
                <div className="qual-tag qual-tag--sql">SQL</div>
            </div>
        </div>
    );
}
