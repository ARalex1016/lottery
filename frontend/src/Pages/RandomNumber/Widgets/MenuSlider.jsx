import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Lucide Icons
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

// Widgets
import Slider from "./Slider";

// Components
import Row from "../../../Components/Row";
import Column from "../../../Components/Column";

// Store
import useNumberGame from "../../../Store/randomNumGameStore";

const MenuSlider = () => {
  const {
    gameStatus,
    totalWinners,
    totalPlayers,
    setPlayerList,
    setTotalWinners,
    addPlayer,
    minusPlayer,
  } = useNumberGame();

  const sliderControls = useAnimationControls();

  const [isOpen, setIsOpen] = useState(false);
  const [playerNameList, setPlayerNameList] = useState(
    Array.from({ length: totalPlayers }).fill("")
  );

  const minPlayer = 2;
  const maxPlayer = 10;

  useEffect(() => {
    setPlayerNameList((prevPlayerList) => {
      // Handle playerList size adjustment based on totalPlayers
      if (totalPlayers > prevPlayerList.length) {
        // If totalPlayers increased, add empty fields
        return prevPlayerList.concat(
          new Array(totalPlayers - prevPlayerList.length).fill("")
        );
      } else {
        // If totalPlayers decreased, slice the array to the new length
        return prevPlayerList.slice(0, totalPlayers);
      }
    });

    // Adjust totalWinners if necessary when totalPlayers is too low
    if (totalPlayers < 3 && totalWinners >= 2) {
      setTotalWinners(1);
    }
  }, [totalPlayers, totalWinners]);

  useEffect(() => {
    localStorage.setItem("totalPlayers", totalPlayers);
  }, [totalPlayers]);

  useEffect(() => {
    localStorage.setItem("totalWinners", totalWinners);
  }, [totalWinners]);

  useEffect(() => {
    setPlayerList(playerNameList);
  }, [playerNameList]);

  const handleToggleSlider = () => {
    if (isOpen) {
      sliderControls.start("initial"); // Close the slider
    } else {
      sliderControls.start("dropDown"); // Open the slider
    }

    setIsOpen((pre) => !pre);
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    setPlayerNameList((pre) =>
      pre.map((player, i) => (i === index ? value : player))
    );
  };

  const handleReset = () => {
    setPlayerNameList(Array.from({ length: totalPlayers }).fill(""));
  };

  return (
    <>
      <Slider sliderControls={sliderControls} isOpen={isOpen}>
        <div className="w-full bg-secondary rounded-inherit py-8 flex flex-col justify-around items-center z-30 relative gap-y-6">
          {/* ----- */}

          <Row className="w-full flex flex-row justify-around items-center">
            <Column className="gap-y-4">
              <label
                htmlFor="selection"
                className="text-primary text-xl font-bold"
              >
                Total Winners
              </label>
              <select
                value={totalWinners}
                disabled={gameStatus}
                onChange={(e) => Number(setTotalWinners(e.target.value))}
                id="selection"
                className="w-14 aspect-square text-2xl font-semibold text-center rounded-md shadow-custom-inset outline-none border-none"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </Column>

            <Column className="gap-y-4">
              <label
                htmlFor="selection"
                className="text-primary text-xl font-bold"
              >
                Total Players
              </label>

              <Row className="gap-x-4">
                <input
                  type="number"
                  value={totalPlayers}
                  disabled={gameStatus}
                  readOnly
                  className="w-14 aspect-square text-2xl font-semibold text-center rounded-md shadow-custom-inset outline-none border-none cursor-not-allowed"
                />

                <Column className="gap-y-2">
                  <button
                    onClick={() => {
                      totalPlayers < maxPlayer && addPlayer(1);
                    }}
                    disabled={gameStatus}
                    className="w-6 aspect-square text-slate-50 bg-green shadow-sm shadow-gray-300 rounded-full transition-all duration-300 disabled:bg-gray-400 disabled:text-slate-50 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    <Plus />
                  </button>

                  <button
                    onClick={() => {
                      totalPlayers > minPlayer && minusPlayer(1);
                    }}
                    disabled={gameStatus}
                    className="w-6 aspect-square text-red bg-slate-50 rounded-full transition-all duration-300 disabled:bg-gray-400 disabled:text-slate-50 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    <Minus />
                  </button>
                </Column>
              </Row>
            </Column>
          </Row>

          <p className="text-primary text-2xl bg-transparent  font-semibold">
            Fill Players Name
          </p>

          {/* Input Form */}
          <Row className="flex-wrap gap-x-10 gap-y-4">
            {Array.from({ length: totalPlayers }).map((player, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  value={playerNameList[index] || ""}
                  disabled={gameStatus}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Player Name"
                  className="w-36 text-base font-medium pl-4 py-2 rounded-md shadow-custom-inset border-none outline-none"
                />
              );
            })}
          </Row>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            disabled={gameStatus}
            className="px-10 py-2 text-xl font-medium text-slate-50 bg-primary rounded-md shadow-md shadow-gray-500 transition-all duration-300 disabled:text-primary disabled:bg-gray-400 disabled:opacity-90"
          >
            Reset
          </button>

          {/* Open & Close Menu Toggle Button */}
          <motion.button
            onClick={handleToggleSlider}
            aria-expanded={isOpen}
            className={`text-primary bg-slate-50 aspect-square rounded-full shadow-md shadow-slate-500 p-2 outline-none cursor-pointer hover:scale-105 absolute left-4`}
            animate={{
              top: isOpen ? "100%" : "calc(100% + 10px)",
              translateY: isOpen && "-50%",
            }}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </motion.button>
        </div>
      </Slider>
    </>
  );
};

export default MenuSlider;
