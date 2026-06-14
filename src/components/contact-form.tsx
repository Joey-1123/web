import { useState, type FormEvent } from "react";
import { FORMSUBMIT_ENDPOINT } from "@/lib/constants";

const COOLDOWN_SECONDS = 45;

function canSubmitWithCooldown(key: string, seconds: number) {
  const now = Date.now();
  const until = Number(localStorage.getItem(`cooldown_${key}`) || 0);
  if (now < until)
    return { ok: false, waitSeconds: Math.ceil((until - now) / 1000) };
  localStorage.setItem(`cooldown_${key}`, String(now + seconds * 1000));
  return { ok: true, waitSeconds: 0 };
}

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = form.querySelector<HTMLInputElement>(
      'input[name="website"]'
    );
    if (honeypot && honeypot.value.trim() !== "") {
      setStatus("Submission blocked.");
      return;
    }

    const rate = canSubmitWithCooldown("contact", COOLDOWN_SECONDS);
    if (!rate.ok) {
      setStatus(`Please wait ${rate.waitSeconds}s before submitting again.`);
      return;
    }

    setSubmitting(true);
    setStatus("Sending...");

    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!response.ok) throw new Error("submit failed");
      form.reset();
      setStatus("Sent. I'll get back to you.");
    } catch {
      setStatus("Failed. Email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      <input type="hidden" name="_subject" value="Portfolio Contact Message" />
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        className="border-b border-white/[0.08] bg-transparent py-3 text-sm text-foreground placeholder:text-foreground/20 focus:border-warm focus:outline-none"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border-b border-white/[0.08] bg-transparent py-3 text-sm text-foreground placeholder:text-foreground/20 focus:border-warm focus:outline-none"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Message"
        required
        className="resize-none border-b border-white/[0.08] bg-transparent py-3 text-sm text-foreground placeholder:text-foreground/20 focus:border-warm focus:outline-none"
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="font-mono text-xs uppercase tracking-widest text-warm transition-colors hover:text-foreground disabled:opacity-40"
        >
          {submitting ? "Sending..." : "Send"}
        </button>
        {status && (
          <span className="text-xs text-foreground/30" role="status" aria-live="polite">
            {status}
          </span>
        )}
      </div>
    </form>
  );
}
