"use client";

import { Brain, Clock3, Code2, Cpu, Rocket } from "lucide-react";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Backend Foundation",
    date: "2023",
    content:
      "Started shipping Django REST APIs and building cleaner backend structure with validation and auth.",
    category: "Backend",
    icon: Code2,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 96,
  },
  {
    id: 2,
    title: "AI Workflows",
    date: "2024",
    content:
      "Began integrating AI-assisted workflows into real projects focused on developer productivity and automation.",
    category: "AI",
    icon: Brain,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 88,
  },
  {
    id: 3,
    title: "ROM Engineering",
    date: "2024",
    content:
      "Worked deeper on Android systems, performance tuning, and ROM-focused product thinking.",
    category: "Systems",
    icon: Cpu,
    relatedIds: [1, 5],
    status: "in-progress" as const,
    energy: 79,
  },
  {
    id: 4,
    title: "Learnalytics",
    date: "Now",
    content:
      "Building a learning analytics platform with Django, AI-assisted ideas, and production-minded architecture.",
    category: "Project",
    icon: Rocket,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 84,
  },
  {
    id: 5,
    title: "Impact Engine",
    date: "Next",
    content:
      "Expanding toward dependency mapping, code impact tracking, and smarter backend tooling for teams.",
    category: "Roadmap",
    icon: Clock3,
    relatedIds: [3, 4],
    status: "pending" as const,
    energy: 61,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export default RadialOrbitalTimelineDemo;
