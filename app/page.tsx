/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import BlogSection from "@/components/sections/BlogSection";
import HomeContent from "./home-content";
import { getProjects } from "@/lib/api/projects";

export default async function HomePage() {
  const projects = await getProjects();
  return <HomeContent projects={projects} blogSection={<BlogSection />} />;
}
