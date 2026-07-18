/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectsRouteClient from "./page-client";

export const metadata: Metadata = {
  title: "Our Developments | AHS Properties & Development Ltd.",
  description:
    "Explore AHS Properties' exclusive developments in Jolshiri Abashon and Dhaka. Browse apartments, townhouses, and premium residential projects.",
  openGraph: {
    title: "Our Developments — AHS Properties & Development Ltd.",
    description:
      "Browse premium residential developments by AHS Properties in Jolshiri Abashon and Dhaka. Find your dream apartment or townhouse today.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AHS Properties & Development Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Developments — AHS Properties & Development Ltd.",
    description:
      "Browse premium residential developments by AHS Properties in Jolshiri Abashon and Dhaka.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://ahspdl.com/projects",
  },
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <ProjectsRouteClient />
    </Suspense>
  );
}
