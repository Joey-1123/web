import { Mail, Send } from "lucide-react";

import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { ContactForm } from "@/components/contact-form";
import { QaSection } from "@/components/qa-section";
import { GithubIcon } from "@/components/ui/github-icon";
import { EMAIL, GITHUB_URL, TELEGRAM_URL } from "@/lib/constants";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#connect" },
];

const socialLinks = [
  { icon: GithubIcon, href: GITHUB_URL, label: "GitHub" },
  { icon: Send, href: TELEGRAM_URL, label: "Telegram" },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
];

const projects = [
  {
    name: "Impact Graphing Engine",
    status: "Active",
    description:
      "AST-based dependency tracker to detect code-change impact across services and repositories.",
    tags: ["Python", "AST", "Analysis"],
  },
  {
    name: "Learnalytics",
    status: "Active",
    description:
      "Django + AI backend for learning analytics, structured APIs, and intelligent workflow support.",
    tags: ["Django", "AI", "API"],
  },
  {
    name: "Clover Game Hub",
    status: "Building",
    description:
      "Android game-space app with future ROM integration and system-aware UX.",
    tags: ["Android", "Kotlin", "Systems"],
  },
  {
    name: "Django API Systems",
    status: "Active",
    description:
      "REST APIs with validation, authentication, and production-minded backend patterns.",
    tags: ["Django", "DRF", "REST"],
  },
  {
    name: "AI Automation Toolkit",
    status: "Active",
    description:
      "Developer productivity scripts designed to cut repetitive workflow effort.",
    tags: ["Python", "Automation", "CLI"],
  },
];

const stack = [
  { category: "Languages", items: ["Python", "C++", "Java", "Bash"] },
  { category: "Backend", items: ["Django", "DRF", "REST APIs", "Supabase"] },
  { category: "Systems", items: ["Linux", "Docker", "Android ROM", "CUDA"] },
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
        readMoreLink="#about"
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
        <section id="about" className="border-t border-white/[0.06] py-20">
          <div className="grid gap-16 md:grid-cols-[1fr_1fr]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                01 / About
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
                Building systems that
                <br />
                ship and scale.
              </h2>
            </div>
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
              <div className="flex gap-8 pt-4">
                <div>
                  <span className="font-mono text-2xl font-bold text-foreground">
                    5+
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

        {/* Projects */}
        <section id="projects" className="border-t border-white/[0.06] py-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            02 / Work
          </span>
          <h2 className="mt-6 mb-14 text-3xl font-bold md:text-4xl">
            Selected projects
          </h2>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <article
                key={project.name}
                className="group grid grid-cols-[1fr_auto] items-start gap-6 border-t border-white/[0.06] py-8 transition-colors hover:bg-white/[0.02]"
              >
                <div className="grid gap-3 md:grid-cols-[1.2fr_1fr] md:gap-8">
                  <div>
                    <span className="font-mono text-xs text-foreground/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/40">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${
                      project.status === "Active"
                        ? "text-warm"
                        : "text-foreground/30"
                    }`}
                  >
                    {project.status}
                  </span>
                  <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.06] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/25"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="border-t border-white/[0.06] py-20">
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

        {/* Connect */}
        <section id="connect" className="border-t border-white/[0.06] py-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
            04 / Contact
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
            <div className="flex flex-col gap-6">
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
