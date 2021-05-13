import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";

const StartScreen = () => {
  const { setActionText } = useContext(UserContext);
  const { setHero } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);
  const { setPlayer } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);

  useEffect(() => {
    setActionText(
      "The Bunny Kingdom is cursed! You must find and destroy the Amulet of Gondor!"
    );
    setPlayer({
      hp: 10,
      poisoned: false,
      protected: false,
      color: "text-black",
    });

    setMakeBoard(0);
    return () => {};
  }, []);

  return (
    <div className="relative">
      <img src="images/background.jpg" className="h-72" />
      <img src="images/TitlePick.png" className="absolute top-10 left-1 h-14" />
      <img
        src="images/icons/main/1.png"
        className="absolute top-44 left-4 h-16 cursor-pointer"
        onClick={() => {
          setHero("images/icons/main/1.png");
          setLevel(1);
        }}
      />
      <img
        src="images/icons/main/2.png"
        className="absolute top-44 left-28 h-16 cursor-pointer"
        onClick={() => {
          setHero("images/icons/main/2.png");
          setLevel(1);
        }}
      />
      <img
        src="images/icons/main/3.png"
        className="absolute top-44 left-52 h-16 cursor-pointer"
        onClick={() => {
          setHero("images/icons/main/3.png");
          setLevel(1);
        }}
      />
    </div>
  );
};

export default StartScreen;
