import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";

const VictoryScreen = () => {
  const { setActionText } = useContext(UserContext);

  const { setPlayer } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);

  useEffect(() => {
    setActionText(
      "You Smash the Amulet and lift the curse of The Bunny Kingdom!"
    );
    setPlayer({
      hp: 10,
      poisoned: false,
      protected: false,
      color: "text-black",
    });
    return () => {};
  }, []);

  return (
    <div className="relative">
      <img src="images/background.jpg" className="h-72" />
      <img src="images/win.png" className="absolute top-10 left-8 h-20" />
      <img
        src="images/replay.svg"
        className="absolute top-32 left-24 h-20 cursor-pointer"
        onClick={() => setLevel(0)}
      />
    </div>
  );
};

export default VictoryScreen;
