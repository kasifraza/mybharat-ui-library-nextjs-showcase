"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Breadcrumbs,
  Chip,
  Dropdown,
  Pagination,
  Search,
  toast,
} from "mybharat-react-library";
import OpportunityCard from "@/components/OpportunityCard";
import { CATEGORIES, OPPORTUNITIES, STATES } from "@/lib/data";
import { CATEGORY_ICONS } from "@/components/Icons";

const PAGE_SIZE = 6;

const SORTS = [
  { value: "seats", label: "Most seats left" },
  { value: "date", label: "Starting soonest" },
  { value: "title", label: "A to Z" },
];

export default function OpportunitiesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [stateFilter, setStateFilter] = useState<string | number | null>(null);
  const [sort, setSort] = useState<string | number | null>("date");
  const [page, setPage] = useState(1);

  const selectedSort =
    SORTS.find((s) => s.value === sort)?.value ?? "seats";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = OPPORTUNITIES.filter((o) => {
      const matchesQuery =
        !q ||
        o.title.toLowerCase().includes(q) ||
        o.organisation.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q);
      const matchesCategory =
        category.length === 0 || category.includes(o.category);
      const matchesState = !stateFilter || o.state === String(stateFilter);
      return matchesQuery && matchesCategory && matchesState;
    });
    list = [...list].sort((a, b) => {
      if (selectedSort === "date")
        return a.startDate.localeCompare(b.startDate);
      if (selectedSort === "title") return a.title.localeCompare(b.title);
      return b.seatsLeft - a.seatsLeft;
    });
    return list;
  }, [query, category, stateFilter, selectedSort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const toggleCategory = (c: string) => {
    setCategory((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
    setPage(1);
  };

  const clearAll = () => {
    setQuery("");
    setCategory([]);
    setStateFilter(null);
    setPage(1);
    toast.default({ title: "Filters cleared" });
  };

  const hasFilters = query !== "" || category.length > 0 || stateFilter;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Opportunities", active: true },
        ]}
        className="mb-5"
      />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Volunteer Opportunities
          </h1>
          <p className="text-muted mt-1 text-sm tabular-nums" aria-live="polite">
            {filtered.length} mission{filtered.length === 1 ? "" : "s"}{" "}
            accepting applications right now.
          </p>
        </div>
        <Search
          value={query}
          onChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          onSearch={(v) =>
            toast.info({
              title: `Searching “${v}”`,
              description: `${filtered.length} results match your query.`,
            })
          }
          placeholder="Search missions, organisations, cities…"
          showMic={false}
          className="w-full sm:w-80"
        />
      </div>

      {/* Quick category chips */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((c) => {
          const Icon = CATEGORY_ICONS[c];
          return (
            <Chip
              key={c}
              selected={category.includes(c)}
              onClick={() => toggleCategory(c)}
              leftIcon={<Icon size={14} />}
              className="cursor-pointer"
            >
              {c}
            </Chip>
          );
        })}
      </div>

      {/* Filter bar */}
      <div className="surface-muted mt-4 flex flex-wrap items-center gap-3 rounded-2xl p-3">
        <Dropdown
          options={STATES.map((s) => ({ value: s, label: s }))}
          value={stateFilter ?? undefined}
          onChange={(v) => {
            const val = Array.isArray(v) ? v[0] : v;
            setStateFilter(val ?? null);
            setPage(1);
          }}
          placeholder="All States"
          multiple={false}
          showLeftIcon={false}
          size="s"
          aria-label="Filter by state"
        />
        <Dropdown
          options={SORTS}
          value={sort ?? undefined}
          onChange={(v) => {
            const val = Array.isArray(v) ? v[0] : v;
            setSort(val ?? null);
            setPage(1);
          }}
          placeholder="Sort by"
          multiple={false}
          showLeftIcon={false}
          size="s"
          aria-label="Sort results"
        />
        {hasFilters && (
          <Chip
            variant="error"
            styleType="ghost"
            onClick={clearAll}
            className="cursor-pointer"
          >
            Clear all filters
          </Chip>
        )}
      </div>

      {filtered.length === 0 && (
        <Alert
          variant="warning"
          title="No missions found"
          description="Try a different keyword or clear your filters to see all opportunities."
          className="mt-6"
        />
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <OpportunityCard key={item.id} item={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            totalPages={totalPages}
            page={safePage}
            onChange={setPage}
            variant="primary"
            showPrevNext
          />
        </div>
      )}

      <p className="text-muted mt-6 text-center text-xs">
        Can&apos;t find the right mission?{" "}
        <Link href="/register" className="brand-text font-semibold underline">
          Register anyway
        </Link>{" "}
        — we&apos;ll notify you about new openings in your area.
      </p>
    </div>
  );
}
