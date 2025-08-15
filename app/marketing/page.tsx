"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  PlayCircle,
  Shield,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  Users,
  Layers,
  History,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function useStaggerOptions(delayBase = 0.06) {
  return useMemo(
    () => ({
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transitionBase: (i: number) => ({
        delay: i * delayBase,
        duration: 0.5,
        ease: "easeOut",
      }),
    }),
    [delayBase]
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-3 text-base">{subtitle}</p>
      )}
    </div>
  );
}

function StickyNav({ onOpenDemo }: { onOpenDemo: () => void }) {
  const lastY = useRef(0);
  const [isElevated, setElevated] = useState(false);
  const [active, setActive] = useState<string>("hero");
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || 0;
      setElevated(y > 10);
      lastY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [
      "hero",
      "how",
      "use-cases",
      "features",
      "pricing",
      "faq",
    ] as const;
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        {
          rootMargin: "-40% 0px -55% 0px",
          threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b ${
        isElevated ? "shadow-sm" : "shadow-none"
      }`}
    >
      <nav
        className={`mx-auto max-w-7xl px-4 flex items-center justify-between ${
          isElevated ? "py-2" : "py-3"
        }`}
      >
        <Link
          href="/marketing"
          aria-label="All-in-One home"
          className="font-semibold text-lg tracking-tight"
        >
          All-in-One
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a
            href="#how"
            className={`transition-colors ${
              active === "how" ? "text-primary" : "hover:text-primary"
            }`}
          >
            How it works
          </a>
          <a
            href="#use-cases"
            className={`transition-colors ${
              active === "use-cases" ? "text-primary" : "hover:text-primary"
            }`}
          >
            Use cases
          </a>
          <a
            href="#features"
            className={`transition-colors ${
              active === "features" ? "text-primary" : "hover:text-primary"
            }`}
          >
            Features
          </a>
          <a
            href="#pricing"
            className={`transition-colors ${
              active === "pricing" ? "text-primary" : "hover:text-primary"
            }`}
          >
            Pricing
          </a>
          <a
            href="#faq"
            className={`transition-colors ${
              active === "faq" ? "text-primary" : "hover:text-primary"
            }`}
          >
            FAQ
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-full active:scale-95"
            onClick={onOpenDemo}
          >
            <PlayCircle className="mr-1" /> Watch demo
          </Button>
          <Button asChild className="rounded-full active:scale-95">
            <Link href="/signup">Start free trial</Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}

function Hero({ onOpenDemo }: { onOpenDemo: () => void }) {
  const stagger = useStaggerOptions();
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            One chat. Every AI tool.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Design, research, legal, accounting, coding, and analytics—unified
            in a single conversational workspace that routes tasks to the best
            tool automatically.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="/signup">Start free trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={onOpenDemo}
            >
              <PlayCircle className="mr-1" /> Watch demo
            </Button>
          </motion.div>
        </div>

        {/* Chat mock with tool chips */}
        <div className="mt-14 mx-auto max-w-5xl">
          <Card className="group p-6 md:p-8 bg-card/80 backdrop-blur border-border/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm text-muted-foreground">
                Chat
              </CardTitle>
              <CardDescription className="text-xs">
                Ask anything. We’ll route it to the right tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-xl border bg-background/60 px-4 py-3 text-sm text-foreground/90">
                  Create a launch campaign brief, estimate ad budget, and draft
                  a landing page section.
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Design",
                    "Research",
                    "Legal",
                    "Finance",
                    "Code",
                    "Data Viz",
                  ].map((chip, i) => (
                    <motion.span
                      key={chip}
                      className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs bg-background/70 shadow-sm hover:-translate-y-0.5 hover:shadow transition group-hover:animate-pulse"
                      initial={stagger.initial}
                      whileInView={stagger.whileInView}
                      viewport={stagger.viewport}
                      transition={stagger.transitionBase(i)}
                    >
                      <Sparkles className="size-3" /> {chip}
                    </motion.span>
                  ))}
                </div>
                <div className="rounded-xl border bg-background/40 p-4">
                  <div className="text-sm">
                    Output: Combined brief, budget estimate, and hero copy ready
                    to ship.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const items = [
    { title: "Ask", body: "Type your task in plain language." },
    {
      title: "We route intelligently",
      body: "AI detects intent and picks the right tool.",
    },
    { title: "Get results", body: "Output appears in the chat." },
    { title: "Track & iterate", body: "History keeps everything reusable." },
  ];
  const stagger = useStaggerOptions();
  return (
    <section id="how" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title="How it works" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={stagger.initial}
              whileInView={stagger.whileInView}
              viewport={stagger.viewport}
              transition={stagger.transitionBase(i)}
            >
              <Card className="h-full hover:-translate-y-1 hover:shadow-md transition">
                <CardHeader>
                  <CardTitle className="text-lg">{it.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{it.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Layers, title: "Unified conversational interface" },
    { icon: Sparkles, title: "Automatic tool orchestration" },
    { icon: Users, title: "Comprehensive integrations" },
    { icon: Check, title: "Subscription simplicity" },
    { icon: History, title: "Task history & status" },
    { icon: BarChart3, title: "Analytics dashboard" },
  ];
  const stagger = useStaggerOptions();
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title="From idea to done—without switching tools" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={stagger.initial}
              whileInView={stagger.whileInView}
              viewport={stagger.viewport}
              transition={stagger.transitionBase(i)}
            >
              <Card className="h-full group hover:-translate-y-1 hover:shadow-md transition">
                <CardHeader>
                  <it.icon className="size-6 text-primary transition-transform group-hover:rotate-6" />
                  <CardTitle className="mt-3 text-lg">{it.title}</CardTitle>
                  <CardDescription>
                    Built-in so you can ship faster.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Flow = { title: string; steps: string[] };
const FLOWS: Flow[] = [
  {
    title: "Freelancer: Campaign in a day",
    steps: ["Brief", "Design concepts", "Budget", "Landing copy", "Delivery"],
  },
  {
    title: "Café owner: Streamlined ops",
    steps: [
      "Menu update",
      "Supplier emails",
      "Schedule",
      "Inventory",
      "Weekly report",
    ],
  },
  {
    title: "Startup founder: Pitch + model",
    steps: ["Narrative", "Deck", "Funnel", "Financial model", "Outreach"],
  },
  {
    title: "Nonprofit: Gala + grants",
    steps: [
      "Program",
      "Sponsorship",
      "Invites",
      "Grant draft",
      "Impact report",
    ],
  },
  {
    title: "Student entrepreneur: From design to expenses",
    steps: ["Logo", "Brand kit", "Store setup", "Ads", "Expenses"],
  },
];

function UseCases({ onReplay }: { onReplay: (flow: Flow) => void }) {
  const stagger = useStaggerOptions(0.05);
  return (
    <section id="use-cases" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          title="Use cases"
          subtitle="See how different roles move from idea to outcome."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FLOWS.map((flow, i) => (
            <motion.div
              key={flow.title}
              initial={stagger.initial}
              whileInView={stagger.whileInView}
              viewport={stagger.viewport}
              transition={stagger.transitionBase(i)}
            >
              <Card className="h-full group hover:-translate-y-1 hover:shadow-md transition">
                <CardHeader>
                  <CardTitle className="text-lg">{flow.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {flow.steps.slice(0, 3).join(" → ")}…
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {flow.steps.map((s) => (
                      <Badge
                        key={s}
                        variant="outline"
                        className="bg-background/60"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className="rounded-full active:scale-95"
                    variant="secondary"
                    onClick={() => onReplay(flow)}
                  >
                    Replay flow
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [pulseActive, setPulseActive] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPulseActive(false), 2000);
    return () => clearTimeout(t);
  }, []);
  const plans = [
    {
      name: "Individual",
      monthly: 50,
      users: "1 user",
      features: ["Unlimited access", "Basic analytics"],
      popular: false,
    },
    {
      name: "Business",
      monthly: 200,
      users: "Up to 10 users",
      features: ["Shared history", "Team analytics"],
      popular: true,
    },
    {
      name: "Enterprise",
      monthly: null as number | null,
      users: "Unlimited users",
      features: ["SSO", "Priority support", "Advanced security"],
      popular: false,
    },
  ];
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title="One subscription. Unlimited possibilities." />
        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
          <span
            className={!isYearly ? "font-semibold" : "text-muted-foreground"}
          >
            Monthly
          </span>
          <button
            aria-pressed={isYearly}
            onClick={() => setIsYearly((v) => !v)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-input transition"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-primary transition ${
                isYearly ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={isYearly ? "font-semibold" : "text-muted-foreground"}
          >
            Yearly
          </span>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const price = p.monthly
              ? isYearly
                ? Math.round(p.monthly * 12 * 0.9)
                : p.monthly
              : null;
            return (
              <Card
                key={p.name}
                className={`relative h-full hover:-translate-y-1 hover:shadow-md transition border ${
                  p.popular ? "border-primary" : "border-border"
                }`}
              >
                {p.popular && pulseActive && (
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-primary/50 animate-pulse" />
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{p.name}</span>
                    {p.popular && <Badge>Most popular</Badge>}
                  </CardTitle>
                  <CardDescription>{p.users}</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="text-4xl font-bold">
                    {price !== null ? `$${price}` : "Custom"}
                    {price !== null && (
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}
                        / {isYearly ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="size-4 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-6 w-full rounded-full active:scale-95"
                  >
                    <Link href="/signup">Start free trial</Link>
                  </Button>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="outline">No hidden fees</Badge>
                    <Badge variant="outline">30-day money-back guarantee</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    {
      icon: Lock,
      title: "Encryption",
      body: "Data encrypted in transit and at rest.",
    },
    {
      icon: Shield,
      title: "Privacy-first",
      body: "Your data is never sold or shared.",
    },
    {
      icon: Users,
      title: "Secure authentication",
      body: "SSO and role-based access.",
    },
    {
      icon: History,
      title: "Audit logging",
      body: "Detailed logs for peace of mind.",
    },
  ];
  return (
    <section id="security" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader title="Your work, protected by modern security practices." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <Card key={it.title} className="h-full">
              <CardHeader>
                <it.icon className="size-6 text-primary" />
                <CardTitle className="mt-3 text-lg">{it.title}</CardTitle>
                <CardDescription>{it.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    [
      "What is All-in-One?",
      "A unified conversational interface that orchestrates AI tools for you.",
    ],
    [
      "How does routing work?",
      "We detect intent and route to the best tool automatically.",
    ],
    [
      "Can I invite my team?",
      "Yes, Business and Enterprise include collaboration features.",
    ],
    [
      "Do you support SSO?",
      "Enterprise includes SSO and advanced security controls.",
    ],
    [
      "Is there a free trial?",
      "Yes, start a free trial anytime from the signup page.",
    ],
    [
      "What integrations are available?",
      "Popular design, research, coding, legal, finance, and analytics tools.",
    ],
    [
      "Can I cancel anytime?",
      "Yes, subscriptions are flexible with no hidden fees.",
    ],
    [
      "Where is my data stored?",
      "In secure regions with encryption and strict privacy controls.",
    ],
  ] as const;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeader
          title="FAQ"
          subtitle="Short, helpful answers to common questions."
        />
        <div className="mt-8 max-w-3xl mx-auto divide-y divide-border rounded-xl border">
          {qs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <button
                key={q}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left px-5 py-4 focus-visible:ring-2 focus-visible:ring-ring/50 outline-none"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">{q}</span>
                  <ChevronDown
                    className={`size-5 transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden text-sm text-muted-foreground mt-2">
                    {a}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1500);
      return () => clearTimeout(t);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All-in-One
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/status" className="hover:text-primary">
              Status
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Social link"
                className="size-8 grid place-items-center rounded-full border hover:scale-110 transition"
              >
                A
              </a>
              <a
                href="#"
                aria-label="Social link"
                className="size-8 grid place-items-center rounded-full border hover:scale-110 transition"
              >
                B
              </a>
              <a
                href="#"
                aria-label="Social link"
                className="size-8 grid place-items-center rounded-full border hover:scale-110 transition"
              >
                C
              </a>
            </div>
            <Button
              asChild
              className={`rounded-full ${pulse ? "animate-pulse" : ""}`}
            >
              <Link href="/signup">Start free trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-20 max-w-3xl rounded-xl border bg-background shadow-xl">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h3 className="font-semibold">{title}</h3>
          <Button variant="ghost" onClick={onClose} aria-label="Close">
            Close
          </Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [replayOpen, setReplayOpen] = useState<null | Flow>(null);

  return (
    <div className="min-h-screen">
      <StickyNav onOpenDemo={() => setDemoOpen(true)} />
      <Hero onOpenDemo={() => setDemoOpen(true)} />
      <HowItWorks />
      <Features />
      <UseCases onReplay={(f) => setReplayOpen(f)} />
      <Pricing />
      <Security />
      <FAQ />
      <Footer />

      <Modal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        title="Product demo"
      >
        <div className="aspect-video w-full rounded-lg bg-black/40 grid place-items-center text-muted-foreground">
          Video placeholder
        </div>
      </Modal>
      <Modal
        open={!!replayOpen}
        onClose={() => setReplayOpen(null)}
        title={replayOpen?.title ?? "Replay flow"}
      >
        {replayOpen && (
          <ReplayFlow
            steps={replayOpen.steps}
            onDone={() => setReplayOpen(null)}
          />
        )}
      </Modal>
    </div>
  );
}

function ReplayFlow({
  steps,
  onDone,
}: {
  steps: string[];
  onDone: () => void;
}) {
  const [index, setIndex] = useState(0);
  const canPrev = index > 0;
  const canNext = index < steps.length - 1;
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i <= index ? "bg-primary" : "bg-input"
            }`}
          />
        ))}
      </div>
      <div className="relative h-28 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <div className="font-medium text-lg">{steps[index]}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Preview of this step…
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          className="active:scale-95"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={!canPrev}
        >
          Back
        </Button>
        {canNext ? (
          <Button
            className="active:scale-95"
            onClick={() => setIndex((i) => Math.min(steps.length - 1, i + 1))}
          >
            Next
          </Button>
        ) : (
          <Button className="active:scale-95" onClick={onDone}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
