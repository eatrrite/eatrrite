import type { Metadata } from "next";
import { Blog } from "@/components/home/Blog";
import { PageBanner } from "@/components/layout/PageBanner";

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
