import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = "", children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function PortfolioHero() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { label: "HOME", to: "/", highlight: true },
    { label: "PORTFOLIO", to: "/portfolio" },
    { label: "ABOUT", to: "/portfolio", hash: "about" },
    { label: "PROJECTS", to: "/projects" },
    { label: "STACK", to: "/portfolio", hash: "stack" },
    { label: "WRITING", to: "/blog" },
    { label: "CONTACT", to: "/portfolio", hash: "connect" },
  ];

  const handleNavClick = (to: string, hash?: string) => {
    setIsMenuOpen(false);
    if (hash) {
      navigate(to);
      const waitForEl = (retries = 20) => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (retries > 0) {
          setTimeout(() => waitForEl(retries - 1), 50);
        }
      };
      setTimeout(() => waitForEl(), 100);
    } else {
      navigate(to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen text-foreground transition-colors"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
      }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between">
          {/* Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="z-50 p-2 text-neutral-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X
                  className="h-8 w-8 transition-colors duration-300"
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  className="h-8 w-8 transition-colors duration-300"
                  strokeWidth={2}
                />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute left-0 top-full z-[100] mt-2 ml-4 w-[200px] rounded-lg border-none p-4 shadow-2xl md:w-[240px]"
                style={{
                  backgroundColor: isDark
                    ? "hsl(0 0% 0%)"
                    : "hsl(0 0% 98%)",
                }}
              >
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="cursor-pointer py-1.5 px-2 text-lg font-bold tracking-tight transition-colors duration-300 md:text-xl w-full text-left"
                    style={{
                      display: "block",
                      color: item.highlight
                        ? "#C3E41D"
                        : isDark
                          ? "hsl(0 0% 100%)"
                          : "hsl(0 0% 10%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C3E41D";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = item.highlight
                        ? "#C3E41D"
                        : isDark
                          ? "hsl(0 0% 100%)"
                          : "hsl(0 0% 10%)";
                    }}
                    onClick={() => handleNavClick(item.to, item.hash)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Signature */}
          <div
            className="text-4xl"
            style={{
              color: isDark ? "hsl(0 0% 100%)" : "hsl(0 0% 10%)",
              fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
            }}
          >
            J
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="relative h-8 w-16 rounded-full transition-opacity hover:opacity-80"
            style={{
              backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 90%)",
            }}
            aria-label="Toggle theme"
          >
            <div
              className="absolute left-1 top-1 h-6 w-6 rounded-full transition-transform duration-300"
              style={{
                backgroundColor: isDark
                  ? "hsl(0 0% 100%)"
                  : "hsl(0 0% 10%)",
                transform: isDark ? "translateX(2rem)" : "translateX(0)",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative flex min-h-screen flex-col">
        {/* Centered Main Name */}
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4">
          <div className="relative text-center">
            <div>
              <BlurText
                text="JOEY"
                delay={100}
                animateBy="letters"
                direction="top"
                className="justify-center whitespace-nowrap text-[100px] font-bold uppercase leading-[0.75] tracking-tighter sm:text-[140px] md:text-[180px] lg:text-[210px]"
                style={{
                  color: "#C3E41D",
                  fontFamily: "'Fira Code', monospace",
                }}
              />
            </div>

            {/* Profile Picture */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="h-[110px] w-[65px] cursor-pointer overflow-hidden rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 sm:h-[152px] sm:w-[90px] md:h-[185px] md:w-[110px] lg:h-[218px] lg:w-[129px]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/about/me-1.webp`}
                  alt="Joey"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = `${import.meta.env.BASE_URL}assets/images/about/me-1.jpg`;
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="absolute bottom-16 left-1/2 w-full -translate-x-1/2 px-6 sm:bottom-20 md:bottom-24 lg:bottom-32 xl:bottom-36">
          <div className="flex justify-center">
            <BlurText
              text="AI systems and backend engineer."
              delay={150}
              animateBy="words"
              direction="top"
              className="cursor-pointer text-center text-[15px] transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white sm:text-[18px] md:text-[20px] lg:text-[22px]"
              style={{ fontFamily: "'Antic', sans-serif" }}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <Link
          to="/portfolio"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-colors duration-300 md:bottom-10"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5 text-neutral-500 transition-colors duration-300 hover:text-black dark:hover:text-white md:h-8 md:w-8" />
        </Link>
      </main>
    </div>
  );
}
