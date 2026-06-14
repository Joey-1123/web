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
    setStatus("Question added.");
  };

  return (
    <section id="qa" className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
          Q&A
        </p>
        <h2 className="text-3xl font-bold md:text-5xl">
          Ask me anything
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-foreground/75">
          Questions and answers around backend architecture, AI systems,
          automation, and Android development.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-xl">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
        <div className="flex gap-2">
          <input
            id="qa-question"
            name="question"
            type="text"
            placeholder="Your question"
            required
            className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40"
          />
          <button
            type="submit"
            className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/20"
          >
            Ask
          </button>
        </div>
        {status && (
          <p className="text-sm text-foreground/60" role="status" aria-live="polite">
            {status}
          </p>
        )}
      </form>

      <div className="grid gap-6">
        {questions.map((item, index) => (
          <article
            key={`${item.date}-${index}`}
            className="border-b border-white/10 pb-6"
          >
            <p className="mb-2 text-sm text-foreground/50">{item.date}</p>
            <h3 className="mb-2 text-xl font-semibold">{item.question}</h3>
            <p className="text-sm leading-7 text-foreground/75">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
