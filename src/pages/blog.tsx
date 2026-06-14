import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function BlogPage() {
  usePageMeta("Notes", "Writing on backend engineering, AI systems, automation, and systems programming.");
  return (
    <div className="noise min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-5xl px-6 md:px-10">
        <nav className="pt-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Portfolio
          </Link>
        </nav>

        <section className="py-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            Writing
          </span>
          <h2 className="mt-6 mb-14 text-3xl font-bold md:text-4xl">
            Notes
          </h2>

          <div className="space-y-0">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block border-t border-white/[0.06] py-8 transition-colors hover:bg-white/[0.02]"
              >
                <span className="font-mono text-xs text-foreground/20">
                  {post.date}
                </span>
                <h3 className="mt-1 text-lg font-semibold group-hover:text-warm transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/40">
                  {post.summary}
                </p>
                <div className="mt-4 flex gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
