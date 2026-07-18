import type { Metadata } from "next";
import LandownersPageClient from "./page-client";

const siteUrl = "https://ahspdl.com";

export const metadata: Metadata = {
  title: "Landowner Partnership | AHS Properties & Development Ltd.",
  description:
    "Partner with AHS Properties to develop your land through a transparent, profitable joint venture. RAJUK approved projects with no upfront cost. Zero risk, maximum returns.",
  openGraph: {
    title: "Turn Your Land Into Lasting Value — Partner with AHS Properties",
    description:
      "Develop your land through a safe, transparent joint venture with AHS Properties. In-house architects, on-time handover, and maximum returns — with zero upfront cost.",
    url: `${siteUrl}/landowners`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AHS Properties & Development Ltd. — Landowner Partnership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landowner Partnership | AHS Properties & Development Ltd.",
    description:
      "Develop your land through a safe, transparent joint venture with AHS Properties. Zero risk with full transparency.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/landowners`,
  },
};

export default function LandownersPage() {
  return <LandownersPageClient />;
}
