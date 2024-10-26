// Widgets
import Slot from "./Slot";

// Store
import useNumberGame from "../../../Store/randomNumGameStore";

const SlotMachine = ({ enableIndex, handleAnimationComplete }) => {
  const { totalWinners } = useNumberGame();

  return (
    <>
      <section className="flex flex-col justify-center items-center gap-y-8 relative">
        {/* ---- */}

        {/* Slots */}
        {Array.from({ length: totalWinners }).map((player, index) => {
          return (
            <Slot
              key={index}
              enableIndex={enableIndex}
              index={index}
              handleAnimationComplete={handleAnimationComplete}
            />
          );
        })}
      </section>
    </>
  );
};

export default SlotMachine;
