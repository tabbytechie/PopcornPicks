import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Switch } from "@/shared/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  LegalPage,
  LegalBullets,
  LegalSubheading,
  type LegalSection,
} from "@/shared/components/LegalPage";

const LAST_UPDATED = "November 5, 2026";
const STORAGE_KEY = "cookiePreferences";

type CookieKey = "essential" | "functional" | "analytics" | "advertising";

const COOKIE_TYPES: {
  id: CookieKey;
  title: string;
  description: string;
  required: boolean;
  examples: string[];
}[] = [
  {
    id: "essential",
    title: "Strictly necessary",
    description:
      "Required for the Service to work — sign-in, security, and your consent choices. Cannot be disabled.",
    required: true,
    examples: [
      "Authentication and login session integrity",
      "Security and fraud prevention",
      "Balancing traffic and load",
      "Storing your cookie preferences",
    ],
  },
  {
    id: "functional",
    title: "Functionality",
    description: "Remember your choices so the Service feels consistent between visits.",
    required: false,
    examples: [
      "Language, region, and theme preferences",
      "Recently viewed titles",
      "Personalized interface settings",
      "Saved recommendation preferences",
    ],
  },
  {
    id: "analytics",
    title: "Analytics & performance",
    description: "Help us understand how the Service is used so we can improve it.",
    required: false,
    examples: [
      "Page views and feature usage",
      "Error and crash monitoring",
      "A/B testing of improvements",
      "Aggregate performance metrics",
    ],
  },
  {
    id: "advertising",
    title: "Targeting & content suggestions",
    description: "Used to make on-platform content suggestions more relevant to you.",
    required: false,
    examples: [
      "Personalized movie suggestions",
      "Measuring the effectiveness of content",
      "Cross-device preference sync",
    ],
  },
];

const DEFAULT_PREFS: Record<CookieKey, boolean> = {
  essential: true,
  functional: true,
  analytics: true,
  advertising: false,
};

interface CookieRow {
  name: string;
  purpose: string;
  provider: string;
  category: string;
  expiry: string;
}

const COOKIE_INVENTORY: CookieRow[] = [
  {
    name: "pp_session",
    purpose: "Keeps you signed in and protects against cross-site request forgery.",
    provider: "PopcornPicks",
    category: "Strictly necessary",
    expiry: "Session",
  },
  {
    name: "pp_consent",
    purpose: "Remembers which cookie categories you accepted.",
    provider: "PopcornPicks",
    category: "Strictly necessary",
    expiry: "12 months",
  },
  {
    name: "pp_theme",
    purpose: "Stores your light/dark display preference.",
    provider: "PopcornPicks",
    category: "Functionality",
    expiry: "6 months",
  },
  {
    name: "pp_recent",
    purpose: "Powers 'continue watching' and recently viewed lists.",
    provider: "PopcornPicks",
    category: "Functionality",
    expiry: "30 days",
  },
  {
    name: "pp_analytics",
    purpose: "Collects anonymous usage statistics to improve the Service.",
    provider: "PopcornPicks",
    category: "Analytics",
    expiry: "13 months",
  },
  {
    name: "pp_suggest",
    purpose: "Makes on-platform content suggestions more relevant.",
    provider: "PopcornPicks",
    category: "Targeting",
    expiry: "6 months",
  },
];

const BROWSER_GUIDES = [
  { name: "Chrome", url: "https://support.google.com/accounts/answer/32050" },
  {
    name: "Firefox",
    url: "https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored",
  },
  {
    name: "Safari",
    url: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
  },
  { name: "Edge", url: "https://support.microsoft.com/kb/278835" },
];

