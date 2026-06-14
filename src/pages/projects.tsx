import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon } from "@/components/ui/github-icon";
import { usePageMeta } from "@/hooks/use-page-meta";

interface ProjectDetail {
  tech: string[];
  challenges: string[];
  highlights: string[];
  demo?: string;
}

interface Project {
  name: string;
  status: string;
  description: string;
  tags: string[];
  repo?: string;
  detail: ProjectDetail;
}

const projects: Project[] = [
  {
    name: "Impact Graphing Engine",
    status: "Completed",
    description:
      "AST-based dependency tracker to detect code-change impact across services and repositories.",
    tags: ["Python", "AST", "Analysis"],
    repo: "https://github.com/Joey-1123/impact_engine.git",
    detail: {
      tech: ["Python", "AST", "NetworkX", "GitPython"],
      challenges: [
        "Handling circular dependencies in AST graphs",
        "Minimizing false positives across large repos",
        "Keeping analysis fast enough for CI pipelines",
      ],
      highlights: [
        "Reduces manual impact analysis time by ~80%",
        "Integrates as a GitHub Action",
        "Handles monorepo structures",
      ],
    },
  },
  {
    name: "Learnalytics",
    status: "Completed",
    description:
      "Django + AI backend for learning analytics, structured APIs, and intelligent workflow support.",
    tags: ["Django", "AI", "API"],
    repo: "https://github.com/Joey-1123/Learnalytics.git",
    detail: {
      tech: ["Django", "DRF", "PostgreSQL", "Celery", "Redis"],
      challenges: [
        "Designing analytics schemas for sparse student data",
        "Optimizing slow aggregate queries",
        "Building a flexible recommendation engine",
      ],
      highlights: [
        "Serves 10k+ daily API requests",
        "Real-time analytics via WebSocket",
        "Role-based access across institutions",
      ],
    },
  },
  {
    name: "AquaLens AI",
    status: "Active",
    description:
      "AI-powered marine conservation platform that identifies marine species from images and audio, extracts text via OCR, and provides conservation-focused insights through a multilingual chat assistant.",
    tags: ["Python", "FastAPI", "AI", "Computer Vision"],
    repo: "https://github.com/Joey-1123/aqualens-ai.git",
    detail: {
      tech: ["FastAPI", "Groq LLM", "Whisper", "IUCN API", "Docker"],
      challenges: [
        "Multi-modal input handling (image, audio, text)",
        "Low-latency LLM inference under free-tier constraints",
        "Multi-language chat across 8 languages",
      ],
      highlights: [
        "3rd place — Sustainability Hackathon",
        "IUCN Red List API integration for conservation data",
        "Audio + OCR pipeline for species identification",
      ],
    },
  },
  {
    name: "AuraMesh AR",
    status: "Active",
    description:
      "Gesture-driven AR experience with Django REST backend, MediaPipe hand tracking, canvas-driven effects, and websocket event stream with sign language support.",
    tags: ["Python", "Django", "JavaScript", "AR"],
    repo: "https://github.com/Joey-1123/AuraMesh_AR.git",
    detail: {
      tech: ["Django", "Channels", "MediaPipe", "WebSocket", "Docker"],
      challenges: [
        "Real-time hand tracking with minimal latency",
        "Synchronizing gesture state across WebSocket clients",
        "Building a sign-language classification pipeline",
      ],
      highlights: [
        "Live sign-language transcription from webcam",
        "Canvas-based AR effects without WebGL",
        "Modular backend with event-driven architecture",
      ],
    },
  },
  {
    name: "AI Automation Toolkit",
    status: "Active",
    description:
      "Developer productivity scripts designed to cut repetitive workflow effort.",
    tags: ["Python", "Automation", "CLI"],
    detail: {
      tech: ["Python", "Click", "Shell", "GitHub API"],
      challenges: [
        "Designing composable CLI interfaces",
        "Cross-platform compatibility (Linux/macOS/WSL)",
        "Handling edge cases in git-based workflows",
      ],
      highlights: [
        "Automates repo setup, linting, and CI checks",
        "Plug-in architecture for custom scripts",
        "Reduces onboarding setup from hours to minutes",
      ],
    },
  },
];

export default function ProjectsPage() {
  const [selected, setSelected] = useState<Project | null>(null);
  usePageMeta("Work Log", "Projects and work log — backend APIs, AI systems, automation tooling.");

  return (
    <div className="noise min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Back link */}
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
            02 / Work
          </span>
          <h2 className="mt-6 mb-14 text-3xl font-bold md:text-4xl">
            Work log
          </h2>

          <div className="space-y-0">
            {projects.map((project, i) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setSelected(project)}
                className="group grid w-full grid-cols-[1fr_auto] items-start gap-6 border-t border-white/[0.06] py-8 text-left transition-colors hover:bg-white/[0.02]"
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
                <div className="flex flex-col items-end gap-3">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        project.status === "Active"
                          ? "bg-green-500 animate-pulse"
                          : project.status === "Completed"
                            ? "bg-green-500/30"
                            : "bg-foreground/30"
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest ${
                        project.status === "Active"
                          ? "text-warm"
                          : project.status === "Completed"
                            ? "text-green-500/70"
                            : "text-foreground/30"
                      }`}
                    >
                      {project.status}
                    </span>
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
                  {"repo" in project && project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/30 transition-colors hover:text-warm"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      Source
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[201] h-full w-full max-w-lg overflow-y-auto border-l border-white/[0.06] bg-surface p-8"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                  Details
                </span>
                <h3 className="mt-2 text-xl font-bold">{project.name}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-foreground/30 hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-sm leading-relaxed text-foreground/40">
                  {project.description}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/20">
                  Tech stack
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.detail.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[10px] tracking-wider text-foreground/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/20">
                  Challenges
                </span>
                <ul className="mt-3 space-y-2">
                  {project.detail.challenges.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm text-foreground/50"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-foreground/20" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/20">
                  Highlights
                </span>
                <ul className="mt-3 space-y-2">
                  {project.detail.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-foreground/50"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-warm" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-2">
                {"repo" in project && project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/30 transition-colors hover:text-warm"
                  >
                    <GithubIcon className="h-4 w-4" />
                    Source
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
