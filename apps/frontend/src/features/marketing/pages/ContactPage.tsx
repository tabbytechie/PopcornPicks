import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import {
  MarketingHero,
  SectionHeading,
} from "@/features/marketing/components/MarketingHero";
import { Reveal } from "@/shared/components/Reveal";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

const CHANNELS = [
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@popcornpicks.com"],
    note: "We reply within 24 hours.",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+1 (555) 123-4567"],
    note: "Mon–Fri, 9am–5pm PT.",
  },
  {
    icon: MapPin,
    title: "Office",
    lines: ["123 Cinema Avenue", "Los Angeles, CA 90001"],
    note: "",
  },
  {
    icon: Clock,
    title: "Support hours",
    lines: ["24/7 for watchlist & playback issues."],
    note: "",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Real submissions go to the backend /api/contact route. Never log PII.
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-background">
      <MarketingHero
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, feedback, or just want to talk about movies? We read every message."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-netflix-red/30 bg-netflix-red/10 text-netflix-red">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Send us a message</h2>
                  <p className="text-sm text-muted-foreground">
                    Tell us what's on your mind — a real human reads every note.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-border bg-background"
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-border bg-background"
                    required
                  />
                </div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="border-border bg-background"
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="min-h-36 border-border bg-background"
                  required
                />
                <Button type="submit" variant="primary-red" className="w-full">
                  Send message
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Reveal>

          {/* Channels */}
          <div className="space-y-4 lg:col-span-2">
            <SectionHeading eyebrow="Other ways" title="Reach us directly" />
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 70}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-netflix-red/40">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-netflix-red/30 bg-netflix-red/10 text-netflix-red">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{c.title}</h3>
                      {c.lines.map((line) => (
                        <p key={line} className="text-sm text-muted-foreground">
                          {line}
                        </p>
                      ))}
                      {c.note && <p className="mt-1 text-xs text-muted-foreground/80">{c.note}</p>}
                    </div>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={CHANNELS.length * 70}>
              <div className="flex items-start gap-4 rounded-2xl border border-netflix-red/30 bg-netflix-red/5 p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-netflix-red/30 bg-netflix-red/10 text-netflix-red">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Community</h3>
                  <p className="text-sm text-muted-foreground">
                    Looking for quick answers? Browse guides and ask fellow movie fans in our{" "}
                    <a href="/help-center" className="font-medium text-netflix-red hover:underline">
                      Help Center
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
