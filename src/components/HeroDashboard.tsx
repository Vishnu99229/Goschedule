/**
 * Hero customer logo wall.
 *
 * Renders the 6 customer logos in a flat grid. Replaces the previous
 * client attribution cards (no use-case copy, no product tags, no
 * outcome lines — logos only). Component name is preserved
 * (`HeroDashboard`) so the existing `Hero.tsx` import keeps working.
 *
 * All six SVGs in `public/logos/` are placeholders — swap them in
 * place with real brand artwork when available.
 */

type Customer = {
  name: string
  src: string
}

const CUSTOMERS: Customer[] = [
  { name: 'Astral Ltd',     src: '/logos/astral.svg' },
  { name: 'Cafe Muziris',   src: '/logos/cafe-muziris.svg' },
  { name: 'Crown Security', src: '/logos/crown-security.svg' },
  { name: 'verifast.ai',    src: '/logos/verifast.svg' },
  { name: 'Bestq',          src: '/logos/bestq.svg' },
  { name: 'Sonexis',        src: '/logos/sonexis.svg' },
]

export default function HeroDashboard() {
  return (
    <div className="logo-wall" aria-label="Customers">
      {CUSTOMERS.map((c) => (
        <div key={c.name} className="logo-wall__cell" title={c.name}>
          <img
            className="logo-wall__img"
            src={c.src}
            alt={c.name}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}
