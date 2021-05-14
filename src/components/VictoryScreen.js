import React, { useContext, useEffect, useRef } from "react";
import UserContext from "./UserContext";

const VictoryScreen = () => {
  const { setActionText } = useContext(UserContext);

  const { player, setPlayer } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);

  const subRef = useRef(score);
  subRef.current = score;

  useEffect(() => {
    setActionText(
      "You Smash the Amulet and lift the curse of The Bunny Kingdom!"
    );

    subRef.current = subRef.current + player.hp * 10;

    if (player.protected) {
      subRef.current = subRef.current + 50;
    }

    setScore(subRef.current);

    const localScore = JSON.parse(localStorage.getItem("score"));

    if (!localScore) {
      localStorage.setItem("score", JSON.stringify(subRef.current));
    } else {
      if (localScore > subRef.current) {
      } else {
        localStorage.setItem("score", JSON.stringify(subRef.current));
      }
    }

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
      <img alt="background" src="images/background.jpg" className="h-72" />
      <img
        alt="win"
        src="images/win.png"
        className="absolute top-2 left-8 h-20"
      />
      <p className="absolute text-2xl top-28 left-10">
        Final Score: {subRef.current}
      </p>
      <img
        alt="replay"
        src="images/replay.svg"
        className="absolute top-40 left-24 h-20 cursor-pointer"
        onClick={() => setLevel(0)}
      />
    </div>
  );
};

export default VictoryScreen;
