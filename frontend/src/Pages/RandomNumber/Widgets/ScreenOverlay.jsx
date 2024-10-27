// Store
import useNumberGame from "../../../Store/randomNumGameStore";

const ScreenOverlay = ({ className, children }) => {
  const { gameStatus } = useNumberGame();

  return (
    <>
      {!gameStatus && (
        <div
          className={`absolute inset-0  z-10 ${className}`}
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(.6px)",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default ScreenOverlay;
