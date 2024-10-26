// Widgets
import MenuSlider from "./Widgets/MenuSlider";
import GameWindow from "./Widgets/GameWindow";

const RandomNumber = () => {
  return (
    <>
      <div className="flex justify-center">
        <MenuSlider />
        <GameWindow />
      </div>
    </>
  );
};

export default RandomNumber;
