import { useState, useCallback, type ComponentType } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/ui/mobile-nav";

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageFallbackSrc?: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: ComponentType<{ className?: string }>; href: string; label: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="font-mono text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/30 transition-colors hover:text-warm"
    aria-label={label}
  >
    <Icon className="h-4 w-4" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageFallbackSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const placeholderSrc =
    "https://placehold.co/400x600/1a1a1a/e8e4de?text=Image+Not+Found";

  const handleImageError = useCallback(() => {
    if (imageFallbackSrc && currentImageSrc !== imageFallbackSrc) {
      setCurrentImageSrc(imageFallbackSrc);
    } else if (currentImageSrc !== placeholderSrc) {
      setCurrentImageSrc(placeholderSrc);
    }
  }, [currentImageSrc, imageFallbackSrc, placeholderSrc]);

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-6 py-8 font-sans md:px-10 md:py-10",
        className
      )}
    >
      {/* Header */}
      <header className="z-30 flex w-full items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.3em] text-foreground/50"
        >
          {logoText}
        </motion.div>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-1 md:hidden"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          type="button"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="block h-px w-5 bg-foreground/60" />
          <span className="block h-px w-3.5 bg-foreground/60" />
        </motion.button>
      </header>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="grid w-full grid-cols-1 items-end gap-12 md:grid-cols-[1fr_auto] md:gap-8">
          {/* Left: text */}
          <div className="flex flex-col justify-end gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase leading-[0.85] tracking-[-0.04em] text-foreground">
                {overlayText.part1}
                <br />
                <span className="text-foreground/20">{overlayText.part2}</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-md"
            >
              <p className="text-sm leading-relaxed text-foreground/50">
                {mainText}
              </p>
              <a
                href={readMoreLink}
                className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-warm transition-colors hover:text-foreground"
              >
                <span className="h-px w-4 bg-warm" />
                Read more
              </a>
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] w-[18rem] overflow-hidden md:w-[20rem] lg:w-[24rem]"
          >
            <img
              src={currentImageSrc}
              alt={imageAlt}
              width={384}
              height={512}
              className="h-full w-full object-cover object-center grayscale-[20%]"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="z-30 flex w-full items-end justify-between pt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex items-center gap-5"
        >
          {socialLinks.map((link) => (
            <SocialIcon
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/25"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
