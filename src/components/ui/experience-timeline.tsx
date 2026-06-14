import { experiences } from "@/data/experience";

export function ExperienceTimeline() {
  return (
    <section className="border-t border-white/[0.06] py-20">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
        02 / Experience
      </span>
      <h2 className="mt-6 mb-14 text-3xl font-bold md:text-4xl">
        Path
      </h2>

      <div className="relative">
        <div className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-white/[0.06] md:left-[9px]" />
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.year} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10">
              <div className="flex flex-col items-center">
                <div className="z-10 h-[15px] w-[15px] rounded-full border border-warm/50 bg-background md:h-[19px] md:w-[19px]" />
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-warm">
                  {exp.year}
                </span>
                <h3 className="mt-1 text-base font-semibold">{exp.title}</h3>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-foreground/30">
                  {exp.org}
                </p>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/40">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
