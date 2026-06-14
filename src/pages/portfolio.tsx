import App from "@/App";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function PortfolioPage() {
  usePageMeta("Portfolio", "Backend and AI systems engineer. Django, FastAPI, Python, automation, and systems programming.");
  return <App />;
}
