import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import toast from "react-hot-toast";

// Store
import useNumberGame from "../../../Store/randomNumGameStore";

// Widgets
import SlotMachine from "./SlotMachine";

const GameWindow = () => {
  const {
    playerList,
    totalWinners,
    gameStatus,
    setGameStatus,
    resetWinnerList,
  } = useNumberGame();

  const [firstTime, setFirstTime] = useState(true);
  const [enableIndex, setEnableIndex] = useState(null);

  useEffect(() => {
    if (gameStatus) {
      setEnableIndex(totalWinners - 1);
      resetWinnerList();
    }
  }, [gameStatus]);

  const handleStartClick = () => {
    // Check if playerList is empty or contains only empty strings
    const hasEmptyElement =
      playerList.length === 0 ||
      playerList.some((player) => player.trim() === "");

    if (hasEmptyElement) {
      toast.error("Player name can't be empty!");
      return;
    } else if (new Set(playerList).size !== playerList.length) {
      toast.error("Player names must be unique");
      return;
    }

    setGameStatus(true);
    setFirstTime(false);
  };

  const handleAnimationComplete = () => {
    if (enableIndex <= 0) {
      setGameStatus((pre) => !pre);
      return;
    }

    setEnableIndex((pre) => pre - 1);
  };

  return (
    <>
      <main
        className="w-full flex flex-col justify-center items-center relative"
        style={{
          height: "100vh",
          height: "100svh",
        }}
      >
        {/* --- */}

        {/* Slot Machine */}
        <SlotMachine
          enableIndex={enableIndex}
          handleAnimationComplete={handleAnimationComplete}
        />

        {/* Game Start and Restart Button */}
        <AnimatePresence>
          {/* Start/Restart Button */}
          {!gameStatus && (
            <motion.button
              key="startButton" // Unique key for independent handling
              onClick={handleStartClick}
              variants={{
                startInitial: {
                  width: "0",
                  bottom: "-100px",
                  opacity: 0,
                },
                startFinal: {
                  width: "240px",
                  bottom: "56px",
                  opacity: 1,
                },
              }}
              initial="startInitial"
              animate="startFinal"
              exit="startInitial"
              transition={{
                type: "spring",
              }}
              className="text-3xl text-secondary font-bold tracking-widest bg-primary border-2 border-secondary outline-none rounded-md py-3 absolute z-20"
              style={{
                textShadow: "0px 0px 4px #FF204E, -0px -0px 4px #FF204E",
                boxShadow:
                  "2px 2px 16px #FF204E, -2px -2px 16px #FF204E,inset 2px 2px 6px #FF204E,inset  -2px -2px 6px #FF204E",
              }}
            >
              {firstTime ? "START" : "RESTART"}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* Exit Button */}
          {gameStatus && (
            <motion.button
              key="exitButton"
              onClick={() => setGameStatus(false)}
              variants={{
                exitInitial: {
                  width: "0px",
                  right: "-100px",
                  opacity: 0,
                },
                exitFinal: {
                  width: "100px",
                  right: "40px",
                  opacity: 1,
                },
              }}
              initial="exitInitial"
              animate="exitFinal"
              exit="exitInitial"
              transition={{
                type: "spring",
              }}
              className="text-slate-50 text-2xl font-bold tracking-widest bg-red rounded-md py-2 absolute bottom-[56px]"
              style={{
                boxShadow: "4px 4px 10px #ff14bd, -1px -1px 2px #ff14bd",
              }}
            >
              Exit
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default GameWindow;
