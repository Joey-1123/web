export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ast-dependency-tracking",
    title: "Why AST-based dependency tracking beats runtime checks",
    date: "2026-05",
    summary:
      "Runtime dependency checks catch issues late. An AST-based approach lets you trace impact before you run a single test — and it integrates into CI without slowing down dev loops.",
    tags: ["Python", "AST", "CI"],
    content:
      "Runtime dependency checks are reactive — they tell you something broke after you already ran the code. AST-based dependency tracking shifts left: it parses your source tree, maps import graphs, and predicts impact before a single test executes.\n\nThe approach works by building a directed graph of module dependencies from the AST. When a file changes, you walk the graph to find everything that could be affected. This is fast — milliseconds for most codebases — and deterministic.\n\nIn CI, you can gate builds on impact scope: if a change only touches internal utilities, skip the full integration suite. If it touches a public API surface, run everything. This keeps feedback loops tight without sacrificing confidence.\n\nThe tradeoff? AST analysis doesn't understand runtime behavior. Dynamic imports, conditional requires, and metaprogramming can produce false negatives. But in practice, the signal-to-noise ratio is high enough to make it a worthwhile first pass.",
  },
  {
    slug: "automation-not-overhead",
    title: "Automation-first doesn't mean 'no human oversight'",
    date: "2026-04",
    summary:
      "The best automation pipelines are designed to fail transparently. If your script runs silently and breaks invisibly, it's not automation — it's tech debt.",
    tags: ["Automation", "DevOps", "Philosophy"],
    content:
      "The phrase 'automation-first' often gets misinterpreted as 'set it and forget it.' But the best automated systems are designed to communicate — loudly — when something goes wrong.\n\nA silent failure in a cron job that hasn't run in months isn't automation. It's a time bomb. The key is observability: every automated process should emit metrics, logs, and alerts. If it can't tell you it failed, it isn't working.\n\nStart with idempotency: running the same script twice should produce the same result. Then add structured logging. Then wire up health checks. Only then should you consider your process 'automated.'\n\nAutomation is a force multiplier, not a replacement for judgment. The goal is to free up human attention for decisions that require context — not to eliminate humans from the loop entirely.",
  },
  {
    slug: "structuring-django-apis",
    title: "Structuring Django APIs for fast-moving projects",
    date: "2026-03",
    summary:
      "When requirements shift weekly, your API design needs to be stable at the boundaries and flexible inside. Validation, serialization, and endpoint contracts matter more than the ORM.",
    tags: ["Django", "API", "Backend"],
    content:
      "In fast-moving projects, the database schema changes constantly. If your API is tightly coupled to your models, every migration becomes a breaking change.\n\nThe solution is to treat your API layer as a contract — independent of your storage layer. Use serializers (or Pydantic-style schemas) as the source of truth for request/response shapes. Keep your views thin: they should validate input, call a service, and return a response. Business logic lives in service modules, not views or models.\n\nThis separation lets you refactor models without rewriting endpoints. It also makes testing easier: you can test serializers and services independently of the database.\n\nFor versioning, use URL namespacing (`/v1/`, `/v2/`) or content negotiation. The goal is to never break a client that depends on a stable contract.",
  },
  {
    slug: "android-rom-production-lessons",
    title: "What Android ROM work taught me about production systems",
    date: "2026-02",
    summary:
      "Debugging boot loops and kernel panics translates surprisingly well to backend engineering. When you've traced a segfault at 2 AM, a failing CI build feels manageable.",
    tags: ["Android", "Systems", "Debugging"],
    content:
      "Building custom Android ROMs teaches you things about systems that you can't learn from web development alone. When your device won't boot because of a missing kernel module, there's no stack trace — there's just a black screen.\n\nYou learn to reason about systems from first principles. Memory pressure, file system corruption, init sequence ordering — these are all concepts that map directly to backend engineering. A server that won't start because of a missing environment variable? That's a boot loop. A connection pool that exhausts under load? That's an OOM kill.\n\nThe biggest lesson was reproducibility: if you can't reproduce a bug reliably, you can't fix it. This applies everywhere — from Android hardware bringup to distributed system debugging.",
  },
];
