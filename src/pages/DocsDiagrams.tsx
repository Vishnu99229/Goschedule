import type { CSSProperties, ReactNode } from 'react'

const C = {
  purple: '#7C3AED',
  indigo: '#6366F1',
  violet: '#8B5CF6',
  dark: '#4C1D95',
}

const wrapStyle: CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 16,
  padding: 20,
  margin: '28px 0',
}

const captionStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: 14,
}

const sideLabelStyle: CSSProperties = {
  fontSize: 12,
  color: 'var(--text-muted)',
  fontStyle: 'italic',
  marginTop: 10,
  textAlign: 'center',
}

function Box({
  color,
  title,
  subtitle,
  style,
}: {
  color: string
  title: string
  subtitle?: string
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        background: color,
        color: '#fff',
        borderRadius: 12,
        padding: '14px 16px',
        boxShadow: '0 2px 10px rgba(76, 29, 149, 0.18)',
        minHeight: 64,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.25 }}>{title}</div>
      {subtitle && (
        <div style={{ fontSize: 12, opacity: 0.88, marginTop: 4, lineHeight: 1.35 }}>{subtitle}</div>
      )}
    </div>
  )
}

function SideBox({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--bg-base)',
        border: '1px dashed var(--border-hover)',
        borderRadius: 10,
        padding: '8px 12px',
        fontSize: 12,
        color: 'var(--text-secondary)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      }}
    >
      {children}
    </div>
  )
}

function Arrow({ direction = 'down' }: { direction?: 'down' | 'right' }) {
  if (direction === 'down') {
    return (
      <div
        aria-hidden
        style={{
          alignSelf: 'center',
          width: 2,
          height: 22,
          background: 'var(--border-hover)',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '50%',
            bottom: -6,
            transform: 'translateX(-50%) rotate(45deg)',
            width: 8,
            height: 8,
            borderRight: '2px solid var(--border-hover)',
            borderBottom: '2px solid var(--border-hover)',
          }}
        />
      </div>
    )
  }
  return (
    <div
      aria-hidden
      style={{
        alignSelf: 'center',
        height: 2,
        flex: '0 0 28px',
        background: 'var(--border-hover)',
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          right: -6,
          transform: 'translateY(-50%) rotate(45deg)',
          width: 8,
          height: 8,
          borderRight: '2px solid var(--border-hover)',
          borderTop: '2px solid var(--border-hover)',
        }}
      />
    </div>
  )
}

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 10,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  )
}

/* ========================================================================
   TECHNICAL NOTE: four-layer-stack
   ======================================================================== */
export function FourLayerStackDiagram() {
  const rows = [
    { color: C.purple, title: 'Vertical Understanding', subtitle: 'Menu, services, pricing, upsell logic' },
    { color: C.indigo, title: 'Channel Reach', subtitle: 'Voice, WhatsApp, QR, Web' },
    { color: C.violet, title: 'Local Fluency', subtitle: 'Indian English STT/TTS, names, code-mixing' },
    { color: C.dark, title: 'Action + Memory', subtitle: 'Book, upsell, follow up, remember' },
  ]
  return (
    <figure style={wrapStyle}>
      <div style={captionStyle}>Diagram: What we compose per business</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((r) => (
          <Box key={r.title} color={r.color} title={r.title} subtitle={r.subtitle} />
        ))}
      </div>
    </figure>
  )
}

/* ========================================================================
   TECHNICAL NOTE: pipeline-flow (Agents On The Fly)
   ======================================================================== */
