import React, { useContext, useEffect, useRef } from "react";
import UserContext from "./UserContext";

const StartScreen = () => {
  const { setActionText } = useContext(UserContext);
  const { setHero } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);
  const { setPlayer } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { setDifficulty } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);

  const subRef = useRef(0);
  subRef.current = score;

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

    subRef.current = 0;
    setScore(subRef.current);

    return () => {};
  }, []);

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />

      <img
        alt="title"
        src="images/TitlePick.png"
        className="absolute top-10 left-1 h-14"
      />
      <div
        className="group "
        onClick={() => {
          setHero("images/icons/main/1.png");
          setLevel(1);
          setDifficulty("easy");
        }}
      >
        <img
          alt="main"
          src="images/icons/main/1.png"
          className="absolute top-44 left-4 h-16 cursor-pointer "
        />
        <p className=" group-hover:text-yellow-600  text-gray-800 absolute top-36 left-6 h-16 cursor-pointer">
          Easy
        </p>
      </div>
      <div
        className="group -space-x-1"
        onClick={() => {
          setHero("images/icons/main/2.png");
          setLevel(1);
          setDifficulty("medium");
        }}
      >
        <img
          alt="person2"
          src="images/icons/main/2.png"
          className="absolute top-44 left-28 h-16 cursor-pointer"
        />
        <p className=" group-hover:text-yellow-600  text-gray-800 absolute top-36  left-28 h-16 cursor-pointer">
          Normal
        </p>
      </div>
      <div
        className="group space-x-2"
        onClick={() => {
          setHero("images/icons/main/3.png");
          setLevel(1);
          setDifficulty("hard");
        }}
      >
        <img
          alt="person3"
          src="images/icons/main/3.png"
          className="absolute top-44 left-52 h-16 cursor-pointer"
        />
        <p className=" group-hover:text-yellow-600  text-gray-800 absolute top-36 left-52 h-16 cursor-pointer">
          Hard
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
