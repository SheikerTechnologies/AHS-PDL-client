/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug } from "@/lib/api/projects";
import { getAllProjectSlugs } from "@/lib/slugs";
import ProjectDetailClient from "./page-client";

const siteUrl = "https://ahspdl.com";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  const locationStr = [project.location.area, project.location.city].filter(Boolean).join(', ') || project.location.address;
  const percentAvailable = project.overview.totalUnits > 0
    ? Math.round((project.overview.availableUnits / project.overview.totalUnits) * 100)
    : 0;
  const isOngoing = project.status?.toLowerCase() === 'ongoing';

  const title = `${project.title} | AHS Properties & Development Ltd.`;
  const description = `${project.title} — Apartment in ${locationStr}. ${isOngoing ? 'Currently under development.' : 'Completed project.'} ${percentAvailable}% units available.`;

  return {
    title,
    description,
    openGraph: {
      title: `${project.title} — AHS Properties`,
      description,
      type: "website",
      images: [
        {
          url: project.coverImage.startsWith("http") ? project.coverImage : `${siteUrl}${project.coverImage}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      url: `${siteUrl}/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — AHS Properties`,
      description,
      images: [project.coverImage.startsWith("http") ? project.coverImage : `${siteUrl}${project.coverImage}`],
    },
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const images = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.coverImage];

  const locationStr = [project.location.area, project.location.city].filter(Boolean).join(', ') || project.location.address;
  const percentAvailable = project.overview.totalUnits > 0
    ? Math.round((project.overview.availableUnits / project.overview.totalUnits) * 100)
    : 0;
  const isOngoing = project.status?.toLowerCase() === 'ongoing';

  // JSON-LD schemas
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing" as const,
    name: project.title,
    description: project.shortDescription || project.description,
    url: `${siteUrl}/projects/${slug}`,
    image: project.coverImage.startsWith("http") ? project.coverImage : `${siteUrl}${project.coverImage}`,
    offers: {
      "@type": "Offer",
      availability: percentAvailable > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      price: "Contact for pricing",
      priceCurrency: "BDT",
    },
    location: {
      "@type": "Place",
      name: locationStr,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location.area,
        addressCountry: "BD",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Status",
        value: isOngoing ? "Ongoing" : "Completed",
      },
      {
        "@type": "PropertyValue",
        name: "Available Units",
        value: project.overview.availableUnits,
      },
      {
        "@type": "PropertyValue",
        name: "Total Units",
        value: project.overview.totalUnits,
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectDetailClient project={project} images={images} />
    </>
  );
}
