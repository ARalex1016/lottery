import { useEffect, useState } from "react";
import { useAnimationControls } from "framer-motion";

// Store
import useNumberGame from "../../../Store/randomNumGameStore";

// Components
import Row from "../../../Components/Row";

// Widgets
import Reel from "./Reel";

// Utils
import {
  getOrdinal,
  capitalizeFirstLetter,
} from "../../../Utils/randomNameGame";

const Slot = ({ enableIndex, index, handleAnimationComplete }) => {
  const spinControl = useAnimationControls();
  const { gameStatus, winnerList, totalWinners } = useNumberGame();

  const [reelSize, setReelSize] = useState(140);
  const [isPlayed, setIsPlayed] = useState(false);

  useEffect(() => {
    setIsPlayed(false);
  }, [gameStatus]);

  const displayWord = "R0LL!";

  const played = (status) => {
    setIsPlayed(status);
  };

  return (
    <>
      <div>
        <Row className=" gap-x-2">
          {/* -- */}

          {/* Ordinal Number */}
          <h2 className="w-16 text-2xl text-left text-secondary font-semibold">
            {getOrdinal(index + 1)}
          </h2>

          {/* Slot */}
          <div
            className="bg-slate-50 overflow-hidden"
            style={{
              // Video Sze (16:9 ratio)
              width: `${reelSize}px`,
              height: `${(reelSize / 16) * 9}px`,
            }}
          >
            {gameStatus ? (
              <Reel
                reelSize={reelSize}
                spinControl={spinControl}
                displayWord={displayWord}
                handleAnimationComplete={handleAnimationComplete}
                isPlayed={isPlayed}
                played={played}
                index={index}
              />
            ) : (
              <p className="w-full h-full text-primary text-xl font-semibold bg-slate-50 flex justify-center items-center">
                {winnerList.length > 0
                  ? capitalizeFirstLetter(winnerList[totalWinners - 1 - index])
                  : displayWord}
              </p>
            )}
          </div>

          {/* Spin Button */}
          <button
            disabled={!gameStatus || enableIndex !== index || isPlayed}
            onClick={() => spinControl.start("spin")}
            className="w-24 text-2xl text-primary font-medium bg-secondary rounded-md shadow-lg shadow-supporting py-2 ml-8 disabled:bg-gray-400 transition-all duration-300 disabled:text-primary disabled:opacity-60 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Spin
          </button>
        </Row>
      </div>
    </>
  );
};

export default Slot;
