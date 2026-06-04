import DocsArticleLayout from './DocsArticleLayout'
import {
  DashboardLayoutDiagram,
  ReplyKaroArchitectureDiagram,
} from './DocsDiagrams'

const SITE = 'https://www.goschedule.ai'

export default function DocsReplyKaroPage() {
  return (
    <DocsArticleLayout
      title="ReplyKaro Documentation | GoSchedule.ai"
      description="Technical documentation for ReplyKaro. An AI receptionist for clinics that answers calls, handles WhatsApp, and books appointments."
      canonical={`${SITE}/docs/replykaro`}
      heading="ReplyKaro Documentation"
    >
      <h2 className="markdown__h2">Overview</h2>
      <p className="markdown__p">
        ReplyKaro is an AI-powered WhatsApp and voice receptionist built for dental and aesthetic clinics. It answers calls and messages, books appointments into the clinic's calendar, and handles the routine front-desk load that otherwise leaks revenue through missed contact.
      </p>
      <p className="markdown__p">
        The clinic owner monitors everything through a real-time dashboard. The agent works. The owner watches the numbers.
      </p>

      <h2 className="markdown__h2">System Architecture</h2>

      <ReplyKaroArchitectureDiagram />

      <h2 className="markdown__h2">How The Agent Works</h2>
      <p className="markdown__p">
        When a patient calls or sends a WhatsApp message, the ReplyKaro agent handles the full conversation loop:
      </p>
      <ol className="markdown__ol">
        <li className="markdown__li">
          <strong className="markdown__strong">Receives the contact</strong> via Twilio (voice call or WhatsApp message)
        </li>
        <li className="markdown__li">
          <strong className="markdown__strong">Understands the intent</strong> using Claude as the AI brain
        </li>
        <li className="markdown__li">
          <strong className="markdown__strong">Checks availability</strong> against the clinic's Google Calendar
        </li>
        <li className="markdown__li">
          <strong className="markdown__strong">Books the appointment</strong> directly into the calendar and Supabase
        </li>
        <li className="markdown__li">
          <strong className="markdown__strong">Confirms with the patient</strong> with details (date, time, treatment, location)
        </li>
        <li className="markdown__li">
          <strong className="markdown__strong">Logs everything</strong> so the dashboard updates in real time
        </li>
      </ol>
      <p className="markdown__p">
        The voice pipeline uses Vapi for real-time audio and ElevenLabs with an Indian English voice, so the agent sounds natural to patients in India rather than robotic or foreign.
      </p>

      <h2 className="markdown__h2">Data Model</h2>
      <p className="markdown__p">The system writes to five core tables in Supabase:</p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Table</th>
              <th>Key fields</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>clinics</td>
              <td>id, slug, name, address</td>
              <td>Clinic identity, selected by slug</td>
            </tr>
            <tr>
              <td>services</td>
              <td>id, clinic_id, name, price</td>
              <td>Treatment menu and pricing</td>
            </tr>
            <tr>
              <td>patients</td>
              <td>id, name, phone, created_at</td>
              <td>Patient directory</td>
            </tr>
            <tr>
              <td>appointments</td>
              <td>id, patient_id, date, time, treatment, booked_via, status</td>
              <td>Booking records with channel tracking</td>
            </tr>
            <tr>
              <td>messages</td>
              <td>id, patient_id, created_at</td>
              <td>AI conversation log</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">
        The <code className="markdown__code">booked_via</code> field on appointments tracks whether the booking came through voice or WhatsApp, which powers the channel breakdown analytics.
      </p>

      <h2 className="markdown__h2">The Clinic Dashboard</h2>
      <p className="markdown__p">
        The owner gets a mobile-first monitoring dashboard with four sections.
      </p>

      <DashboardLayoutDiagram />

      <h3 className="markdown__h3">Dashboard (home)</h3>
      <p className="markdown__p">
        The cockpit view. Shows the clinic name, an "Agent live" pulse indicator, and four stat cards: today's appointments, this week's count, total patients, and conversations handled by AI. Three tabs let you switch between today's schedule, upcoming appointments (grouped by date), and recent conversations.
      </p>

      <h3 className="markdown__h3">Patients</h3>
      <p className="markdown__p">
        A searchable directory showing each patient with their total visit count and last appointment date. Patient data is enriched at read time by joining against the appointments table.
      </p>

      <h3 className="markdown__h3">Analytics</h3>
      <p className="markdown__p">
        Last 30 days of performance with four computed metrics and three charts:
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>How it is calculated</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Monthly total</td><td>Count of appointments in the last 30 days</td></tr>
            <tr><td>Conversion rate</td><td>Bookings divided by unique conversations, capped at 100%</td></tr>
            <tr><td>Average per day</td><td>Monthly total divided by 30</td></tr>
            <tr><td>Busiest day</td><td>Day of week with the highest appointment count</td></tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">
        <strong className="markdown__strong">Charts:</strong>
      </p>
      <ul className="markdown__ul">
        <li className="markdown__li">Appointments per day (30-day bar chart)</li>
        <li className="markdown__li">Bookings by channel (WhatsApp vs Voice donut chart)</li>
        <li className="markdown__li">Top treatments (horizontal bar, top 7 treatments)</li>
      </ul>

      <h3 className="markdown__h3">Settings</h3>
      <p className="markdown__p">
        Read-only display of clinic information and service pricing. Editing is intentionally out of scope for the monitoring dashboard.
      </p>

      <h2 className="markdown__h2">Who It Is For</h2>
      <p className="markdown__p">
        Dental clinics and aesthetic clinics in India, starting with Bangalore. The ideal customer is any clinic where the front desk is a bottleneck: missed calls after hours, WhatsApp messages that sit unread, appointment slots that go unfilled because nobody followed up.
      </p>

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
            <tr><td>AI brain</td><td>Claude (Anthropic API)</td><td>Natural conversation and intent handling</td></tr>
            <tr><td>Voice</td><td>Vapi + ElevenLabs</td><td>Real-time voice, Indian English</td></tr>
            <tr><td>Messaging</td><td>Twilio</td><td>WhatsApp and telephony</td></tr>
            <tr><td>Bookings</td><td>Google Calendar</td><td>Appointment scheduling</td></tr>
            <tr><td>Data</td><td>Supabase (PostgreSQL)</td><td>Patients, appointments, conversations</td></tr>
            <tr><td>Dashboard</td><td>React 19, Vite 8, Tailwind v4</td><td>Mobile-first monitoring UI</td></tr>
            <tr><td>Charts</td><td>Recharts 3</td><td>Analytics visualizations</td></tr>
            <tr><td>Dashboard hosting</td><td>Vercel</td><td>Static SPA deployment</td></tr>
            <tr><td>Agent hosting</td><td>Railway</td><td>Backend services</td></tr>
          </tbody>
        </table>
      </div>
    </DocsArticleLayout>
  )
}
