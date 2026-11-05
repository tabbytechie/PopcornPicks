import {
  LegalPage,
  LegalBullets,
  LegalSubheading,
  type LegalSection,
} from "@/shared/components/LegalPage";

const LAST_UPDATED = "November 5, 2026";

const sections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          PopcornPicks ("we", "us", or "our") operates the PopcornPicks website and movie
          discovery platform (the "Service"). This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our Service, create an account,
          or interact with our features. It applies to all visitors, users, and members of the
          Service.
        </p>
        <p>
          By accessing or using the Service, you acknowledge that you have read and understood this
          Privacy Policy and you consent to the practices described here. If you do not agree with
          the terms of this policy, please discontinue use of the Service immediately.
        </p>
        <p>
          This policy supplements our{" "}
          <a href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/cookie-policy" className="text-primary hover:underline">
            Cookie Policy
          </a>
          , and together they govern your use of PopcornPicks.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          We collect several types of information to provide and improve the Service. The categories
          below describe what we gather, how we gather it, and why.
        </p>

        <LegalSubheading>Information you provide to us</LegalSubheading>
        <LegalBullets
          items={[
            "Account details — your email address and a password when you register.",
            "Profile information — display name or preferences you choose to add.",
            "Content you submit — ratings, reviews, watchlist entries, and favorites.",
            "Communications — messages you send to support, feedback, or survey responses.",
          ]}
        />

        <LegalSubheading>Information collected automatically</LegalSubheading>
        <LegalBullets
          items={[
            "Log data — device type, browser version, pages viewed, time spent, and referring URLs.",
            "IP address — used for security, abuse prevention, and approximate region detection.",
            "Usage signals — which features, genres, and titles you interact with.",
            "Cookie data — as described in detail in our Cookie Policy.",
          ]}
        />

        <LegalSubheading>Information from third parties</LegalSubheading>
        <LegalBullets
          items={[
            "Movie metadata — titles, posters, backdrops, ratings, and cast data provided by TMDB.",
            "Authentication providers — if you sign in through a supported provider, we receive basic profile data with your consent.",
          ]}
        />
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    content: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <LegalBullets
          items={[
            "To operate, maintain, and deliver the core features of the Service.",
            "To generate personalized movie recommendations based on your activity.",
            "To manage your account and provide customer support.",
            "To monitor usage and diagnose technical issues, bugs, and outages.",
            "To detect, prevent, and address fraud, abuse, and security incidents.",
            "To send important service notices, updates, and (with consent) marketing communications.",
            "To analyze aggregate trends so we can improve and expand the platform.",
          ]}
        />
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal bases for processing (GDPR)",
    content: (
      <>
        <p>
          If you are located in the European Economic Area (EEA) or United Kingdom (UK), we rely on
          the following legal bases to process your personal data:
        </p>
        <LegalBullets
          items={[
            <span key="c"><strong>Contract:</strong> processing necessary to provide the Service you requested.</span>,
            <span key="l"><strong>Legitimate interests:</strong> operating and securing the platform and preventing abuse.</span>,
            <span key="con"><strong>Consent:</strong> non-essential cookies, analytics, and marketing where required.</span>,
            <span key="law"><strong>Legal obligations:</strong> compliance with applicable law, tax, and regulatory requirements.</span>,
          ]}
        />
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share your information",
    content: (
      <>
        <p>
          We do not sell your personal data. We may share information only in the limited
          circumstances described below:
        </p>
        <LegalBullets
          items={[
            "Service providers — trusted partners who process data on our behalf under contract (hosting, analytics, email delivery).",
            "Data sources — attribution and requests related to third-party content providers such as TMDB.",
            "Legal & safety — when required by law, court order, or to protect our rights, users, or the public.",
            "Business transfers — in connection with a merger, acquisition, or asset sale, with notice where appropriate.",
            "With your consent — for any other purpose disclosed to you at the time of consent.",
          ]}
        />
        <p>
          Where we share data, we use contractual and technical safeguards to ensure it is handled
          only for the intended purposes.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International data transfers",
    content: (
      <p>
        Your information may be transferred to, and processed in, countries other than your own,
        which may have different data protection laws. Where we transfer data from the EEA or UK to
        other jurisdictions, we rely on appropriate safeguards such as Standard Contractual Clauses
        and adequacy decisions approved by the relevant authority.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "Data retention",
    content: (
      <>
        <p>
          We retain personal data only for as long as necessary to fulfil the purposes described in
          this policy, taking into account legal, accounting, and reporting requirements.
        </p>
        <LegalBullets
          items={[
            "Account and profile data — retained while your account is active.",
            "Ratings, reviews, and watchlist — retained to power recommendations until you delete them.",
            "Log and usage data — typically aggregated or deleted on a rolling basis.",
            "After closure — we delete or anonymize your data unless retention is legally required.",
          ]}
        />
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect your data",
    content: (
      <>
        <p>
          We apply industry-standard technical and organizational measures designed to protect your
          information, including:
        </p>
        <LegalBullets
          items={[
            "Encryption of data in transit (TLS) and at rest.",
            "Principle-of-least-privilege access controls for staff and systems.",
            "Password credentials protected using salted, one-way hashing.",
            "Continuous monitoring, logging, and regular security reviews.",
          ]}
        />
        <p>
          No method of transmission or storage is completely secure. If a breach affects your
          personal data, we will notify you and the relevant authorities where required by law.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    content: (
      <>
        <p>Depending on your jurisdiction, you may have some or all of the following rights:</p>
        <LegalBullets
          items={[
            "Access the personal data we hold about you.",
            "Correct inaccurate or incomplete data.",
            "Delete your account and associated data (the \"right to be forgotten\").",
            "Export your data in a portable, machine-readable format.",
            "Object to or restrict certain processing of your data.",
            "Withdraw consent at any time where processing relies on consent.",
            "Lodge a complaint with your local data protection authority.",
          ]}
        />
        <p>
          To exercise any right, contact us using the details below. We may need to verify your
          identity before fulfilling a request, and we respond within the timeframes required by
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: "california",
    title: "Your California privacy rights",
    content: (
      <>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA/CPRA) provides
          additional rights. In the preceding 12 months we have collected identifiers (name, email,
          IP address), commercial information (ratings and watchlist activity), and internet usage
          data. We do not sell or share personal information for cross-context behavioral
          advertising, and we do not discriminate against you for exercising your rights.
        </p>
        <p>
          You may request disclosure, deletion, or opt-out of sale/sharing by contacting{" "}
          <a href="mailto:privacy@popcornpicks.com" className="text-primary hover:underline">
            privacy@popcornpicks.com
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    content: (
      <p>
        The Service is not directed to children under 13, and we do not knowingly collect personal
        data from children. If you believe a child has provided us with personal data, please contact
        us so we can delete it. Parents and guardians in regions with a higher age threshold should
        review applicable local law.
      </p>
    ),
  },
  {
    id: "automated",
    title: "Automated decision-making & recommendations",
    content: (
      <p>
        Our recommendation engine uses your ratings, watchlist, and viewing signals to surface
        titles you may enjoy. These suggestions are automated to improve discovery and do not
        produce legal or similarly significant effects on you. You can influence suggestions by
        updating your preferences, ratings, and watchlist at any time.
      </p>
    ),
  },
  {
    id: "do-not-track",
    title: "Do Not Track and analytics",
    content: (
      <p>
        Some browsers transmit a "Do Not Track" signal. Because no common industry standard exists
        for responding to DNT, our Service does not currently act on these signals. You can control
        analytics and non-essential cookies through the controls in our Cookie Policy.
      </p>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    content: (
      <p>
        The Service may contain links to third-party websites and services (for example, external
        trailer hosts). We are not responsible for their privacy practices. We encourage you to read
        the privacy policy of every third-party site you visit.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. When we make material changes, we will
        revise the "Last updated" date above, and, where appropriate, notify you by email or through
        the Service. Your continued use after changes take effect constitutes acceptance of the
        revised policy.
      </p>
    ),
  },
];

const PrivacyPolicyPage = () => (
  <LegalPage
    eyebrow="Legal"
    title="Privacy Policy"
    subtitle="How PopcornPicks collects, uses, shares, and protects your personal information — and the choices and rights you have."
    lastUpdated={LAST_UPDATED}
    intro={
      <p>
        Your privacy matters to us. This policy is written to be as clear as possible so you
        understand exactly what data we handle and why. It covers account holders and visitors
        alike.
      </p>
    }
    sections={sections}
    footer={
      <>
        <h2 className="mb-2 text-xl font-bold text-foreground">Contact & data protection</h2>
        <p className="space-y-1">
          Questions, requests, or concerns about this policy or your data? Reach us at{" "}
          <a href="mailto:privacy@popcornpicks.com" className="text-primary hover:underline">
            privacy@popcornpicks.com
          </a>
          , or contact our Data Protection Officer at{" "}
          <a href="mailto:dpo@popcornpicks.com" className="text-primary hover:underline">
            dpo@popcornpicks.com
          </a>
          . Movie data is provided by{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            TMDB
          </a>
          .
        </p>
      </>
    }
  />
);

export default PrivacyPolicyPage;
