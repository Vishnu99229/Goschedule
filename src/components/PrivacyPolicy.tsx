import SEO from './SEO'

export default function PrivacyPolicy() {
    return (
        <main style={{ padding: 'var(--space-10) 0', minHeight: '100vh' }}>
            <SEO
                title="Privacy Policy | Goschedule.ai"
                description="Privacy policy for Goschedule.ai. Learn how we collect, use, and protect your data."
                canonical="https://www.goschedule.ai/privacy-policy"
            />
            <div className="container" style={{ maxWidth: '800px' }}>

                {/* Header */}
                <div style={{ marginBottom: 'var(--space-8)' }}>
                    <div className="badge" style={{ marginBottom: 'var(--space-3)' }}>Legal</div>
                    <h1 className="h2" style={{ marginBottom: 'var(--space-2)' }}>Privacy Policy</h1>
                    <p className="body-sm">Last updated: April 3, 2026</p>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

                    <Section title="1. Introduction">
                        <p>
                            At Goschedule.ai ("Company," "we," "our," or "us"), we are committed to protecting the privacy and security of your personal and business information. This Privacy Policy explains how we collect, use, disclose, store, and protect your data when you access our website, platform, and services (collectively, the "Services").
                        </p>
                        <p>
                            By using our Services, you consent to the data practices described in this Privacy Policy. If you do not agree, please discontinue use of the Services.
                        </p>
                    </Section>

                    <Section title="2. Information We Collect">
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', marginTop: '12px' }}>2.1 Information You Provide</h3>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, job title, and company name provided through contact forms, onboarding, or direct communication.</li>
                            <li><strong>Business Information:</strong> Company details, industry, target market specifications, Ideal Customer Profile (ICP) data, and similar information provided for service customization.</li>
                            <li><strong>Account Information:</strong> Login credentials and account preferences if you access our platform or dashboard.</li>
                            <li><strong>Communication Data:</strong> Records of your correspondence with us, including emails, chat messages, and support requests.</li>
                        </ul>

                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', marginTop: '16px' }}>2.2 Information Collected Automatically</h3>
                        <ul>
                            <li><strong>Usage Data:</strong> Pages visited, time spent on the site, click patterns, referral sources, browser type, and device information.</li>
                            <li><strong>IP Address &amp; Location:</strong> Approximate geographic location derived from your IP address.</li>
                            <li><strong>Cookies &amp; Tracking Technologies:</strong> Information collected through cookies, web beacons, and similar technologies (see Section 6 below).</li>
                        </ul>

                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', marginTop: '16px' }}>2.3 Third-Party Data</h3>
                        <ul>
                            <li><strong>Publicly Available Data:</strong> Business contact information obtained from publicly available sources for the purpose of lead generation and outreach.</li>
                            <li><strong>Enrichment Data:</strong> Information obtained from third-party data enrichment services (e.g., professional profiles, company intelligence) to enhance lead qualification.</li>
                        </ul>
                    </Section>

                    <Section title="3. How We Use Your Data">
                        <p>We use the information we collect for the following purposes:</p>
                        <ul>
                            <li><strong>Service Delivery:</strong> To provide, operate, and maintain our AI-powered lead generation, outbound automation, and consulting Services.</li>
                            <li><strong>Lead Generation &amp; Qualification:</strong> To identify, verify, and qualify prospective leads on behalf of our clients using AI systems and data analytics.</li>
                            <li><strong>Communication:</strong> To respond to inquiries, send service updates, onboarding instructions, and relevant notifications.</li>
                            <li><strong>Analytics &amp; Improvement:</strong> To analyze usage patterns, measure performance, and improve the functionality, user experience, and effectiveness of our Services.</li>
                            <li><strong>Marketing:</strong> To send promotional communications about new features, services, or offers, provided you have consented or have not opted out.</li>
                            <li><strong>Security &amp; Compliance:</strong> To detect, prevent, and address fraud, unauthorized access, and technical issues, and to comply with applicable legal requirements.</li>
                        </ul>
                    </Section>

                    <Section title="4. Data Sharing &amp; Disclosure">
                        <p>We do not sell your personal information. We may share your data with the following categories of recipients:</p>
                        <ul>
                            <li><strong>Service Providers &amp; Tools:</strong> Third-party tools and platforms used in the delivery of our Services, including CRM systems (e.g., HubSpot, Salesforce), email delivery services, AI and machine learning APIs (e.g., OpenAI), analytics platforms, and communication tools.</li>
                            <li><strong>Clients:</strong> Lead data and qualification reports generated through our Services are shared with the respective Client who engaged us for lead generation.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, court order, or governmental request, or if disclosure is necessary to protect our rights, safety, or property.</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction, subject to the same privacy commitments.</li>
                        </ul>
                    </Section>

                    <Section title="5. Data Security">
                        <p>We implement reasonable administrative, technical, and physical safeguards to protect your information, including:</p>
                        <ul>
                            <li>Encryption of data in transit (TLS/SSL) and at rest where applicable.</li>
                            <li>Access controls limiting data access to authorized personnel only.</li>
                            <li>Regular security reviews and vulnerability assessments.</li>
                            <li>Secure third-party integrations with vetted providers.</li>
                        </ul>
                        <p>
                            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section title="6. Cookies &amp; Tracking Technologies">
                        <p>Our website may use the following types of cookies and tracking technologies:</p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Required for the proper functioning of the website and cannot be disabled.</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously (e.g., Google Analytics).</li>
                            <li><strong>Marketing Cookies:</strong> Used to track visitors across websites and display relevant advertisements.</li>
                        </ul>
                        <p>
                            You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of the website.
                        </p>
                    </Section>

                    <Section title="7. Your Rights">
                        <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                        <ul>
                            <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
                            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                            <li><strong>Right to Erasure:</strong> Request deletion of your personal data, subject to legal and contractual obligations.</li>
                            <li><strong>Right to Restrict Processing:</strong> Request that we limit the processing of your data in certain circumstances.</li>
                            <li><strong>Right to Data Portability:</strong> Request your data in a structured, commonly used, and machine-readable format.</li>
                            <li><strong>Right to Object:</strong> Object to the processing of your data for direct marketing purposes.</li>
                            <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us at <a href="mailto:hello@goschedule.ai" style={{ color: 'var(--accent-text)', textDecoration: 'underline' }}>hello@goschedule.ai</a>. We will respond to your request within thirty (30) days.
                        </p>
                    </Section>

                    <Section title="8. Data Retention">
                        <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including:</p>
                        <ul>
                            <li><strong>Active engagement data:</strong> Retained for the duration of the service engagement plus twelve (12) months after termination.</li>
                            <li><strong>Communication records:</strong> Retained for a period of twenty-four (24) months.</li>
                            <li><strong>Analytics data:</strong> Retained in anonymized form indefinitely for trend analysis and service improvement.</li>
                            <li><strong>Legal and compliance data:</strong> Retained for the period required by applicable law.</li>
                        </ul>
                        <p>
                            Upon expiration of the retention period, data will be securely deleted or anonymized.
                        </p>
                    </Section>

                    <Section title="9. International Data Transfers">
                        <p>
                            Your information may be stored and processed in countries other than your country of residence. We ensure that any such transfers are conducted with appropriate safeguards in compliance with applicable data protection laws, including the use of Standard Contractual Clauses or equivalent mechanisms where required.
                        </p>
                    </Section>

                    <Section title="10. Children's Privacy">
                        <p>
                            Our Services are intended for business use and are not directed at individuals under the age of eighteen (18). We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a minor, we will take steps to delete it promptly.
                        </p>
                    </Section>

                    <Section title="11. Compliance">
                        <p>This Privacy Policy is designed to comply with:</p>
                        <ul>
                            <li><strong>General Data Protection Regulation (GDPR):</strong> For users in the European Economic Area, we act as a data processor and/or controller as appropriate, and honor all GDPR data subject rights.</li>
                            <li><strong>Information Technology Act, 2000 (India):</strong> We comply with the provisions of the IT Act and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</li>
                            <li><strong>Digital Personal Data Protection Act, 2023 (India):</strong> Where applicable, we adhere to the requirements of the DPDP Act for processing of digital personal data.</li>
                        </ul>
                    </Section>

                    <Section title="12. Changes to this Policy">
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Material changes will be communicated through our website or via email. The "Last updated" date at the top of this page indicates the most recent revision.
                        </p>
                    </Section>

                    <Section title="13. Contact Us">
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                        <div style={{
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '12px',
                            padding: 'var(--space-3)',
                            marginTop: 'var(--space-2)',
                        }}>
                            <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>Goschedule.ai - Data Protection</p>
                            <p>Email: <a href="mailto:hello@goschedule.ai" style={{ color: 'var(--accent-text)', textDecoration: 'underline' }}>hello@goschedule.ai</a></p>
                            <p>Website: <a href="https://goschedule.ai" style={{ color: '#A5B4FC', textDecoration: 'underline' }}>goschedule.ai</a></p>
                        </div>
                    </Section>

                </div>
            </div>
        </main>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--card-radius)',
            padding: 'var(--space-4)',
        }}>
            <h2 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-2)',
                letterSpacing: '-0.01em',
            }}>{title}</h2>
            <div className="legal-content">
                {children}
            </div>
        </section>
    )
}
