/**
 * Client attribution cards.
 *
 * Replaces the previous metric-dashboard mockup. Three static cards, one
 * per client, no metrics, no numbers, no animation. The component name
 * is preserved (`HeroDashboard`) so existing imports keep working.
 */

type Attribution = {
  client: string
  product: string
  outcome: string
}

const ATTRIBUTIONS: Attribution[] = [
  {
    client: 'ASTRAL LTD',
    product: 'Custom Agent',
    outcome: 'Operational automation for account management',
  },
  {
    client: 'CAFE MUZIRIS',
    product: 'Orlena',
    outcome: 'Upsells on every QR menu order',
  },
  {
    client: 'CROWN SECURITY',
    product: 'ReplyKaro',
    outcome: 'Qualifies inbound enquiries',
  },
]

export default function HeroDashboard() {
  return (
    <div className="attribution-grid">
      {ATTRIBUTIONS.map((a) => (
        <div key={a.client} className="attribution-card">
          <span className="attribution-card-eyebrow">{a.client}</span>
          <div className="attribution-card-product">{a.product}</div>
          <p className="attribution-card-outcome">{a.outcome}</p>
        </div>
      ))}
    </div>
  )
}
