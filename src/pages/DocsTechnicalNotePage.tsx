import DocsArticleLayout from './DocsArticleLayout'
import {
  ArchitectureDiagram,
  FourLayerStackDiagram,
  PipelineFlowDiagram,
} from './DocsDiagrams'

const SITE = 'https://www.goschedule.ai'

export default function DocsTechnicalNotePage() {
  return (
    <DocsArticleLayout
      title="Our Technical Note | GoSchedule.ai"
      description="How GoSchedule.ai builds vertical AI agents that drive real business outcomes, not generic assistants."
      canonical={`${SITE}/docs/technical-note`}
      heading="Our Technical Note"
    >
      <h2 className="markdown__h2">The Global Problem We Are Solving</h2>
      <p className="markdown__p">
        Despite massive investment in AI tooling, the businesses that stand to gain the most from automation are the ones least served by it. Enterprises get bespoke systems and dedicated teams. The roughly 60 million small and mid-sized businesses in India get generic chatbots that deflect rather than perform.
      </p>
      <p className="markdown__p">
        The core problem is not access to AI. It is that the shape of the product is wrong. A horizontal assistant optimizes for plausible conversation. A business needs an agent that optimizes for a specific number: bookings filled, order value lifted, calls answered, leads qualified. These are fundamentally different objectives, and prompting a general model does not bridge them.
      </p>
      <p className="markdown__p">
        Every business leaks revenue at the point of customer contact. The call that rings out after hours. The WhatsApp that sits unread until the lead goes cold. The patient who never got a reminder. The happy customer who was never asked for a review. This is not an edge case. It is the daily reality for most local businesses, and the gap between what they need and what current AI tools offer is where we operate.
      </p>

      <h2 className="markdown__h2">Our Contrarian Thesis: Three Assumptions The Market Gets Wrong</h2>

      <h3 className="markdown__h3">1. The Horizontal Agent Fallacy</h3>
      <p className="markdown__p">
        The market assumes one powerful general assistant can serve any business with the right prompt.
      </p>
      <p className="markdown__p">
        The reality: a generic agent carries no business context. It cannot know that this cafe's goal is lifting average order value from 280 to 400, or that this clinic's 4 PM slot goes empty every Tuesday. Without that grounding, the agent produces plausible responses but not business outcomes.
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>What generic agents do</th>
              <th>What business-outcome agents do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Answer questions</td>
              <td>Drive a specific metric</td>
            </tr>
            <tr>
              <td>Respond when prompted</td>
              <td>Proactively upsell, remind, follow up</td>
            </tr>
            <tr>
              <td>Treat every business the same</td>
              <td>Carry vertical-specific configuration</td>
            </tr>
            <tr>
              <td>Optimize for conversation quality</td>
              <td>Optimize for revenue impact</td>
            </tr>
            <tr>
              <td>No accountability to a number</td>
              <td>Measured against a KPI</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="markdown__h3">2. The Self-Serve Configuration Trap</h3>
      <p className="markdown__p">
        The market assumes the path to scale is a no-code builder where the business owner assembles their own agent.
      </p>
      <p className="markdown__p">
        The reality: a cafe owner in Kochi or a dental clinic in Bangalore does not want to configure states, transitions, and prompt chains. They want results. The build-it-yourself model excludes the exact customers who represent the largest addressable market. We invert this: the customer describes the outcome, we build the agent.
      </p>

      <h3 className="markdown__h3">3. AI As A Feature Versus AI As The Employee</h3>
      <p className="markdown__p">
        The market assumes you bolt a chatbot onto an existing product and call it AI-powered.
      </p>
      <p className="markdown__p">
        The reality: a chatbot deflects. An employee performs. The difference is whether the system can take the action that creates value: book the appointment, place the upsell, send the follow-up, route the lead, log it in the CRM, and close the loop. We do not ship a chat window. We ship a worker that owns a job and is measured against it.
      </p>

      <h2 className="markdown__h2">What A Business Outcome Actually Requires</h2>
      <p className="markdown__p">
        When a customer contacts a business, closing the loop on revenue requires four layers working in concert. Most AI tools deliver one. The gap between one layer and four is the reason generic agents fail in the field.
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>What it means</th>
              <th>What it requires</th>
              <th>Why generic agents miss it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vertical understanding</td>
              <td>The agent knows this specific business: menu, services, pricing, policies, peak hours, upsell logic</td>
              <td>Deep per-business configuration that encodes domain knowledge</td>
              <td>Generic agents start cold every conversation, reconstructing context from a prompt</td>
            </tr>
            <tr>
              <td>Channel reach</td>
              <td>The customer is met where they already are: voice call, WhatsApp, QR at the table, web widget</td>
              <td>Multi-channel orchestration with unified state</td>
              <td>Most tools live on one channel and force the business to adapt</td>
            </tr>
            <tr>
              <td>Local fluency</td>
              <td>Real Indian English, code-mixed speech, names and places pronounced correctly</td>
              <td>India-tuned STT and TTS, local context awareness</td>
              <td>Western-trained voice stacks degrade on Indian accents, breaking trust in the first seconds</td>
            </tr>
            <tr>
              <td>Action and memory</td>
              <td>The agent does not just talk. It books, upsells, follows up, remembers the customer</td>
              <td>Calendar, CRM, payments, and state persistence integrations</td>
              <td>Chat-only tools have no hands. They cannot complete the transaction</td>
            </tr>
          </tbody>
        </table>
      </div>

      <FourLayerStackDiagram />

      <h2 className="markdown__h2">Our Approach: Agents On The Fly</h2>
      <p className="markdown__p">
        This is the core methodology and the part competitors cannot replicate by reading marketing copy, because it is institutional knowledge, not a feature.
      </p>

      <PipelineFlowDiagram />

      <p className="markdown__p">
        <strong className="markdown__strong">Discovery.</strong> We start from the outcome, not the technology. What number should move? Bookings, average order value, answered call rate, review volume, qualified leads. We capture business context that a generic prompt would never surface.
      </p>
      <p className="markdown__p">
        <strong className="markdown__strong">Blueprint.</strong> We map the agent: which channels, which actions it can take, its persona and tone, its escalation rules, and the integrations it touches (calendar, CRM, payments).
      </p>
      <p className="markdown__p">
        <strong className="markdown__strong">Assemble.</strong> We compose the agent from a growing library of vertical templates running on a shared core engine. Each new build makes the next one in that vertical faster and better.
      </p>
      <p className="markdown__p">
        <strong className="markdown__strong">Deploy.</strong> Live in days, not the three to six months of a bespoke enterprise project. The customer sees value before patience runs out.
      </p>
      <p className="markdown__p">
        <strong className="markdown__strong">Optimize.</strong> The agent is tuned against the real business metric using live interaction data, and the loop feeds back into the blueprint. Improvement is continuous, not a one-time delivery.
      </p>

      <h2 className="markdown__h2">Platform Architecture</h2>
      <p className="markdown__p">
        Every GoSchedule agent runs on one shared core. Verticals differ in configuration, not in foundation.
      </p>

      <ArchitectureDiagram />

      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Technology</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reasoning</td>
              <td>OpenAI GPT-4o</td>
              <td>Agent brain, model selection tuned per task</td>
            </tr>
            <tr>
              <td>Voice</td>
              <td>Vapi + ElevenLabs</td>
              <td>Real-time voice pipeline, Indian English tuned</td>
            </tr>
            <tr>
              <td>Messaging</td>
              <td>Twilio</td>
              <td>WhatsApp and telephony connectivity</td>
            </tr>
            <tr>
              <td>Data</td>
              <td>Supabase (PostgreSQL)</td>
              <td>Configuration, bookings, leads, interaction logs</td>
            </tr>
            <tr>
              <td>Scheduling</td>
              <td>Google Calendar</td>
              <td>Appointment booking and availability</td>
            </tr>
            <tr>
              <td>Infrastructure</td>
              <td>Railway</td>
              <td>Hosting, deployment, fast iteration</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="markdown__h2">Why We Win</h2>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Moat</th>
              <th>Why it compounds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Methodology</td>
              <td>The agents-on-the-fly pipeline is institutional knowledge that gets faster with every build</td>
            </tr>
            <tr>
              <td>Vertical templates</td>
              <td>Each deployment encodes configuration knowledge for that vertical. New builds inherit it</td>
            </tr>
            <tr>
              <td>India and local tuning</td>
              <td>Voice fluency for Indian English, names, and code-mixing is a real engineering investment</td>
            </tr>
            <tr>
              <td>Outcome accountability</td>
              <td>We sell against a business metric, not a chat window. Churn is structurally low</td>
            </tr>
            <tr>
              <td>Distribution and GTM</td>
              <td>Deep voice-AI go-to-market experience with live reference customers</td>
            </tr>
            <tr>
              <td>Compounding config data</td>
              <td>Every interaction teaches the system how that vertical converts</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DocsArticleLayout>
  )
}