export function PipelineFlowDiagram() {
  const steps = [
    { color: C.purple, title: 'Discovery', subtitle: 'Understand the business and the outcome' },
    { color: C.indigo, title: 'Blueprint', subtitle: 'Map channels, actions, persona, guardrails' },
    { color: C.violet, title: 'Assemble', subtitle: 'Compose from vertical templates plus core engine' },
    { color: C.dark, title: 'Deploy', subtitle: 'Live on voice, WhatsApp, QR in days' },
    { color: C.purple, title: 'Optimize', subtitle: 'Tune against real metrics from live interactions' },
  ]
  return (
    <figure style={wrapStyle}>
      <div style={captionStyle}>Diagram: Agents on the fly pipeline</div>
      <div className="docs-flow-row">
        {steps.map((s, i) => (
          <div key={s.title} className="docs-flow-row__step">
            <Box color={s.color} title={s.title} subtitle={s.subtitle} />
            {i < steps.length - 1 && <div className="docs-flow-row__arrow" aria-hidden />}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px dashed var(--accent-soft-border)',
          background: 'var(--accent-soft)',
          fontSize: 12,
          color: 'var(--accent-text)',
          textAlign: 'center',
        }}
      >
        Feedback: Optimize feeds back into Blueprint for continuous improvement
      </div>
      <style>{`
        .docs-flow-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 8px;
          align-items: stretch;
        }
        .docs-flow-row__step {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .docs-flow-row__arrow {
          height: 6px;
          background: linear-gradient(to right, var(--border-hover), transparent);
          border-radius: 999px;
          margin-top: 4px;
        }
        @media (max-width: 760px) {
          .docs-flow-row { grid-template-columns: 1fr; }
          .docs-flow-row__arrow {
            height: 14px;
            width: 2px;
            background: var(--border-hover);
            margin: 4px auto;
          }
        }
      `}</style>
    </figure>
  )
}

/* ========================================================================
   TECHNICAL NOTE: architecture (3 columns)
   ======================================================================== */
export function ArchitectureDiagram() {
  const cols: { title: string; boxes: { color: string; title: string }[] }[] = [
    {
      title: 'Customer Channels',
      boxes: [
        { color: C.purple, title: 'Voice (Phone)' },
        { color: C.purple, title: 'WhatsApp' },
        { color: C.purple, title: 'QR / Web Widget' },
      ],
    },
    {
      title: 'GoSchedule Core Engine',
      boxes: [
        { color: C.indigo, title: 'Orchestration + Reasoning (GPT-4o)' },
        { color: C.indigo, title: 'Voice Layer (Vapi + ElevenLabs, Indian English)' },
        { color: C.indigo, title: 'Per-business config + memory' },
      ],
    },
    {
      title: 'Actions + Integrations',
      boxes: [
        { color: C.violet, title: 'Calendar / Bookings' },
        { color: C.violet, title: 'Supabase (state, leads, logs)' },
        { color: C.violet, title: 'CRM / Webhooks / Payments' },
      ],
    },
  ]
  return (
    <figure style={wrapStyle}>
      <div style={captionStyle}>Diagram: Platform architecture</div>
      <div className="docs-arch">
        {cols.map((col, i) => (
          <div key={col.title} className="docs-arch__col">
            <ColumnTitle>{col.title}</ColumnTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.boxes.map((b) => (
                <Box key={b.title} color={b.color} title={b.title} />
              ))}
            </div>
            {i < cols.length - 1 && <div className="docs-arch__arrow" aria-hidden>→</div>}
          </div>
        ))}
      </div>
      <style>{`
        .docs-arch {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          position: relative;
        }
        .docs-arch__col {
          position: relative;
          min-width: 0;
        }
        .docs-arch__arrow {
          position: absolute;
          right: -14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 18px;
          font-weight: 700;
        }
        @media (max-width: 760px) {
          .docs-arch { grid-template-columns: 1fr; }
          .docs-arch__arrow {
            position: static;
            transform: none;
            text-align: center;
            margin: 8px 0;
            display: block;
          }
        }
      `}</style>
    </figure>
  )
}

/* ========================================================================
   MORNING BRIEF: morning-brief-pipeline (4 stages, vertical, side stores)
   ======================================================================== */
