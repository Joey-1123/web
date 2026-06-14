import { useEffect, useState } from "react";
import type { NavigateFunction } from "react-router-dom";

type ShortcutMap = Record<string, () => void>;

export function useKeyboardShortcuts(navigate: NavigateFunction) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const shortcuts: ShortcutMap = {
      p: () => navigate("/portfolio"),
      w: () => navigate("/projects"),
      b: () => navigate("/blog"),
      "?": () => setShowHelp((v) => !v),
      Escape: () => setShowHelp(false),
    };

    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key;
      if (key in shortcuts) shortcuts[key]();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return { showHelp, setShowHelp };
}