const CookiePolicyPage = () => {
  const [prefs, setPrefs] = useState<Record<CookieKey, boolean>>(() => {
    if (typeof window === "undefined") return DEFAULT_PREFS;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : DEFAULT_PREFS;
    } catch {
      return DEFAULT_PREFS;
    }
  });
  const [saved, setSaved] = useState(false);

  const persist = (next: Record<CookieKey, boolean>) => {
    setPrefs(next);
    setSaved(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable (private mode) — preferences stay in-memory only */
    }
  };

  const toggle = (key: CookieKey) => {
    if (key === "essential") return;
    persist({ ...prefs, [key]: !prefs[key] });
  };

  const acceptAll = () =>
    persist({ essential: true, functional: true, analytics: true, advertising: true });

  const rejectNonEssential = () =>
    persist({ essential: true, functional: false, analytics: false, advertising: false });

  const sections: LegalSection[] = [
    {
      id: "what-are-cookies",
      title: "What are cookies?",
      content: (
        <>
          <p>
            Cookies are small text files placed on your device when you visit a website. They are
            widely used to make sites work, to remember preferences, and to understand how people
            use a platform. This policy describes the cookies PopcornPicks uses and how you can
            control them. It works alongside our Privacy Policy.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border border-border bg-card">
              <CardContent className="p-5">
                <h3 className="mb-1 font-semibold text-foreground">Session cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Temporary cookies that expire when you close your browser. They power core
                  functionality during a single visit.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-border bg-card">
              <CardContent className="p-5">
                <h3 className="mb-1 font-semibold text-foreground">Persistent cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Stored on your device for a set period so we can remember your preferences across
                  multiple visits.
                </p>
              </CardContent>
            </Card>
          </div>
          <p>
            We also use first-party cookies (set by us) and, where relevant, similar technologies
            such as local storage and pixels for the purposes described below.
          </p>
        </>
      ),
    },
    {
      id: "cookie-categories",
      title: "Categories of cookies we use",
      content: <p>See the interactive controls in the next section to manage each category.</p>,
    },
    {
      id: "your-preferences",
      title: "Manage your cookie preferences",
      content: (
        <>
          <p>
            Choose which categories of cookies you allow. Strictly necessary cookies must always be
            on for the Service to function. Your selection is saved on this device.
          </p>
          <div className="space-y-4">
            {COOKIE_TYPES.map((cookie) => (
              <Card key={cookie.id} className="border border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">{cookie.title}</h3>
                        {cookie.required && (
                          <span className="rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                            Always active
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{cookie.description}</p>
                      <ul className="mt-3 ml-5 list-disc text-sm text-muted-foreground">
                        {cookie.examples.map((ex) => (
                          <li key={ex}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                    <Switch
                      checked={prefs[cookie.id]}
                      onCheckedChange={() => toggle(cookie.id)}
                      disabled={cookie.required}
                      aria-label={`Toggle ${cookie.title}`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button variant="primary-red" onClick={acceptAll}>
                Accept all
              </Button>
              <Button variant="glass" onClick={rejectNonEssential}>
                Reject non-essential
              </Button>
              {saved && <span className="text-sm text-muted-foreground">Preferences saved.</span>}
            </div>
          </div>
        </>
      ),
    },
    {
      id: "cookie-inventory",
      title: "Cookie inventory",
      content: (
        <>
          <p>Representative examples of the cookies we set. Names and durations may change.</p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Name</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead className="whitespace-nowrap">Provider</TableHead>
                  <TableHead className="whitespace-nowrap">Category</TableHead>
                  <TableHead className="whitespace-nowrap">Expiry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COOKIE_INVENTORY.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="whitespace-nowrap font-mono text-xs">{row.name}</TableCell>
                    <TableCell className="text-sm">{row.purpose}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{row.provider}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{row.category}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">{row.expiry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ),
    },
    {
      id: "why-we-use",
      title: "Why we use cookies",
      content: (
        <LegalBullets
          items={[
            "To keep you signed in and protect your account.",
            "To remember preferences such as your theme and language.",
            "To understand which features are useful and where people get stuck.",
            "To make on-platform content suggestions more relevant.",
            "To keep the Service fast, secure, and reliable.",
          ]}
        />
      ),
    },
    {
      id: "managing-in-browser",
      title: "Controlling cookies in your browser",
      content: (
        <>
          <LegalSubheading>Browser settings</LegalSubheading>
          <p>
            Most browsers let you refuse or delete cookies through their settings. Note that
            blocking strictly necessary cookies may prevent parts of the Service from working:
          </p>
          <LegalBullets
            items={BROWSER_GUIDES.map((g) => (
              <a
                key={g.name}
                href={g.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {g.name} cookie settings
              </a>
            ))}
          />
          <LegalSubheading>Your advertising choices</LegalSubheading>
          <p>
            Turning off the targeting category above opts you out of personalized content
            suggestions on this device. You may also use industry opt-out pages where available in
            your region.
          </p>
        </>
      ),
    },
    {
      id: "do-not-track",
      title: "Do Not Track",
      content: (
        <p>
          Some browsers broadcast a "Do Not Track" signal. Because there is no unified standard for
          honoring it, our Service does not currently respond to DNT signals. You can still control
          optional cookies using the manager above.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to this policy",
      content: (
        <p>
          We may update this Cookie Policy as we add features or change providers. The "Last
          updated" date above reflects the current version. Material changes will be communicated
          through the Service, and we may ask you to review and re-confirm your preferences.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      subtitle="How PopcornPicks uses cookies and similar technologies — and how you can control them."
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          Cookies help us keep the Service working smoothly and tailor it to you. Below you can
          learn what we use, review an inventory, and choose exactly which categories are allowed on
          your device.
        </p>
      }
      sections={sections}
      footer={
        <>
          <h2 className="mb-2 text-xl font-bold text-foreground">Questions about cookies?</h2>
          <p>
            Contact us at{" "}
            <a href="mailto:privacy@popcornpicks.com" className="text-primary hover:underline">
              privacy@popcornpicks.com
            </a>
            , or read our{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            for the full picture of how we handle your data.
          </p>
        </>
      }
    />
  );
};

export default CookiePolicyPage;
