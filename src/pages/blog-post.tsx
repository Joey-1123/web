import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  usePageMeta(post ? post.title : "Not Found", post ? post.summary : "Post not found.");

  if (!post) {
    return (
      <div className="noise min-h-screen bg-background text-foreground">
        <main className="mx-auto max-w-5xl px-6 md:px-10 pt-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to notes
          </Link>
          <p className="mt-20 text-sm text-foreground/40">Post not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="noise min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-6 md:px-10">
        <nav className="pt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to notes
          </Link>
        </nav>

        <article className="py-20">
          <span className="font-mono text-xs text-foreground/20">{post.date}</span>
          <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.06] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/25"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-foreground/50">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
