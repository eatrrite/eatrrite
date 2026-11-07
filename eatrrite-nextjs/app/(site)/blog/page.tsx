import type { Metadata } from "next";
import { BlogSection } from "@/components/home/BlogSection";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Blog | Eat Rrite",
  description: "Nutrition research, healthy eating habits and holistic wellness tips from Eat Rrite.",
};

export default function BlogPage() {
  return (
    <>
      <PageBanner title="Blog" />
      <BlogSection />
    </>
  );
}
