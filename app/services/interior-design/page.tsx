import type { Metadata } from "next";
import InteriorDesignPageClient from "./page-client";
import { getDesigns } from "@/lib/api/designs";
import { toInteriorDesign, type InteriorDesign } from "@/lib/designs";

const siteUrl = "https://ahspdl.com";

export const metadata: Metadata = {
  title: "Interior Design Service | AHS Properties & Development Ltd.",
  description:
    "Bespoke interior design services from AHS Properties — space planning, furniture & decor, 3D rendering, and lighting design for residential and commercial spaces in Dhaka, Bangladesh.",
  openGraph: {
    title: "Interior Design Studio — AHS Properties & Development Ltd.",
    description:
      "Full-service interior design for AHS homeowners and beyond. From concept to completion, our in-house studio creates interiors that feel as good as the address looks.",
    url: `${siteUrl}/services/interior-design`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AHS Properties Interior Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design Studio — AHS Properties & Development Ltd.",
    description:
      "Full-service interior design for AHS homeowners and beyond. Space planning, furniture, 3D rendering, and lighting design.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/services/interior-design`,
  },
};

export default async function InteriorDesignPage() {
  let designs: InteriorDesign[] = [];
  try {
    const rawDesigns = await getDesigns();
    designs = rawDesigns.map(toInteriorDesign);
  } catch {
    designs = [];
  }

  return <InteriorDesignPageClient designs={designs} />;
}
