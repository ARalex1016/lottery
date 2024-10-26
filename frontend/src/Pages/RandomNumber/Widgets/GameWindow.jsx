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
    resetWinnerList();

    if (gameStatus) {
      setEnableIndex(totalWinners - 1);
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
    setEnableIndex((pre) => pre - 1);
  };

  return (
    <>
      <main className="w-full h-screen flex flex-col justify-center items-center relative">
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
              className="text-3xl text-primary font-medium bg-yellowOrange rounded-md py-3 ml-6 absolute"
            >
              {firstTime ? "Start" : "Restart"}
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
              className="text-primary text-2xl font-semibold bg-red rounded-xl py-2 absolute bottom-[56px]"
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
