"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  Badge,
  Breadcrumbs,
  Button,
  Dropdown,
  Input,
  Tabs,
  Toggle,
  Tooltip,
  toast,
} from "mybharat-react-library";
import { OPPORTUNITIES, formatDate } from "@/lib/data";
import { Award, Magicpen, Profile2User, TickCircle } from "@/components/Icons";

type TabKey = "overview" | "applications" | "settings";

const ACHIEVEMENTS = [
  {
    key: "hours",
    title: "Volunteering Hours — 142 logged",
    body: "You have contributed 142 verified hours across 6 missions in the last 12 months. That puts you in the top 8% of volunteers in your state.",
  },
  {
    key: "badges",
    title: "Earned Badges — Eco Warrior, Digital Ambassador",
    body: "Badges are issued by nodal ministries after verified mission completion. They appear on your shareable volunteer card.",
  },
  {
    key: "streak",
    title: "Monthly Streak — 9 months",
    body: "You have completed at least one mission every month since January. Keep the streak going to unlock the Swayam Sevi honour.",
  },
];

const APPLICATION_STATUS = [
  { id: "clean-yamuna-drive", status: "Approved", variant: "success" as const },
  { id: "digital-literacy-mission", status: "Under Review", variant: "info" as const },
  { id: "blood-donation-yuva", status: "Approved", variant: "success" as const },
  { id: "fit-india-youth-games", status: "Waitlisted", variant: "warning" as const },
];

export default function ProfilePage() {
  const [tab, setTab] = useState<TabKey>("overview");
  const [language, setLanguage] = useState<string | number | null>("English");
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);
    toast.success({
      title: "Settings saved",
      description: `Language preference set to ${String(language)}. Updates will follow this preference.`,
    });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "My Profile", active: true },
        ]}
        className="mb-5"
      />

      {/* Profile header */}
      <section className="surface flex flex-wrap items-center gap-5 rounded-3xl p-6">
        <span className="brand-bg-soft brand-text flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold">
          AS
        </span>
        <div className="min-w-fit flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              Ananya Sharma
            </h1>
            <Badge variant="success">
              <span className="flex items-center gap-1">
                <TickCircle size={11} /> Verified
              </span>
            </Badge>
            <Tooltip content="Top 8% volunteers in Delhi" placement="top">
              <span>
                <Badge variant="warning">
                  <span className="flex items-center gap-1">
                    <Magicpen size={11} /> Gold Volunteer
                  </span>
                </Badge>
              </span>
            </Tooltip>
          </div>
          <p className="text-muted mt-1 text-sm">
            Volunteer ID MYB-2026-4821 · New Delhi, Delhi · Member since Mar
            2025
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center tabular-nums sm:gap-6">
          {[
              { label: "Hours", value: "142", icon: Award },
              { label: "Missions", value: "6", icon: TickCircle },
              { label: "Badges", value: "4", icon: Profile2User },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <Icon size={16} className="brand-text mx-auto" />
              <p className="mt-1 text-lg font-bold">{value}</p>
              <p className="text-muted text-[11px] font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <div className="mt-6">
        <Tabs
          activeKey={tab}
          onSelect={(k) => setTab(k as TabKey)}
          tabs={[
            { key: "overview", label: "Overview" },
            { key: "applications", label: "My Applications" },
            { key: "settings", label: "Settings" },
          ]}
        />
      </div>

      {tab === "overview" && (
        <div className="mt-5 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="surface rounded-2xl p-4">
              <h2 className="px-2 pt-2 text-base font-bold tracking-tight">
                Your Impact Journey
              </h2>
              <Accordion defaultActiveKey={["hours"]} alwaysOpen>
                {ACHIEVEMENTS.map((a) => (
                  <Accordion.Item key={a.key} eventKey={a.key}>
                    <Accordion.Header>{a.title}</Accordion.Header>
                    <Accordion.Body>
                      <p className="text-muted text-sm leading-relaxed">
                        {a.body}
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="surface rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-base font-bold tracking-tight">
              Recommended for you
            </h2>
            <p className="text-muted mt-1 text-xs">
              Based on your interests in Environment &amp; Health.
            </p>
            <ul className="mt-4 space-y-3">
              {OPPORTUNITIES.slice(3, 6).map((o) => (
                <li key={o.id} className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/opportunities/${o.id}`}
                      className="text-sm font-semibold hover:underline"
                    >
                      {o.title}
                    </Link>
                    <p className="text-muted text-xs">
                      {o.city} · {formatDate(o.startDate)}
                    </p>
                  </div>
                  <Link href={`/opportunities/${o.id}`}>
                    <Button variant="primary" styleType="text" size="s">
                      View
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "applications" && (
        <div className="surface mt-5 overflow-hidden rounded-2xl">
          <table className="w-full text-left text-sm tabular-nums">
            <thead className="surface-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Mission</th>
                <th className="hidden px-5 py-3 font-semibold sm:table-cell">
                  Start Date
                </th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {APPLICATION_STATUS.map(({ id, status, variant }) => {
                const o = OPPORTUNITIES.find((x) => x.id === id);
                if (!o) return null;
                return (
                  <tr
                    key={id}
                    className="border-t transition-colors hover:bg-[color:var(--surface-muted)]"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/opportunities/${id}`}
                        className="font-medium hover:underline"
                      >
                        {o.title}
                      </Link>
                      <p className="text-muted text-xs">{o.organisation}</p>
                    </td>
                    <td className="text-muted hidden px-5 py-3.5 sm:table-cell">
                      {formatDate(o.startDate)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={variant}>{status}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        variant="neutral"
                        styleType="text"
                        size="s"
                        onClick={() =>
                          toast.info({
                            title: `Withdrawn from ${o.title}`,
                            description:
                              "Your seat has been released for another volunteer.",
                          })
                        }
                      >
                        Withdraw
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "settings" && (
        <div className="surface mt-5 grid max-w-2xl gap-6 rounded-2xl p-6">
          <Input
            label="Display Name"
            value="Ananya Sharma"
            readOnly
            helperText="Contact the nodal officer to change your registered name."
          />
          <div>
            <p className="mb-2 text-sm font-medium">Preferred Language</p>
            <Dropdown
              options={[
                { value: "English", label: "English" },
                { value: "Hindi", label: "हिन्दी" },
                { value: "Tamil", label: "தமிழ்" },
                { value: "Bengali", label: "বাংলা" },
                { value: "Marathi", label: "मराठी" },
              ]}
              value={language ?? undefined}
              onChange={(v) => {
                const val = Array.isArray(v) ? v[0] : v;
                setLanguage(val ?? null);
              }}
              placeholder="Select language"
              multiple={false}
              showLeftIcon={false}
            />
          </div>
          <div className="space-y-3">
            <Toggle
              label="Email me about new missions"
              defaultChecked
            />
            <Toggle
              label="SMS reminders before duty shifts"
              defaultChecked
            />
            <Toggle label="Show my profile on public leaderboards" />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              styleType="filled"
              onClick={saveSettings}
              disabled={saved}
            >
              {saved ? "Saved" : "Save Changes"}
            </Button>
            <Button variant="neutral" styleType="text">
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
