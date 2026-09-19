"use client";

import Link from "next/link";
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Tooltip,
  toast,
} from "mybharat-react-library";
import OpportunityCard from "@/components/OpportunityCard";
import {
  ArrowRight2,
  Clock,
  Discover,
  Location,
  Magicpen,
  Profile2User,
  TickCircle,
  VolumeHigh,
} from "@/components/Icons";
import { OPPORTUNITIES } from "@/lib/data";

const STATS = [
  { label: "Active Volunteers", value: "1.4 Cr+", icon: Profile2User },
  { label: "Live Opportunities", value: "8,560", icon: Discover },
  { label: "States Covered", value: "36", icon: Location },
  { label: "Hours Contributed", value: "92 Lakh", icon: Clock },
];

const STEPS = [
  {
    key: "1",
    title: "Register with your details",
    body: "Create your My Bharat volunteer account using your mobile number and basic details. Verification takes less than a minute via OTP.",
  },
  {
    key: "2",
    title: "Pick your focus area",
    body: "Choose from environment, education, health, sports, culture and disaster relief missions run by central and state ministries.",
  },
  {
    key: "3",
    title: "Serve and get certified",
    body: "Complete tasks, log your hours, earn badges and government-recognised certificates that strengthen your resume and college applications.",
  },
];

export default function HomePage() {
  const featured = OPPORTUNITIES.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Announcement */}
      <Alert
        variant="info"
        title="Viksit Bharat Young Leaders Dialogue 2026"
        description="Applications are now open for the national youth summit in New Delhi. Selected volunteers get direct interaction with policy makers."
        closable
        className="mb-6"
        actions={[
          {
            label: "Know More",
            variant: "primary",
            onClick: () =>
              toast.info({
                title: "Opening programme details",
                description: "The brochure will be shared on your registered email.",
              }),
          },
        ]}
      />

      {/* Hero */}
      <section className="surface relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--accent-soft)] opacity-70 blur-3xl"
        />
        <div className="animate-rise relative max-w-2xl">
          <Badge variant="secondary">
            <span className="flex items-center gap-1">
              <Magicpen size={12} /> Mera Yuva Mera Bharat
            </span>
          </Badge>
          <h1 className="mt-4 text-3xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl">
            Serve the Nation.
            <span className="brand-text block">Skill Yourself.</span>
          </h1>
          <p className="text-muted mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
            Join India&apos;s largest youth volunteering movement. Discover
            government-run opportunities near you, contribute real hours on
            the ground, and earn recognised certificates and badges.
          </p>
          <div className="animate-rise-1 mt-6 flex flex-wrap items-center gap-3">
            <Link href="/opportunities">
              <Button variant="primary" styleType="filled" size="l">
                Explore Opportunities
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="neutral" styleType="outline" size="l">
                Become a Volunteer
              </Button>
            </Link>
            <Tooltip
              content="Over 1.4 crore young Indians are already volunteering"
              placement="top"
            >
              <span className="brand-text cursor-help border-b border-dotted border-current pb-0.5 text-xs font-semibold">
                Why join?
              </span>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="animate-rise-2 mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="surface card-hover rounded-2xl p-5">
            <span className="brand-bg-soft brand-text flex h-9 w-9 items-center justify-center rounded-lg">
              <Icon size={18} />
            </span>
            <p className="mt-3 text-2xl font-bold tracking-tight tabular-nums">
              {value}
            </p>
            <p className="text-muted text-xs font-medium">{label}</p>
          </div>
        ))}
      </section>

      {/* Featured opportunities */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Featured Missions
            </h2>
            <p className="text-muted mt-1 text-sm">
              Hand-picked opportunities with the biggest community impact.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="brand-text hidden items-center gap-1 text-sm font-semibold hover:underline sm:flex"
          >
            View all <ArrowRight2 size={16} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featured.map((item) => (
            <OpportunityCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-10 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            How It Works
          </h2>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            Three simple steps between you and your first mission. Every
            completed task is verified by the nodal officer and reflected on
            your profile.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Free for every Indian aged 15–29",
              "Certificates recognised by ministries",
              "Track hours, badges and impact",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="brand-bg-soft brand-text flex h-5 w-5 items-center justify-center rounded-full">
                  <TickCircle size={12} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface rounded-2xl p-2 lg:col-span-3">
          <Accordion defaultActiveKey="1">
            {STEPS.map((step) => (
              <Accordion.Item key={step.key} eventKey={step.key}>
                <Accordion.Header>
                  <span className="flex items-center gap-3">
                    <span className="brand-bg-soft brand-text flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                      {step.key}
                    </span>
                    {step.title}
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="text-muted text-sm leading-relaxed">
                    {step.body}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="brand-bg-soft mt-10 flex flex-col items-center gap-4 rounded-3xl px-6 py-10 text-center">
        <VolumeHigh size={28} className="brand-text" />
        <h2 className="text-xl font-bold sm:text-2xl">
          Ready to make your first impact?
        </h2>
        <p className="text-muted max-w-xl text-sm">
          Registration takes under two minutes. All you need is a mobile
          number and the will to serve.
        </p>
        <Link href="/register">
          <Button variant="primary" styleType="filled" size="l">
            Register as a Volunteer
          </Button>
        </Link>
      </section>
    </div>
  );
}
