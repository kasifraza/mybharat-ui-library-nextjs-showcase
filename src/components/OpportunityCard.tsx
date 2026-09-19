"use client";

import Link from "next/link";
import { Badge, Button, Tooltip } from "mybharat-react-library";
import type { Opportunity } from "@/lib/data";
import { STATUS_META, formatDate } from "@/lib/data";
import { Calendar, Location, Profile2User } from "./Icons";
import { CATEGORY_ICONS } from "./Icons";

export default function OpportunityCard({ item }: { item: Opportunity }) {
  const meta = STATUS_META[item.status];
  const CategoryIcon = CATEGORY_ICONS[item.category] ?? Calendar;

  return (
    <article className="surface card-hover group flex flex-col rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="brand-bg-soft brand-text flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <CategoryIcon size={20} />
        </span>
        <Badge variant={meta.badgeVariant}>{meta.label}</Badge>
      </div>

      <h3 className="mt-3 text-base leading-snug font-semibold">
        <Link
          href={`/opportunities/${item.id}`}
          className="decoration-[color:var(--brand)] underline-offset-2 group-hover:underline"
        >
          {item.title}
        </Link>
      </h3>
      <p className="text-muted mt-0.5 text-xs font-medium">
        {item.organisation}
      </p>

      <div className="text-muted mt-3 grid gap-1.5 text-xs tabular-nums">
        <span className="flex items-center gap-1.5">
          <Location size={14} /> {item.city}, {item.state}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={14} /> Starts {formatDate(item.startDate)} ·{" "}
          {item.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Profile2User size={14} /> {item.seatsLeft} seats left
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t pt-4">
        <Link href={`/opportunities/${item.id}`} className="flex-1">
          <Button
            variant="primary"
            styleType="outline"
            size="s"
            className="w-full"
          >
            View Details
          </Button>
        </Link>
        <Tooltip content="Opens the official application form" placement="top">
          <Link href={`/register?opportunity=${item.id}`}>
            <Button variant="primary" styleType="filled" size="s">
              Apply
            </Button>
          </Link>
        </Tooltip>
      </div>
    </article>
  );
}
