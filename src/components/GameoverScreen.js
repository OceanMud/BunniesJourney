import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";

const GameoverScreen = () => {
  const { setActionText } = useContext(UserContext);
  const { setHero } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);

  useEffect(() => {
    setActionText(
      "The Bunny Kingdom has been lost! Is there any adventurer that can save us? "
    );
    return () => {};
  }, []);

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />
      <img
        alt=" gameover"
        src="images/gameover.png"
        className="absolute top-10 left-3 h-20"
      />

      <img
        alt="replay"
        src="images/replay.svg"
        className="absolute top-32 left-24 h-20 cursor-pointer"
        onClick={() => setLevel(0)}
      />
    </div>
  );
};

export default GameoverScreen;
