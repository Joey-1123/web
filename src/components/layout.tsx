import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { HelpModal } from "@/components/ui/help-modal";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showHelp, setShowHelp } = useKeyboardShortcuts(navigate);

  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
