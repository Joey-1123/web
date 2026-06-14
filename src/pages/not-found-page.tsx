import { NotFound, NotFoundLink } from "@/components/ui/not-found-1";
import { BookOpen, Book, MessageCircle } from "lucide-react";

const links: NotFoundLink[] = [
  {
    title: "Portfolio",
    subtitle: "Back to the main portfolio page",
    icon: BookOpen,
    href: "/portfolio",
  },
  {
    title: "Work log",
    subtitle: "Browse projects and work",
    icon: Book,
    href: "/projects",
  },
  {
    title: "Notes",
    subtitle: "Read latest writing",
    icon: MessageCircle,
    href: "/blog",
  },
];

export default function NotFoundPage() {
  return <NotFound links={links} />;
}
