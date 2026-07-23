import type { Metadata } from "next";
import { getLayouts } from "@/lib/api/layouts";
import type { Layout } from "@/lib/layouts";
import JolshiriLayoutPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Jolshiri Abashon — Master Layout Plan | AHS Properties & Development Ltd.",
  description:
    "Explore the RAJUK-approved Master Layout Plan for Jolshiri Abashon. View detailed sector-wise maps for all 19 sectors including residential, commercial, and recreational zones.",
  openGraph: {
    title: "Jolshiri Abashon Master Layout Plan — AHS Properties & Development Ltd.",
    description:
      "RAJUK-approved master plan with detailed sector maps. Explore premium residential plots, lake views, and modern community areas in Jolshiri Abashon.",
  },
  alternates: {
    canonical: "https://ahspdl.com/layout",
  },
};

export default async function JolshiriLayoutPage() {
  let layouts: Layout[] = [];
  try {
    layouts = await getLayouts();
  } catch {}
  return <JolshiriLayoutPageClient layouts={layouts} />;
}