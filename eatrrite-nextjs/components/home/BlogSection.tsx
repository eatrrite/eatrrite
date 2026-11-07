import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlurIn } from "@/components/motion/BlurIn";
import { FLOATING_FOOD } from "@/constants/home/floatingFood";
import home from "@/constants/home/content.json";
import { ROUTES } from "@/constants/routes";
import { HomeSection } from "./kit/HomeSection";
import { SectionIntro } from "./kit/SectionIntro";

// Blog posts as Deccan-style cards. Also used on the /blog page.
export function BlogSection() {
  const { blog } = home;
  return (
    <HomeSection id="blog" tone="mint" food={FLOATING_FOOD.blog}>
      <SectionIntro eyebrow={blog.pill} title={blog.title} lead={blog.lead} count={blog.posts.length} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blog.posts.map((post, index) => (
          <BlurIn key={post.title} delay={0.1 + index * 0.08} className="h-full">
            <Link href={ROUTES.blog} className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-4 left-4 rounded-md bg-white/90 px-2.5 py-1 font-heading text-sm font-bold text-primary tabular-nums">{post.date}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="m-0 font-heading text-lg leading-snug font-bold text-ink">{post.title}</h3>
                <p className="m-0 flex-1 text-sm leading-relaxed text-text">{post.text}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read More <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </BlurIn>
        ))}
      </div>
    </HomeSection>
  );
}
