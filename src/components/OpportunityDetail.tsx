"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Accordion,
  Badge,
  Breadcrumbs,
  Button,
  Tooltip,
  toast,
} from "mybharat-react-library";
import {
  OPPORTUNITIES,
  STATUS_META,
  formatDate,
} from "@/lib/data";
import {
  CATEGORY_ICONS,
  Calendar,
  Clock,
  Location,
  Profile2User,
  Share,
  TickCircle,
} from "@/components/Icons";

const FAQS = [
  {
    key: "eligibility",
    q: "Who can apply?",
    a: "Any Indian citizen aged 15–29 with a valid mobile number. Prior experience is not required — orientation is provided on day one of the mission.",
  },
  {
    key: "certificate",
    q: "Will I get a certificate?",
    a: "Yes. On successful completion, a digital certificate signed by the nodal ministry is issued to your My Bharat profile within 7 working days.",
  },
  {
    key: "expenses",
    q: "Are travel and meals covered?",
    a: "On-ground meals, safety gear and local conveyance during duty hours are covered by the organising body. Long-distance travel to the venue is self-arranged.",
  },
  {
    key: "hours",
    q: "Can I volunteer part-time?",
    a: "Most missions allow flexible shifts. Mention your availability in the application form and the coordinator will assign suitable slots.",
  },
];

export default function OpportunityDetail({ id }: { id: string }) {
  const item = OPPORTUNITIES.find((o) => o.id === id);
  if (!item) notFound();

  const meta = STATUS_META[item.status];
  const CategoryIcon = CATEGORY_ICONS[item.category];

  const share = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard?.writeText(url).catch(() => {});
    toast.success({
      title: "Link copied",
      description: "Share this mission with your friends and college group.",
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Opportunities", href: "/opportunities" },
          { label: item.title, active: true },
        ]}
        className="mb-6"
      />

      {/* Header card */}
      <section className="surface rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="brand-bg-soft brand-text flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
              <CategoryIcon size={26} />
            </span>
            <div>
              <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                {item.title}
              </h1>
              <p className="text-muted mt-1 text-sm font-medium">
                {item.organisation} · {item.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip content="Copy a shareable link" placement="left">
              <Button
                variant="neutral"
                styleType="outline"
                iconOnly
                icon={<Share size={16} />}
                onClick={share}
                aria-label="Share this mission"
              />
            </Tooltip>
            <Link href={`/register?opportunity=${item.id}`}>
              <Button variant="primary" styleType="filled">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="surface-muted mt-6 grid gap-4 rounded-2xl p-5 text-sm tabular-nums sm:grid-cols-4">
          {[
            {
              icon: Location,
              label: "Location",
              value: `${item.city}, ${item.state}`,
            },
            {
              icon: Calendar,
              label: "Starts on",
              value: formatDate(item.startDate),
            },
            { icon: Clock, label: "Duration", value: item.duration },
            {
              icon: Profile2User,
              label: "Seats left",
              value: `${item.seatsLeft} volunteers`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <span className="text-muted flex items-center gap-1.5 text-xs font-medium">
                <Icon size={14} /> {label}
              </span>
              <p className="mt-1 text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* About */}
        <section className="surface rounded-3xl p-6 lg:col-span-2">
          <h2 className="text-lg font-bold tracking-tight">About the Mission</h2>
          <p className="text-muted mt-3 text-sm leading-relaxed">
            {item.description}
          </p>

          <h3 className="mt-6 text-sm font-bold tracking-tight">
            What you&apos;ll do
          </h3>
          <ul className="mt-3 space-y-2">
            {item.responsibilities.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm">
                <span className="brand-bg-soft brand-text mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <TickCircle size={12} />
                </span>
                {r}
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-bold tracking-tight">
            Perks &amp; recognition
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.perks.map((p) => (
              <Badge key={p} variant="secondary">
                {p}
              </Badge>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="surface rounded-3xl p-4">
            <h2 className="px-2 pt-2 text-lg font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <Accordion defaultActiveKey="eligibility" className="mt-2">
              {FAQS.map((f) => (
                <Accordion.Item key={f.key} eventKey={f.key}>
                  <Accordion.Header>{f.q}</Accordion.Header>
                  <Accordion.Body>
                    <p className="text-muted text-sm leading-relaxed">{f.a}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>

          <div className="surface mt-4 rounded-3xl p-6 text-center tabular-nums">
            <p className="text-sm font-semibold">
              {item.seatsLeft} of {item.seatsLeft + 40} seats remaining
            </p>
            <p className="text-muted mt-1 text-xs">
              Applications close 3 days before the start date.
            </p>
            <Link href={`/register?opportunity=${item.id}`}>
              <Button
                variant="primary"
                styleType="filled"
                className="mt-4 w-full"
              >
                Apply for this Mission
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
