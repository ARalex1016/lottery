import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Store
import useNumberGame from "../../../Store/randomNumGameStore";

// Utils
import {
  generateRandomName,
  generateRandomNumber,
  capitalizeFirstLetter,
} from "../../../Utils/randomNameGame";

const Reel = ({
  reelSize,
  spinControl,
  displayWord,
  handleAnimationComplete,
  isPlayed,
  played,
  index,
}) => {
  const { gameStatus, totalPlayers, playerList, winnerList, setWinnerList } =
    useNumberGame();

  const [randomPlayerList, setRandomPlayerList] = useState([]);
  const [winnerPosition, setWinnerPosition] = useState(null);
  const [winner, setWinner] = useState(null);

  const duration = 2 + (totalPlayers - index);
  const totalRandomNumbers = 100;

  const generateRandomNameList = (player, exclude = []) => {
    const nameList = [];

    for (let i = 0; i < totalRandomNumbers - 1; i++) {
      const randomName = generateRandomName(playerList, exclude);
      nameList.push(randomName);
    }

    nameList.push(displayWord);

    return nameList;
  };

  useEffect(() => {
    if (gameStatus) {
      // Game On

      if (!isPlayed) {
        // Game On and Not Spinned
        setRandomPlayerList(generateRandomNameList(playerList, winnerList));
        setWinnerPosition(
          generateRandomNumber(0.6 * totalRandomNumbers, totalRandomNumbers)
        );
      }
    }
  }, [gameStatus, winnerList]);

  useEffect(() => {
    setWinner(randomPlayerList[totalRandomNumbers - winnerPosition]);
  }, [winnerPosition]);

  const afterAnimationCompleted = () => {
    handleAnimationComplete();
    setWinnerList(winner);
  };

  return (
    <>
      {playerList.length <= 0 ? (
        <div className="w-full h-full flex justify-center items-center"></div>
      ) : (
        <motion.div
          variants={{
            initial: {
              y: `-${100 * (totalRandomNumbers - 1)}%`,
            },
            spin: {
              y: `-${100 * (totalRandomNumbers - winnerPosition)}%`,
            },
          }}
          initial="initial"
          animate={spinControl}
          transition={{
            duration: duration,
            ease: "circOut",
          }}
          onAnimationStart={() => played(true)}
          onAnimationComplete={afterAnimationCompleted}
          className="h-full"
        >
          {/* --- */}

          {/* Reel */}
          {randomPlayerList.map((player, index) => {
            return (
              <div
                key={index}
                className="text-primary text-3xl font-semibold bg-slate-50 flex justify-center items-center"
                style={{
                  flexGrow: 1,
                  width: "100%",
                  height: "100%",
                }}
              >
                {capitalizeFirstLetter(player)}
              </div>
            );
          })}
        </motion.div>
      )}
    </>
  );
};

export default Reel;
