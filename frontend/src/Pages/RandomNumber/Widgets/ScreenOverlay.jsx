import { motion, AnimatePresence } from "framer-motion";

// Store
import useNumberGame from "../../../Store/randomNumGameStore";

const ScreenOverlay = ({ className, children }) => {
  const { gameStatus } = useNumberGame();

  return (
    <>
      <AnimatePresence>
        {!gameStatus && (
          <motion.div
            variants={{
              initial: {
                // opacity: 0,
                background: "rgba(0, 0, 0, 0)",
                backdropFilter: "blur(0px)",
              },
              final: {
                // opacity: 0.4,
                background: "rgba(0, 0, 0, .3)",
                backdropFilter: "blur(.2px)",
              },
            }}
            initial="initial"
            animate="final"
            exit="initial"
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
            className={`absolute inset-0  z-10 ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenOverlay;
