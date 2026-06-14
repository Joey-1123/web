import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
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
      setStatus("Message sent. I will reply soon.");
    } catch {
      setStatus("Send failed. Please email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
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
        placeholder="Your name"
        required
        className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40"
      />
      <input
        name="email"
        type="email"
        placeholder="Your email"
        required
        className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40"
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Your message"
        required
        className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40"
      />
      <button
        type="submit"
        disabled={submitting}
        className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/20 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {submitting ? "Sending..." : "Send Message"}
      </button>
      {status && (
        <p className="text-sm text-foreground/60" role="status" aria-live="polite">
          {status}
        </p>
      )}
    </form>
  );
}
