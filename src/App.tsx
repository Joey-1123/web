import { Mail, Send, FileText } from "lucide-react";

import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { ExperienceTimeline } from "@/components/ui/experience-timeline";
import { ContactForm } from "@/components/contact-form";
import { QaSection } from "@/components/qa-section";
import { GithubIcon } from "@/components/ui/github-icon";
import { EMAIL, GITHUB_URL, TELEGRAM_URL } from "@/lib/constants";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "/projects" },
  { label: "Stack", href: "#stack" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "#connect" },
];

const socialLinks = [
  { icon: GithubIcon, href: GITHUB_URL, label: "GitHub" },
  { icon: Send, href: TELEGRAM_URL, label: "Telegram" },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

const stack = [
  { category: "Languages", items: ["Python", "TypeScript", "C++", "Java", "Bash"] },
  { category: "Backend", items: ["Django", "DRF", "REST APIs", "Supabase"] },
  { category: "Systems", items: ["Linux", "Docker", "Android ROM", "CUDA (learning)"] },
  { category: "Tools", items: ["Neovim", "Git", "GitHub Actions", "Vite"] },
];

const baseUrl = import.meta.env.BASE_URL;
const heroImageSrc = `${baseUrl}assets/images/about/me-1.webp`;
const heroImageFallbackSrc = `${baseUrl}assets/images/about/me-1.jpg`;

function App() {
  return (
    <div className="noise min-h-screen bg-background text-foreground">
      <MinimalistHero
        logoText="joey"
        navLinks={navLinks}
        mainText="AI systems and backend engineer building automation-first products, scalable APIs, and performance-focused developer workflows."
        imageSrc={heroImageSrc}
        imageFallbackSrc={heroImageFallbackSrc}
        imageAlt="Portrait of Shubham Panchal"
        overlayText={{
          part1: "AI",
          part2: "Backend",
        }}
        socialLinks={socialLinks}
        locationText="Pune / Mumbai, India"
      />

      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {/* About */}
        <section id="about" className="border-t border-white/[0.06] py-20 scroll-mt-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            01 / About
          </span>
          <h2 className="mt-6 mb-14 text-3xl font-bold md:text-4xl">
            Building systems that ship and scale.
          </h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-5 text-[15px] leading-relaxed text-foreground/50">
              <p>
                I specialize in backend APIs, AI workflow integration, Android
                systems, and Linux-first developer tooling. My work blends system
                thinking with practical shipping.
              </p>
              <p>
                Current direction: intelligent backend modules, automation-first
                workflows, and platform-aware engineering that reduces friction
                for developers and users.
              </p>
            </div>
            <div className="space-y-5 text-[15px] leading-relaxed text-foreground/50">
              <p className="text-sm text-foreground/40">
                Open to backend, AI, and systems roles — whether it&apos;s
                architecting APIs, integrating intelligent agents, or building
                developer tooling that actually ships.
              </p>
              <div className="flex gap-8 pt-4">
                <div>
                  <span className="font-mono text-2xl font-bold text-foreground">
                    5
                  </span>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/30">
                    Projects
                  </p>
                </div>
                <div>
                  <span className="font-mono text-2xl font-bold text-foreground">
                    3+
                  </span>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/30">
                    Years
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ExperienceTimeline />

        {/* Stack */}
        <section id="stack" className="border-t border-white/[0.06] py-20 scroll-mt-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            03 / Stack
          </span>
          <h2 className="mt-6 mb-14 text-3xl font-bold md:text-4xl">
            Tech I work with
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm">
                  {group.category}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-foreground/50 transition-colors hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Spoken Languages */}
        <section id="languages" className="border-t border-white/[0.06] py-20 scroll-mt-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            04 / Languages
          </span>
          <h2 className="mt-6 mb-14 text-3xl font-bold md:text-4xl">
            Spoken languages
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-left font-mono text-[10px] uppercase tracking-[0.25em] text-warm">
                <th className="pb-3 font-normal">Language</th>
                <th className="pb-3 font-normal">Proficiency</th>
              </tr>
            </thead>
            <tbody className="text-foreground/50">
              {[
                ["Hindi", "Native"],
                ["Marathi", "Native"],
                ["English", "Fluent"],
                ["Japanese", "N5 (learning)"],
              ].map(([lang, level]) => (
                <tr
                  key={lang}
                  className="border-b border-white/[0.06] transition-colors hover:text-foreground"
                >
                  <td className="py-3">{lang}</td>
                  <td className="py-3">{level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Connect */}
        <section id="connect" className="border-t border-white/[0.06] py-20 scroll-mt-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            05 / Contact
          </span>
          <h2 className="mt-6 mb-4 text-3xl font-bold md:text-4xl">
            Let&apos;s build something
          </h2>
          <p className="mb-12 max-w-md text-sm text-foreground/40">
            Open to backend, AI, and systems work. If you&apos;re building
            automation-heavy tools or performance-sensitive products.
          </p>

          <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
            <ContactForm />
            <div className="flex flex-col justify-center gap-8">
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-warm">
                  Reach out
                </p>
                <p className="text-sm text-foreground/40">
                  Email or DM — I typically respond within a day.
                </p>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-3 text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-foreground/20 group-hover:text-warm" />
                  {EMAIL}
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-4 w-4 text-foreground/20 group-hover:text-warm" />
                  github.com/Joey-1123
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm text-foreground/50 transition-colors hover:text-foreground"
                >
                  <Send className="h-4 w-4 text-foreground/20 group-hover:text-warm" />
                  @JoeyOnRise
                </a>
              </div>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/30 transition-colors hover:text-warm"
              >
                <FileText className="h-3.5 w-3.5" />
                Download resume
              </a>
            </div>
          </div>
        </section>

        <QaSection />

        {/* Footer */}
        <footer className="border-t border-white/[0.06] py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/20">
              &copy; {new Date().getFullYear()} Shubham Panchal
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/20">
              Built with React + TypeScript
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
