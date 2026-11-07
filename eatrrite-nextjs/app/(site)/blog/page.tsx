import type { Metadata } from "next";
import { Blog } from "@/components/home/blog";
import { PageBanner } from "@/components/site/page-banner";

export const metadata: Metadata = {
  title: "Blog | Eat Rrite",
  description: "Nutrition research, healthy eating habits and holistic wellness tips from Eat Rrite.",
};

export default function BlogPage() {
  return (
    <>
      <PageBanner title="Blog" />
      <Blog />
    </>
  );
}
