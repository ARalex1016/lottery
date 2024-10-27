// Widgets
import MenuSlider from "./Widgets/MenuSlider";
import GameWindow from "./Widgets/GameWindow";
import ScreenOverlay from "./Widgets/ScreenOverlay";

const RandomNumber = () => {
  return (
    <>
      <div className="flex justify-center">
        <MenuSlider />
        <ScreenOverlay />
        <GameWindow />
      </div>
    </>
  );
};

export default RandomNumber;