export function MorningBriefPipelineDiagram() {
  const stages = [
    {
      color: C.purple,
      title: 'INGEST',
      subtitle: 'RSS (8 feeds) + NewsAPI (5 categories)',
      side: 'news_pool table (Supabase)',
      transition: 'Deduplicate and scrape full text',
    },
    {
      color: C.indigo,
      title: 'RANK',
      subtitle: 'Heuristic scoring + GPT-4o re-ranking',
      side: 'User profile_json',
      transition: 'Top articles selected',
    },
    {
      color: C.violet,
      title: 'SCRIPT',
      subtitle: 'GPT-4o generates voice-ready briefing',
      side: 'daily_briefing table',
      transition: 'Script saved',
    },
    {
      color: C.dark,
      title: 'CALL',
      subtitle: 'Vapi + Twilio outbound phone call',
      side: 'ElevenLabs TTS (Indian English)',
      transition: null as string | null,
    },
  ]
  return (
    <figure style={wrapStyle}>
      <div style={captionStyle}>Diagram: Morning Brief pipeline</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {stages.map((s, i) => (
          <div key={s.title}>
            <div className="docs-pipeline-row">
              <Box color={s.color} title={s.title} subtitle={s.subtitle} />
              <SideBox>{s.side}</SideBox>
            </div>
            {s.transition && (
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  padding: '6px 0',
                }}
              >
                ↓ {s.transition}
              </div>
            )}
            {i === stages.length - 1 ? null : null}
          </div>
        ))}
      </div>
      <style>{`
        .docs-pipeline-row {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          gap: 16px;
          align-items: center;
        }
        @media (max-width: 640px) {
          .docs-pipeline-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </figure>
  )
}

/* ========================================================================
   REPLYKARO: replykaro-architecture (3-column flow)
   ======================================================================== */
export function ReplyKaroArchitectureDiagram() {
  const cols: { title: string; boxes: { color: string; title: string }[] }[] = [
    {
      title: 'Patient Contact',
      boxes: [
        { color: C.purple, title: 'Phone call' },
        { color: C.purple, title: 'WhatsApp message' },
      ],
    },
    {
      title: 'ReplyKaro Agent',
      boxes: [
        { color: C.indigo, title: 'Claude (AI brain)' },
        { color: C.indigo, title: 'Vapi + ElevenLabs (Voice, Indian English)' },
        { color: C.indigo, title: 'Twilio (WhatsApp + telephony)' },
      ],
    },
    {
      title: 'Actions',
      boxes: [
        { color: C.violet, title: 'Google Calendar (book appointment)' },
        { color: C.violet, title: 'Supabase (patient record, conversation log)' },
        { color: C.violet, title: 'Clinic Dashboard (real-time monitoring)' },
      ],
    },
  ]
  return (
    <figure style={wrapStyle}>
      <div style={captionStyle}>Diagram: ReplyKaro architecture</div>
      <div className="docs-arch">
        {cols.map((col, i) => (
          <div key={col.title} className="docs-arch__col">
            <ColumnTitle>{col.title}</ColumnTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.boxes.map((b) => (
                <Box key={b.title} color={b.color} title={b.title} />
              ))}
            </div>
            {i < cols.length - 1 && <div className="docs-arch__arrow" aria-hidden>→</div>}
          </div>
        ))}
      </div>
    </figure>
  )
}

/* ========================================================================
   REPLYKARO: dashboard-layout (2x2 grid)
   ======================================================================== */
export function DashboardLayoutDiagram() {
  const quads = [
    {
      color: C.purple,
      title: 'Dashboard',
      subtitle: "Today's appointments, upcoming bookings, live agent status, conversations handled",
    },
    {
      color: C.indigo,
      title: 'Patients',
      subtitle: 'Searchable directory with visit count and last appointment',
    },
    {
      color: C.violet,
      title: 'Analytics',
      subtitle: '30-day trends, channel breakdown, top treatments, conversion rate',
    },
    {
      color: C.dark,
      title: 'Settings',
      subtitle: 'Clinic info and service pricing (read-only)',
    },
  ]
  return (
    <figure style={wrapStyle}>
      <div style={captionStyle}>Diagram: Clinic dashboard sections</div>
      <div className="docs-quad-grid">
        {quads.map((q) => (
          <Box key={q.title} color={q.color} title={q.title} subtitle={q.subtitle} style={{ minHeight: 110 }} />
        ))}
      </div>
      <style>{`
        .docs-quad-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .docs-quad-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </figure>
  )
}

/* ========================================================================
   RESOUND: resound-architecture (5 stages + feedback + foundation bar)
   ======================================================================== */
export function ResoundArchitectureDiagram() {
  const stages = [
    { color: C.purple, title: 'Lead Ingestion', subtitle: 'CRM sync, CSV upload, enrichment' },
    { color: C.indigo, title: 'Campaign + Sequencing', subtitle: 'Multi-step outreach, personalization' },
    { color: C.violet, title: 'Send + Deliver', subtitle: 'Email via ESP, deliverability checks' },
    { color: C.dark, title: 'Reply Engine', subtitle: 'AI classification, consent capture' },
    { color: C.purple, title: 'Qualification', subtitle: 'Voice AI call, meeting booking' },
  ]
  return (
    <figure style={wrapStyle}>
      <div style={captionStyle}>Diagram: Resound target architecture</div>
      <div className="docs-flow-row docs-flow-row--5">
        {stages.map((s, i) => (
          <div key={s.title} className="docs-flow-row__step">
            <Box color={s.color} title={s.title} subtitle={s.subtitle} />
            {i < stages.length - 1 && <div className="docs-flow-row__arrow" aria-hidden />}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px dashed var(--accent-soft-border)',
          background: 'var(--accent-soft)',
          fontSize: 12,
          color: 'var(--accent-text)',
          textAlign: 'center',
        }}
      >
        Feedback: Stages 4 and 5 re-sequence into Stage 2 based on reply type
      </div>
      <div
        style={{
          marginTop: 12,
          padding: '12px 14px',
          borderRadius: 10,
          background: '#1A1614',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          textAlign: 'center',
          letterSpacing: '0.04em',
        }}
      >
        Multi-tenant foundation: Clerk auth, org management, Supabase, tRPC
      </div>
      <style>{`
        .docs-flow-row--5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        @media (max-width: 760px) {
          .docs-flow-row--5 { grid-template-columns: 1fr; }
        }
      `}</style>
    </figure>
  )
}
