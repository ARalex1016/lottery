import { useEffect, useState } from "react";
import { useAnimationControls } from "framer-motion";

// Store
import useNumberGame from "../../../Store/randomNumGameStore";

// Components
import Row from "../../../Components/Row";

// Widgets
import Reel from "./Reel";

// Utils
import { getOrdinal } from "../../../Utils/randomNameGame";

const Slot = ({ enableIndex, index, handleAnimationComplete }) => {
  const spinControl = useAnimationControls();
  const { gameStatus } = useNumberGame();

  const [reelSize, setReelSize] = useState(160);
  const [isPlayed, setIsPlayed] = useState(false);

  useEffect(() => {
    setIsPlayed(false);
  }, [gameStatus]);

  const displayWord = "---Roll!---";

  const played = (status) => {
    setIsPlayed(status);
  };

  return (
    <>
      <div>
        <Row className=" gap-x-8">
          {/* -- */}

          {/* Ordinal Number */}
          <h2 className="w-20 text-4xl text-secondary font-semibold">
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
              <p className="w-full h-full text-primary text-3xl font-semibold bg-slate-50 flex justify-center items-center">
                {displayWord}
              </p>
            )}
          </div>

          {/* Spin Button */}
          <button
            disabled={!gameStatus || enableIndex !== index || isPlayed}
            onClick={() => spinControl.start("spin")}
            className="w-28 text-2xl text-primary font-medium bg-secondary rounded-md shadow-lg shadow-supporting py-2 ml-6 disabled:bg-gray-400 transition-all duration-300 disabled:text-primary disabled:opacity-60 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Spin
          </button>
        </Row>
      </div>
    </>
  );
};

export default Slot;
