/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import BlogSection from "@/components/sections/BlogSection";
import HomeContent from "./home-content";

export default function HomePage() {
  return <HomeContent blogSection={<BlogSection />} />;
}
