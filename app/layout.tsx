/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./providers";
import RootLayoutClient from "./root-layout-client";

const siteUrl = "https://ahspdl.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateDeveloper",
  name: "AHS Properties & Development Ltd.",
  url: siteUrl,
  logo: `${siteUrl}/assets/ahspdl1.png`,
  image: `${siteUrl}/opengraph-image.png`,
  description:
    "Premium real estate development company in Bangladesh specializing in residential plots, apartments, villas, and luxury properties in Jolshiri Abashon and Dhaka.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "W-20/2, 67/1, China Town, VIP Road, Naya Palton",
    addressLocality: "Dhaka",
    addressCountry: "BD",
    postalCode: "1000",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+880-1625-555700",
    contactType: "customer service",
    email: "ahspropertiesdevelopmentltd@gmail.com",
  },
  sameAs: [
    "https://facebook.com/ahsp",
    "https://instagram.com/ahsp",
  ],
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Md. Sohanur Rahman Sohan",
    jobTitle: "Chief Executive Officer",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Dhaka",
    },
    {
      "@type": "Country",
      name: "Bangladesh",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Real Estate Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Premium Residential Plots",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Luxury Villas & Apartments",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Investment Advisory",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AHS Properties & Development Ltd.",
  alternateName: "AHS PDL",
  url: siteUrl,
  description:
    "Premium real estate development company in Bangladesh. Find luxury villas, apartments, residential plots in Jolshiri Abashon and Dhaka.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/projects?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AHS Properties & Development Ltd. | Premium Real Estate in Bangladesh",
  description:
    "AHS Properties & Development Ltd. — Bangladesh's premier real estate developer offering luxury villas, apartments, residential plots, and investment opportunities in Jolshiri Abashon and Dhaka.",
  keywords: [
    "AHS Properties",
    "real estate Bangladesh",
    "Jolshiri Abashon",
    "Dhaka properties",
    "luxury villas",
    "apartments",
    "residential plots",
    "real estate development",
    "Bangladesh property",
    "investment",
    "RAJUK",
    "property developer Bangladesh",
  ],
  authors: [{ name: "AHS Properties & Development Ltd." }],
  creator: "AHS Properties & Development Ltd.",
  publisher: "AHS Properties & Development Ltd.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: "AHS Properties & Development Ltd. | Premium Real Estate in Bangladesh",
    description:
      "Bangladesh's premier real estate developer. Luxury villas, apartments, residential plots in Jolshiri Abashon and Dhaka. 1+ years of excellence.",
    type: "website",
    siteName: "AHS Properties & Development Ltd.",
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AHS Properties & Development Ltd. — Premium Real Estate",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "AHS Properties & Development Ltd. | Premium Real Estate in Bangladesh",
    description:
      "Bangladesh's premier real estate developer. Luxury villas, apartments, residential plots in Jolshiri Abashon and Dhaka.",
    images: ["/opengraph-image.png"],
  },
  category: "real estate",
  verification: {
    google: "rCFH_3QS1E94ZVw-vxkhdNQBbV-XjkuaSxHb5m39DhE", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0c0c0a" media="(prefers-color-scheme: dark)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* FOUC prevention — apply dark class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('ahsp-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className="h-full flex flex-col antialiased"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <AppProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
        </AppProvider>
      </body>
    </html>
  );
}