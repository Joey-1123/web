import { useState, type FormEvent } from "react";

const COOLDOWN_SECONDS = 20;

interface QaItem {
  date: string;
  question: string;
  answer: string;
}

const initialQuestions: QaItem[] = [
  {
    date: "4/1/2026",
    question: "How do you approach backend design when a project is still evolving fast?",
    answer:
      "I focus on strong validation, clean boundaries, and structured APIs so the system can scale without turning fragile.",
  },
  {
    date: "4/1/2026",
    question: "Where does AI actually fit into your engineering workflow today?",
    answer:
      "I use AI to reduce friction: log triage, error summarization, automation support, and faster iteration inside complex dev loops.",
  },
  {
    date: "4/1/2026",
    question: "What makes automation-first development valuable to you?",
    answer:
      "It saves energy for the hard problems. If repetitive setup or debugging can be scripted, I can spend more time building better systems.",
  },
  {
    date: "4/1/2026",
    question: "How does Android systems work influence your backend thinking?",
    answer:
      "It taught me to care about performance, debugging discipline, reliability, and real-world user experience. Those habits translate directly to backend architecture.",
  },
];

function canSubmitWithCooldown(key: string, seconds: number) {
  const now = Date.now();
  const until = Number(localStorage.getItem(`cooldown_${key}`) || 0);
  if (now < until)
    return { ok: false, waitSeconds: Math.ceil((until - now) / 1000) };
  localStorage.setItem(`cooldown_${key}`, String(now + seconds * 1000));
  return { ok: true, waitSeconds: 0 };
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function QaSection() {
  const [questions, setQuestions] = useState<QaItem[]>(initialQuestions);
  const [status, setStatus] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = form.querySelector<HTMLInputElement>(
      'input[name="website"]'
    );
    if (honeypot && honeypot.value.trim() !== "") {
      setStatus("Submission blocked.");
      return;
    }

    const rate = canSubmitWithCooldown("qa", COOLDOWN_SECONDS);
    if (!rate.ok) {
      setStatus(
        `Please wait ${rate.waitSeconds}s before asking again.`
      );
      return;
    }

    const input = form.querySelector<HTMLInputElement>("#qa-question");
    const value = input ? input.value.trim() : "";
    if (!value) return;

    const now = new Date();
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    const newItem: QaItem = {
      date,
      question: escapeHtml(value),
      answer:
        "Great question. I will answer this soon with a practical, field-tested response.",
    };

    setQuestions((prev) => [newItem, ...prev]);
    form.reset();
    setStatus("Added.");
  };

  return (
    <section id="qa" className="border-t border-white/[0.06] py-20">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
        06 / Q&A
      </span>
      <h2 className="mt-6 mb-4 text-3xl font-bold md:text-4xl">
        Questions
      </h2>
      <p className="mb-10 max-w-md text-sm text-foreground/40">
        Ask me anything about backend architecture, AI systems, automation, or
        Android development.
      </p>

      <form onSubmit={handleSubmit} className="mb-12 flex gap-3">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
        <input
          id="qa-question"
          name="question"
          type="text"
          placeholder="Your question..."
          required
          className="flex-1 border-b border-white/[0.08] bg-transparent py-3 text-sm text-foreground placeholder:text-foreground/20 focus:border-warm focus:outline-none"
        />
        <button
          type="submit"
          className="font-mono text-xs uppercase tracking-widest text-warm transition-colors hover:text-foreground"
        >
          Ask
        </button>
        {status && (
          <span className="self-center text-xs text-foreground/30" role="status" aria-live="polite">
            {status}
          </span>
        )}
      </form>

      <div className="space-y-0">
        {questions.map((item, index) => (
          <article
            key={`${item.date}-${index}`}
            className="border-t border-white/[0.06] py-6"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="font-mono text-[10px] text-foreground/20">
                {item.date}
              </span>
            </div>
            <h3 className="text-base font-medium">{item.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/40">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
