import PortfolioHero from "@/components/ui/portfolio-hero";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Home() {
  usePageMeta("Home", "AI Systems and Backend Engineer building automation-first products, scalable APIs, and performance-focused systems.");
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <div className="w-full">
        <PortfolioHero />
      </div>
    </>
  );
}
