import DocsArticleLayout from './DocsArticleLayout'
import { MorningBriefPipelineDiagram } from './DocsDiagrams'

const SITE = 'https://www.goschedule.ai'

export default function DocsMorningBriefPage() {
  return (
    <DocsArticleLayout
      title="Morning Brief Documentation | GoSchedule.ai"
      description="Technical documentation for Morning Brief. A personalized AI news agent that calls you every morning with only the stories that matter."
      canonical={`${SITE}/docs/morning-brief`}
      heading="Morning Brief Documentation"
    >
      <h2 className="markdown__h2">Overview</h2>
      <p className="markdown__p">
        Morning Brief is a personalized AI agent that delivers a curated news briefing as a phone call every morning. It pulls from dozens of sources, scores every article against your personal profile using a two-stage ranking system, writes a voice-ready script in your preferred tone, and calls you to read it aloud.
      </p>
      <p className="markdown__p">
        No feed to scroll. No inbox to clear. Just the few things worth knowing before your day starts.
      </p>

      <h2 className="markdown__h2">System Architecture</h2>

      <MorningBriefPipelineDiagram />

      <h2 className="markdown__h2">Stage 1: News Ingestion</h2>
      <p className="markdown__p">
        Every day, Morning Brief pulls articles from a curated set of sources chosen for coverage of Indian business, global tech, and startup ecosystems.
      </p>
      <p className="markdown__p">
        <strong className="markdown__strong">RSS Feeds (8 sources):</strong>
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Moneycontrol Business</td><td>Indian markets and business</td></tr>
            <tr><td>Inc42</td><td>Indian startup ecosystem</td></tr>
            <tr><td>ET Tech</td><td>Indian technology sector</td></tr>
            <tr><td>TechCrunch</td><td>Global startups and venture</td></tr>
            <tr><td>The Verge AI</td><td>AI and machine learning</td></tr>
            <tr><td>Hacker News (front page)</td><td>Developer and tech community</td></tr>
            <tr><td>Reuters India</td><td>Asia-focused global news</td></tr>
            <tr><td>BusinessLine Info-tech</td><td>Indian IT industry</td></tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">
        <strong className="markdown__strong">NewsAPI</strong> adds five additional query categories covering broader themes.
      </p>
      <p className="markdown__p">
        Articles are deduplicated by URL, then full text is scraped using article extraction so the ranking system works on complete content, not just headlines.
      </p>

      <h2 className="markdown__h2">Stage 2: Two-Stage Ranking</h2>
      <p className="markdown__p">
        This is the core intelligence. A cheap, fast heuristic pass filters the pool, then GPT-4o applies deeper judgment to the survivors.
      </p>

      <h3 className="markdown__h3">Stage 2a: Heuristic Scoring</h3>
      <p className="markdown__p">
        Each article is matched against seven dimensions of the user's profile, with weighted scoring:
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Match dimension</th>
              <th>Weight</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>VIP entities</td><td>4</td><td>Companies, people, or brands you track closely</td></tr>
            <tr><td>Active work</td><td>3</td><td>Your current projects and why news matters for them</td></tr>
            <tr><td>Financial interests</td><td>3</td><td>Markets, sectors, or instruments you follow</td></tr>
            <tr><td>Current city</td><td>2</td><td>Local news from where you live now</td></tr>
            <tr><td>Personal interests</td><td>2</td><td>Topics you care about personally</td></tr>
            <tr><td>Hometown</td><td>1</td><td>News from your hometown</td></tr>
            <tr><td>Hobbies</td><td>1</td><td>Hobby-related stories</td></tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">A recency bonus is added with linear decay:</p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Article age</th>
              <th>Bonus points</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Under 1 hour</td><td>+3</td></tr>
            <tr><td>1 to 6 hours</td><td>+2</td></tr>
            <tr><td>6 to 12 hours</td><td>+1</td></tr>
            <tr><td>12 to 24 hours</td><td>+0.5</td></tr>
            <tr><td>Over 24 hours</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">
        Articles matching the user's explicit filters (topics to exclude) are flagged with negative signals and suppressed.
      </p>

      <h3 className="markdown__h3">Stage 2b: LLM Re-Ranking</h3>
      <p className="markdown__p">
        Surviving articles are sent to GPT-4o with a detailed scoring rubric. The model assigns a refined score and classifies each article into a trigger type:
      </p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Trigger type</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>outreach_hook</td><td>Useful for your professional outreach</td></tr>
            <tr><td>market_signal</td><td>Relevant market or industry movement</td></tr>
            <tr><td>competitor_move</td><td>Activity from a competitor or adjacent player</td></tr>
            <tr><td>learning</td><td>Something worth knowing for personal growth</td></tr>
            <tr><td>local_relevance</td><td>News tied to your geography</td></tr>
            <tr><td>lifestyle</td><td>Hobby, culture, or personal interest</td></tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">
        Each article also receives a short "why relevant" explanation that feeds directly into the voice script, making the briefing personal rather than generic.
      </p>

      <h2 className="markdown__h2">Stage 3: Script Generation</h2>
      <p className="markdown__p">
        The top-scoring articles are handed to GPT-4o with the user's tone preference (for example, "warm, direct, slightly informal"). The model writes a continuous, natural briefing script where each story flows into the next and every item explains why it matters to this specific person.
      </p>
      <p className="markdown__p">
        The script is saved to the daily_briefing table along with the full article data and the complete ranking debug trace.
      </p>

      <h2 className="markdown__h2">Stage 4: Voice Delivery</h2>
      <p className="markdown__p">
        The script is delivered via an outbound phone call using Vapi and a Twilio-backed phone number, spoken through an ElevenLabs voice tuned for Indian English. The agent can answer follow-up questions on any story because the full article text is preserved on each enriched article.
      </p>

      <h2 className="markdown__h2">The Personalization Profile</h2>
      <p className="markdown__p">The entire system runs on a structured user profile:</p>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>name, role_context</td><td>Who you are and what you do</td></tr>
            <tr><td>active_work[]</td><td>Current projects, each with why news matters for it</td></tr>
            <tr><td>personal_interests</td><td>Topics you care about</td></tr>
            <tr><td>financial_interests</td><td>Markets and instruments you follow</td></tr>
            <tr><td>locations (current_city, hometown)</td><td>Geographic relevance</td></tr>
            <tr><td>hobbies</td><td>Leisure interests</td></tr>
            <tr><td>vip_entities</td><td>High-priority names, companies, brands</td></tr>
            <tr><td>tone_preference</td><td>How the briefing should sound</td></tr>
            <tr><td>explicit_filters</td><td>Topics to actively exclude</td></tr>
          </tbody>
        </table>
      </div>
      <p className="markdown__p">
        Keywords support aliases (for example, "RBI" also matches "Reserve Bank of India"), so matching is thorough without being noisy.
      </p>

      <h2 className="markdown__h2">Tech Stack</h2>
      <div className="markdown__table-wrap">
        <table className="markdown__table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Runtime</td><td>Node.js, TypeScript (ESM)</td></tr>
            <tr><td>Database</td><td>Supabase (PostgreSQL)</td></tr>
            <tr><td>AI</td><td>OpenAI GPT-4o (ranking + script)</td></tr>
            <tr><td>News</td><td>RSS (rss-parser) + NewsAPI</td></tr>
            <tr><td>Text extraction</td><td>@extractus/article-extractor</td></tr>
            <tr><td>Voice</td><td>Vapi outbound calls + Twilio</td></tr>
            <tr><td>TTS</td><td>ElevenLabs (Indian English)</td></tr>
            <tr><td>Hosting</td><td>Railway</td></tr>
          </tbody>
        </table>
      </div>
    </DocsArticleLayout>
  )
}
