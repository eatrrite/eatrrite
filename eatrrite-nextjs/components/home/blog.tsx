import Image from "next/image";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Reveal } from "@/components/motion/Reveal";
import { SplitTitle } from "@/components/motion/SplitTitle";
import { Icon } from "@/components/shared/Icon";
import { SectionPill } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import home from "@/constants/home/content.json";

// Copies .blog-section, .blog-heading and .blog-card from style.css and match.css.
export function Blog() {
  const { blog } = home;
  return (
    <section id="blog" className="er-section bg-white">
      <div className="er-container">
        <div className="relative mb-12 grid grid-cols-[1.1fr_0.9fr] items-end gap-10 after:absolute after:top-[30%] after:bottom-[10%] after:left-[48%] after:w-0.5 after:bg-primary after:opacity-25 er-md:grid-cols-1 er-md:after:hidden">
          <div>
            <SectionPill>{blog.pill}</SectionPill>
            <SplitTitle text={blog.title} className="type-section mb-0 max-w-[520px]" />
          </div>
          <Reveal preset="label" className="max-w-[420px] justify-self-end er-md:justify-self-start">
            <p className="m-0 pl-7 text-[17px] text-text er-md:pl-0">{blog.lead}</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-3 gap-6 er-md:grid-cols-2 er-sm:grid-cols-1">
          {blog.posts.map((post) => (
            <Reveal key={post.title} preset="card" className="group/blog h-full">
              <Card
                lift={false}
                className="block h-full overflow-hidden rounded-xl bg-mint p-4 shadow-none transition-[transform,translate,scale,rotate,box-shadow,border-color] duration-[350ms] ease-[ease] group-hover/blog:-translate-y-2 group-hover/blog:border-border-hover group-hover/blog:shadow-lift"
              >
                <div className="relative mb-4 overflow-hidden rounded-md">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={1400}
                    height={933}
                    sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 400px"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[ease] group-hover/blog:scale-106"
                  />
                  <span className="absolute top-4 left-4 grid h-11 min-w-11 place-items-center rounded-[10px] bg-primary px-2.5 text-base font-bold text-white">
                    {post.date}
                  </span>
                </div>
                <div className="px-2 pt-1 pb-2.5">
                  <h3 className="mb-3 text-[22px] leading-[1.3] text-primary">{post.title}</h3>
                  <p className="mb-4 text-[15px] text-text">{post.text}</p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2.5 font-semibold text-ink transition-colors duration-300 ease-[ease] group-hover/blog:text-primary"
                  >
                    Read More
                    <span className="grid size-[34px] place-items-center rounded-full bg-accent text-xs text-ink transition-[transform,translate,scale,rotate,background-color] duration-300 ease-[ease] group-hover/blog:translate-x-0.5 group-hover/blog:-translate-y-0.5 group-hover/blog:bg-accent-hover">
                      <Icon icon={faArrowRight} className="-rotate-45" />
                    </span>
                  </Link>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
