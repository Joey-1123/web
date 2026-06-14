import {
  Bot,
  Mail,
  Orbit,
  Send,
  Server,
  Workflow,
} from "lucide-react";

import { MinimalistHero } from "@/components/ui/minimalist-hero";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { ContactForm } from "@/components/contact-form";
import { QaSection } from "@/components/qa-section";
import { GithubIcon } from "@/components/ui/github-icon";
import { EMAIL, GITHUB_URL, TELEGRAM_URL } from "@/lib/constants";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "STACK", href: "#stack" },
  { label: "CONNECT", href: "#connect" },
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
  },
  {
    name: "Learnalytics",
    status: "Active",
    description:
      "Django plus AI backend for learning analytics, structured APIs, and intelligent workflow support.",
  },
  {
    name: "Clover Game Hub",
    status: "Building",
    description:
      "Android game-space app with future ROM integration and polished system-aware UX.",
  },
  {
    name: "Django API Systems",
    status: "Active",
    description:
      "REST APIs with validation, authentication, and production-minded backend patterns.",
  },
  {
    name: "AI Automation Toolkit",
    status: "Active",
    description:
      "Developer productivity scripts designed to cut repetitive workflow effort.",
  },
];

const stack = [
  "Python",
  "Django + DRF",
  "C++",
  "Java",
  "Linux",
  "Docker",
  "Android Studio",
  "Neovim",
  "Supabase",
  "CUDA (learning)",
];

const timelineData = [
  {
    id: 1,
    title: "Backend Foundation",
    date: "2023",
    content:
      "Started building Django REST APIs with cleaner validation, auth, and production-minded backend structure.",
    category: "Backend",
    icon: Server,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 96,
  },
  {
    id: 2,
    title: "AI Workflows",
    date: "2024",
    content:
      "Moved into AI-assisted workflows and automation patterns that save developer time on real projects.",
    category: "AI",
    icon: Bot,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "ROM Engineering",
    date: "2024",
    content:
      "Deepened Android ROM work with performance tuning, debugging, and smoother systems thinking.",
    category: "Systems",
    icon: Workflow,
    relatedIds: [1, 5],
    status: "in-progress" as const,
    energy: 79,
  },
  {
    id: 4,
    title: "Learnalytics",
    date: "Now",
    content:
      "Building a learning analytics platform with Django, AI ideas, and scalable backend architecture.",
    category: "Project",
    icon: Orbit,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 84,
  },
  {
    id: 5,
    title: "Impact Engine",
    date: "Next",
    content:
      "Exploring dependency mapping, code impact tracking, and smarter tooling for backend teams.",
    category: "Roadmap",
    icon: GithubIcon,
    relatedIds: [3, 4],
    status: "pending" as const,
    energy: 61,
  },
];

const baseUrl = import.meta.env.BASE_URL;
const heroImageSrc = `${baseUrl}assets/images/about/me-1.webp`;
const heroImageFallbackSrc = `${baseUrl}assets/images/about/me-1.jpg`;

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MinimalistHero
        logoText="JOEY"
        navLinks={navLinks}
        mainText="AI systems and backend engineer building automation-first products, scalable APIs, and performance-focused developer workflows."
        readMoreLink="#about"
        imageSrc={heroImageSrc}
        imageFallbackSrc={heroImageFallbackSrc}
        imageAlt="Portrait of Shubham Panchal"
        overlayText={{
          part1: "AI X",
          part2: "Backend",
        }}
        socialLinks={socialLinks}
        locationText="Pune / Mumbai, India"
        accentClassName="bg-[#f2c300]"
      />

      <main className="mx-auto flex max-w-7xl flex-col gap-24 px-6 pb-24 md:px-10">
        <section
          id="about"
          className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              About
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Building intelligent systems where automation meets performance.
            </h2>
            <p className="max-w-3xl text-base leading-8 text-foreground/75">
              I specialize in backend APIs, AI workflow integration, Android
              systems, and Linux-first developer tooling. My work blends system
              thinking with practical shipping so products stay scalable,
              observable, and genuinely useful.
            </p>
            <p className="max-w-3xl text-base leading-8 text-foreground/75">
              Current direction: intelligent backend modules, automation-first
              workflows, and platform-aware engineering that reduces friction
              for real developers and real users.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-cyan-400/20 bg-cyan-400/10 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                Mission
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/80">
                <li>Build intelligent systems powered by AI.</li>
                <li>Engineer scalable backend architectures.</li>
                <li>Optimize Android systems and developer workflows.</li>
              </ul>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-foreground/55">
                Focus
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground/80">
                Backend APIs, AI systems, automation tooling, Android
                optimization, and Linux-driven productivity.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Projects In Motion
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Active systems and experiments.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200">
                    {project.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-foreground/75">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="timeline" className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Timeline Orbit
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              A live map of the work I am building through.
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-foreground/75">
              This radial view tracks how my backend, AI, Android, and product
              milestones connect. Click a node to inspect the stage, energy,
              and related work.
            </p>
          </div>

          <RadialOrbitalTimeline timelineData={timelineData} />
        </section>

        <section
          id="stack"
          className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-cyan-500/[0.05] p-8 md:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Tech Arsenal
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Backend, AI, systems, and deployment.
            </h2>
            <p className="text-sm leading-7 text-foreground/75">
              My stack is shaped around shipping useful systems: APIs that hold
              up, automations that save time, and performance-aware tooling that
              keeps development moving.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stack.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm tracking-[0.2em] text-foreground/85"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section
          id="connect"
          className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:grid-cols-3"
        >
          <div className="space-y-4 md:col-span-2">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Connect
            </p>
            <h2 className="text-3xl font-bold md:text-5xl">
              Open to backend, AI, and systems work.
            </h2>
            <p className="text-sm leading-7 text-foreground/75">
              If you are building automation-heavy tools, backend systems, or
              performance-sensitive products, I&apos;d love to connect.
            </p>
          </div>

          <div className="grid gap-4">
            <ContactForm />
            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <GithubIcon className="h-5 w-5 text-cyan-200" />
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <Send className="h-5 w-5 text-cyan-200" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-2xl border border-white/10 bg-black/20 p-5"
              >
                <Mail className="h-5 w-5 text-cyan-200" />
              </a>
            </div>
          </div>
        </section>

        <QaSection />

        <section className="grid gap-4 border-t border-white/10 pt-8 text-sm text-foreground/55 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Bot className="mb-3 h-5 w-5 text-cyan-200" />
            AI workflows integrated into practical engineering loops.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Workflow className="mb-3 h-5 w-5 text-cyan-200" />
            Automation-first design that reduces repetition and scales systems.
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <Server className="mb-3 h-5 w-5 text-cyan-200" />
            Backend systems shaped by performance, observability, and structure.
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
