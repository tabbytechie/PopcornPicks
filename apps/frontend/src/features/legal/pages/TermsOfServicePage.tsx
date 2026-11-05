import {
  LegalPage,
  LegalBullets,
  LegalSubheading,
  type LegalSection,
} from "@/shared/components/LegalPage";

const LAST_UPDATED = "November 5, 2026";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    content: (
      <>
        <p>
          These Terms of Service ("Terms") form a legally binding agreement between you and
          PopcornPicks ("we", "us", "our") governing your access to and use of the PopcornPicks
          website and movie discovery platform (the "Service"). By creating an account or otherwise
          using the Service, you agree to be bound by these Terms and by our Privacy Policy and
          Cookie Policy.
        </p>
        <p>
          If you do not agree to all of these Terms, you must not access or use the Service. When
          you use any separate third-party feature, additional terms may apply and will be
          disclosed where relevant.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <>
        <p>
          You must be at least 13 years old to use the Service, and at least the age of legal
          majority in your jurisdiction to form a binding contract. If you are under the age of
          majority, you may use the Service only with the permission and supervision of a parent or
          guardian.
        </p>
        <p>
          By using the Service you represent and warrant that you meet these requirements and that
          your use does not violate any applicable law or regulation.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Accounts and registration",
    content: (
      <>
        <p>To access personalized features you may create an account. You agree to:</p>
        <LegalBullets
          items={[
            "Provide accurate, current, and complete information during registration.",
            "Maintain and promptly update your account information.",
            "Keep your credentials confidential and never share your password.",
            "Accept responsibility for all activity that occurs under your account.",
            "Notify us immediately of any unauthorized use or security breach.",
          ]}
        />
        <p>
          We may suspend or terminate an account that we reasonably believe has violated these Terms
          or poses a security risk. You are responsible for safeguarding your own device and
          account access.
        </p>
      </>
    ),
  },
  {
    id: "license",
    title: "License and access",
    content: (
      <p>
        Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
        non-transferable, revocable license to access and use the Service for your personal,
        non-commercial purposes. This license does not include any right to resell, commercially
        exploit, reverse engineer, or extract the source code or underlying data of the Service.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You agree to use the Service only for lawful purposes. You must not, directly or indirectly:</p>
        <LegalBullets
          items={[
            <span key="a">
              <strong>Violate the law:</strong> use the Service to break any applicable local,
              national, or international law or regulation.
            </span>,
            <span key="b">
              <strong>Interfere with the Service:</strong> disrupt, disable, overburden, or impair
              the Service or its underlying infrastructure.
            </span>,
            <span key="c">
              <strong>Access without authorization:</strong> attempt to gain unauthorized access to
              accounts, systems, or networks.
            </span>,
            <span key="d">
              <strong>Scrape data:</strong> scrape, harvest, or bulk-download data using automated
              tools without our written permission.
            </span>,
            <span key="e">
              <strong>Abuse or harass:</strong> post content that is unlawful, harmful, threatening,
              hateful, harassing, or deceptive.
            </span>,
            <span key="f">
              <strong>Impersonate:</strong> impersonate any person or entity, or falsely state your
              affiliation with PopcornPicks.
            </span>,
          ]}
        />
      </>
    ),
  },
  {
    id: "user-content",
    title: "Your content — ratings and reviews",
    content: (
      <>
        <p>
          The Service lets you submit ratings, reviews, and other content you create ("Your
          Content"). You retain all right, title, and interest in Your Content. By submitting it,
          you grant PopcornPicks a worldwide, non-exclusive, royalty-free license to host, display,
          reproduce, and distribute Your Content in connection with operating and improving the
          Service.
        </p>
        <p>You represent and warrant that:</p>
        <LegalBullets
          items={[
            "You own or have the rights to any content you submit.",
            "Your Content does not infringe any third-party rights.",
            "Your Content complies with these Terms and applicable law.",
          ]}
        />
        <p>
          You may delete Your Content at any time. Deleting content removes it from public view,
          though cached or aggregated copies may persist briefly.
        </p>
      </>
    ),
  },
  {
    id: "recommendations",
    title: "Recommendations and no guarantee",
    content: (
      <p>
        Recommendations, ratings, and movie information are provided for general informational
        purposes only. We do not guarantee the accuracy, completeness, or availability of any title
        or metadata. Content availability depends on licensing and region, and you should verify
        details with the relevant provider before relying on them.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The Service — including its design, text, graphics, logos, interface, and software — is
          owned by PopcornPicks or its licensors and is protected by copyright, trademark, and other
          laws. Nothing in these Terms transfers any intellectual property rights to you.
        </p>
        <p>
          Movie metadata, posters, and backdrops are provided by third parties. PopcornPicks uses
          and displays this content under applicable licenses and permissions.{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            The Movie Database (TMDB)
          </a>{" "}
          data is used under the TMDB terms and this Service does not imply endorsement by TMDB.
        </p>
      </>
    ),
  },
  {
    id: "feedback",
    title: "Feedback and suggestions",
    content: (
      <p>
        If you choose to send us feedback, ideas, or suggestions about the Service, we may use them
        without restriction and without obligation or compensation to you. Such submissions are
        treated as non-confidential.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services and content",
    content: (
      <p>
        The Service may integrate or link to third-party sites, features, and content (for example,
        external trailer hosts). Your use of those third parties is governed by their own terms and
        privacy policies. We are not responsible for, and do not endorse, any third-party content,
        products, or services.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    content: (
      <>
        <p>
          You may stop using the Service and delete your account at any time. We may suspend or
          terminate your access, in whole or in part, with or without notice, if we reasonably
          believe you have violated these Terms, misused the Service, or where necessary to protect
          our legal rights, security, or users.
        </p>
        <p>
          Provisions that by their nature should survive termination — including intellectual
          property, disclaimers, and limitations of liability — remain in effect.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        The Service is provided on an "as is" and "as available" basis without warranties of any
        kind, whether express, implied, statutory, or otherwise. To the maximum extent permitted by
        law, we disclaim all implied warranties, including implied warranties of merchantability,
        fitness for a particular purpose, title, and non-infringement. We do not warrant that the
        Service will be uninterrupted, error-free, or free of harmful components.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the maximum extent permitted by law, PopcornPicks and its officers, directors, employees,
        and agents will not be liable for any indirect, incidental, special, consequential, punitive,
        or exemplary damages — including loss of profits, data, goodwill, or other intangible
        losses — arising out of or relating to your use of, or inability to use, the Service, even if
        we have been advised of the possibility of such damages. Our total aggregate liability for
        any claim arising out of the Service is limited to the greater of one hundred US dollars
        (US$100) or the amount you paid us in the preceding twelve months.
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <p>
        You agree to defend, indemnify, and hold harmless PopcornPicks and its affiliates, officers,
        directors, employees, and agents from and against any claims, liabilities, damages, losses,
        and expenses (including reasonable legal fees) arising out of your use of the Service, your
        violation of these Terms, your infringement of any third-party right, or any content you
        submit.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <p>
        These Terms are governed by and construed in accordance with the laws of the State of
        California, United States, without regard to its conflict-of-law principles, unless
        applicable consumer-protection law in your country of residence requires otherwise.
      </p>
    ),
  },
  {
    id: "dispute-resolution",
    title: "Dispute resolution and arbitration",
    content: (
      <>
        <LegalSubheading>Informal resolution</LegalSubheading>
        <p>
          Most disputes can be resolved informally. Before filing a claim, you agree to contact us
          at{" "}
          <a href="mailto:legal@popcornpicks.com" className="text-primary hover:underline">
            legal@popcornpicks.com
          </a>{" "}
          and attempt in good faith to resolve the issue for at least 30 days.
        </p>
        <LegalSubheading>Binding arbitration</LegalSubheading>
        <p>
          If a dispute is not resolved informally, except where you or we elect to pursue a claim in
          a small claims court, the dispute will be resolved by final and binding arbitration. You
          and we agree that any arbitration will take place on an individual basis and{" "}
          <strong>you agree to waive the right to participate in a class action or any other legal
          proceeding on a class or representative basis</strong>. Nothing in these Terms affects
          your right to bring a claim in a small claims court where permitted, or any non-waivable
          statutory rights.
        </p>
      </>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to these terms",
    content: (
      <p>
        We may modify these Terms from time to time. When we make material changes, we will update
        the "Last updated" date and, where appropriate, provide at least 30 days' notice by email or
        an in-Service notice. Your continued use of the Service after the changes take effect
        constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "severability",
    title: "Severability and waiver",
    content: (
      <p>
        If any provision of these Terms is held to be invalid, illegal, or unenforceable, that
        provision will be modified to the minimum extent necessary to make it enforceable, or
        severed, and the remaining provisions will continue in full force and effect. Our failure to
        enforce any right or provision is not a waiver of that right or provision.
      </p>
    ),
  },
  {
    id: "notices",
    title: "Notices",
    content: (
      <p>
        We may provide notices to you by email, through the Service, or on a relevant page. Notices
        to us should be sent to the contact email below. These Terms constitute the entire agreement
        between you and PopcornPicks regarding the Service and supersede any prior agreements.
      </p>
    ),
  },
];

const TermsOfServicePage = () => (
  <LegalPage
    eyebrow="Legal"
    title="Terms of Service"
    subtitle="The rules that govern your use of PopcornPicks. Please read them carefully before using the Service."
    lastUpdated={LAST_UPDATED}
    effectiveDate={LAST_UPDATED}
    version="3.0"
    intro={
      <p>
        These Terms apply to everyone who uses PopcornPicks. They explain what you can expect from
        us and what we require from you. Capitalized terms not defined here have the meanings given
        throughout the document.
      </p>
    }
    sections={sections}
    footer={
      <>
        <h2 className="mb-2 text-xl font-bold text-foreground">Questions about these terms?</h2>
        <p>
          Contact our team at{" "}
          <a href="mailto:legal@popcornpicks.com" className="text-primary hover:underline">
            legal@popcornpicks.com
          </a>
          . You can also review our{" "}
          <a href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/cookie-policy" className="text-primary hover:underline">
            Cookie Policy
          </a>
          .
        </p>
      </>
    }
  />
);

export default TermsOfServicePage;
