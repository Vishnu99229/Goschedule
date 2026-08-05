import DocsArticleLayout from './DocsArticleLayout'
import { ResoundArchitectureDiagram } from './DocsDiagrams'

const SITE = 'https://www.goschedule.ai'

export default function DocsResoundPage() {
  return (
    <DocsArticleLayout
      title="Resound.ai Documentation | Goschedule.ai"
      description="Technical documentation for Resound.ai. A multi-tenant outbound sales automation platform with AI reply handling and voice qualification."
      canonical={`${SITE}/docs/resound`}
      heading="Resound.ai Documentation"
      badge="Early access"
      relatedHref="/work/resound"
      relatedLabel="Explore Resound.ai"
    >
      <h2 className="markdown__h2">Overview</h2>
      <p className="markdown__p">
        Resound.ai is a multi-tenant platform for outbound sales automation. It runs your outbound motion from first touch to booked meeting: connecting your CRM and email tools, classifying every reply with AI, capturing explicit consent, and using voice AI to qualify leads and book meetings straight back into your CRM.
      </p>
      <p className="markdown__p">
        Built to scale outbound without scaling the headcount behind it.
      </p>
      <p className="markdown__p">
        <strong className="markdown__strong">Status: Early Access.</strong> The foundation is live. Advanced capabilities are rolling out in phases.
      </p>

      <h2 className="markdown__h2">The Problem</h2>
      <p className="markdown__p">
        Most outbound sales teams hit the same ceiling: adding more pipeline means adding more SDRs, and SDRs are expensive, inconsistent, and hard to retain. The repetitive parts of the motion (sequencing, sending, reply sorting, follow-up, scheduling) eat most of the SDR's day while the high-judgment work (qualifying, negotiating, closing) gets squeezed.
      </p>
      <p className="markdown__p">
        Resound replaces the repetitive parts with AI and keeps humans in the loop for the decisions that matter.
      </p>

      <h2 className="markdown__h2">Target Architecture</h2>

      <ResoundArchitectureDiagram />

      <h2 className="markdown__h2">What Is Built Today (Phase 0)</h2>
      <p className="markdown__p">
        Phase 0 establishes the multi-tenant foundation that every future capability builds on.
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Technology</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Monorepo</td><td>pnpm + Turborepo</td><td>Live</td></tr>
            <tr><td>Frontend</td><td>Next.js 15 (App Router)</td><td>Live</td></tr>
            <tr><td>Auth + orgs</td><td>Clerk (sign-in, sign-up, org creation, membership)</td><td>Live</td></tr>
            <tr><td>Database</td><td>Supabase Postgres via Drizzle ORM + migrations</td><td>Live</td></tr>
            <tr><td>Webhook sync</td><td>Clerk events into users, organizations, org_members</td><td>Live</td></tr>
            <tr><td>API layer</td><td>tRPC v11 with org-aware procedures</td><td>Live</td></tr>
            <tr><td>Dashboard shell</td><td>Authenticated, org-scoped</td><td>Live</td></tr>
            <tr><td>CI</td><td>Typecheck, lint, build on every PR</td><td>Live</td></tr>
            <tr><td>Hosting</td><td>Railway (Singapore region)</td><td>Live</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="markdown__h3">Clerk Webhook Sync</h3>
      <p className="markdown__p">
        The system listens for seven Clerk webhook events and syncs them into the database in real time:
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Event</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>user.created</td><td>Creates a user record</td></tr>
            <tr><td>user.updated</td><td>Updates user details</td></tr>
            <tr><td>user.deleted</td><td>Removes user record</td></tr>
            <tr><td>organization.created</td><td>Creates an org record</td></tr>
            <tr><td>organization.updated</td><td>Updates org details</td></tr>
            <tr><td>organization.deleted</td><td>Removes org record</td></tr>
            <tr><td>organizationMembership.created</td><td>Links user to org</td></tr>
            <tr><td>organizationMembership.deleted</td><td>Unlinks user from org</td></tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">
        This means the database always reflects the current state of Clerk without manual sync, and every tRPC procedure can be org-scoped out of the box.
      </p>

      <h2 className="markdown__h2">What Is Coming</h2>
      <p className="markdown__p">
        The following capabilities are planned for upcoming phases:
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Capability</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Phase 1</td><td>CRM connector</td><td>Sync contacts from HubSpot, Salesforce, or custom CRM</td></tr>
            <tr><td>Phase 1</td><td>ESP integration</td><td>Connect email sending tools for deliverability</td></tr>
            <tr><td>Phase 2</td><td>Lead enrichment</td><td>Apollo API integration for contact enrichment</td></tr>
            <tr><td>Phase 2</td><td>Campaign management</td><td>Multi-step sequences with personalization</td></tr>
            <tr><td>Phase 3</td><td>Reply engine</td><td>AI classification of inbound replies</td></tr>
            <tr><td>Phase 3</td><td>Consent capture</td><td>Explicit opt-in tracking and compliance</td></tr>
            <tr><td>Phase 4</td><td>Voice AI</td><td>Outbound qualification calls via Vapi</td></tr>
            <tr><td>Phase 4</td><td>Calendar booking</td><td>Cal.com integration for meeting scheduling</td></tr>
            <tr><td>Future</td><td>Analytics</td><td>Campaign performance and pipeline metrics</td></tr>
            <tr><td>Future</td><td>Billing</td><td>Subscription management and usage tracking</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="markdown__h2">Tech Stack</h2>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Framework</td><td>Next.js 15 (App Router)</td><td>Frontend and API routes</td></tr>
            <tr><td>Monorepo</td><td>pnpm + Turborepo</td><td>Build orchestration</td></tr>
            <tr><td>Auth</td><td>Clerk</td><td>Users, orgs, SSO, webhooks</td></tr>
            <tr><td>Database</td><td>Supabase Postgres</td><td>Primary data store</td></tr>
            <tr><td>ORM</td><td>Drizzle</td><td>Schema, migrations, type-safe queries</td></tr>
            <tr><td>API</td><td>tRPC v11</td><td>Type-safe, org-aware procedures</td></tr>
            <tr><td>Hosting</td><td>Railway (Singapore)</td><td>Production deployment</td></tr>
            <tr><td>CI</td><td>GitHub Actions</td><td>Typecheck, lint, build per PR</td></tr>
          </tbody>
        </table>
      </div>
    </DocsArticleLayout>
  )
}
