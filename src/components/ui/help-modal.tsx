import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: "P", action: "Go to portfolio" },
  { key: "W", action: "Go to work log" },
  { key: "B", action: "Go to blog" },
  { key: "?", action: "Toggle this help" },
  { key: "Esc", action: "Close help" },
];

export function HelpModal({ open, onClose }: HelpModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-6"
          >
            <div className="w-full max-w-sm rounded-lg border border-white/[0.08] bg-surface p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/30">
                  Keyboard shortcuts
                </span>
                <button type="button" onClick={onClose} aria-label="Close" className="text-foreground/30 hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {shortcuts.map((s) => (
                  <div key={s.key} className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/50">{s.action}</span>
                    <kbd className="rounded border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] tracking-wider text-foreground/40">
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
