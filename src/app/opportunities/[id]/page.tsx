import type { Metadata } from "next";
import { OPPORTUNITIES } from "@/lib/data";
import OpportunityDetail from "@/components/OpportunityDetail";

export const dynamicParams = false;

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = OPPORTUNITIES.find((o) => o.id === id);
  return {
    title: item ? `${item.title} — My Bharat Volunteer Portal` : "Mission not found",
    description: item?.description,
  };
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OpportunityDetail id={id} />;
}
