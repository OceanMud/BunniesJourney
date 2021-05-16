import React, { useContext, useEffect, useRef } from "react";
import UserContext from "./UserContext";

const StartScreen = () => {
  const { setActionText } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);
  const { setPlayer } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { setDifficulty } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);
  const { setHeaderToggles } = useContext(UserContext);

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
      <div className="top-6 left-7 absolute space-y-2 w-56 ">
        <button
          class="  focus:outline-none opacity-90 shadow-2xl w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded-full"
          onMouseEnter={() =>
            setActionText(
              "The Bunny Kingdom is cursed! You must find and destroy the Amulet of Gondor!"
            )
          }
          onClick={() => {
            setLevel(1);
            setDifficulty("easy");
          }}
        >
          Story Mode
        </button>
        <button
          onMouseEnter={() =>
            setActionText(
              "How far can you go? Test your skill against levels that keep getting harder!"
            )
          }
          class="focus:outline-none opacity-90 shadow-2xl w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded-full"
        >
          Endless Mode
        </button>
        <button
          class="focus:outline-none opacity-90 shadow-2xl w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded-full"
          onMouseEnter={() =>
            setActionText(
              "Become a legend by reaching the top of the leaderboards!"
            )
          }
        >
          Leaderboard
        </button>
      </div>
      <img
        alt="main"
        src={hero}
        className="absolute top-44 right-28  h-16 cursor-pointer "
        onClick={() =>
          setHeaderToggles({
            info: false,
            leaderboard: false,
            settings: false,
            heros: true,
          })
        }
      />
    </div>
  );
};

export default StartScreen;
