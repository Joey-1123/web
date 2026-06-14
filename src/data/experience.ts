export interface Experience {
  year: string;
  title: string;
  org: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    year: "2026",
    title: "Learning Prompt, LLM Optimization",
    org: "Self-Taught",
    description:
      "Third year BSc AI & ML. Deep-diving into prompt engineering, LLM optimization, and agent workflows. Building practical AI systems alongside academic coursework.",
  },
  {
    year: "2025",
    title: "AI Systems & Backend Engineer",
    org: "Freelance / Independent",
    description:
      "Second year alongside building AI workflow integrations, backend APIs, and automation tooling. Delivering production systems for data pipelines and developer productivity.",
  },
  {
    year: "2024",
    title: "Backend Developer",
    org: "Freelance",
    description:
      "First year BSc AI & ML. Developed RESTful APIs with Django REST Framework, integrated third-party services, and built automation scripts that reduced manual workflow overhead.",
  },
  {
    year: "2023",
    title: "Systems & Android Engineer",
    org: "Independent Projects",
    description:
      "Explored Android ROM development, Linux system internals, and low-level debugging. Gained deep understanding of performance and reliability at the system level.",
  },
  {
    year: "2021",
    title: "Journey Started",
    org: "Self-Taught",
    description:
      "Began with Python and C++, worked through algorithms and systems programming. Built first CLI tools and automation scripts.",
  },
];
