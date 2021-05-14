import React, { useRef, useContext } from "react";
import UserContext from "./UserContext";
import CreateBoard from "./CreateBoard";
import CurrentBoard from "./CurrentBoard";
import StartScreen from "./StartScreen";
import VictoryScreen from "./VictoryScreen";
import GameoverScreen from "./GameoverScreen";

import "../styles/App.css";

function App() {
  const { level, setLevel } = useContext(UserContext);
  const { setNewBoard } = useContext(UserContext);
  const { makeBoard, setMakeBoard } = useContext(UserContext);
  const { actionText } = useContext(UserContext);
  const subRef = useRef(1);
  subRef.current = level;

  return (
    <div>
      <button
        className="  text-gray-700"
        Alt="Secret Button to skip level (in the top left)"
        onClick={() => {
          subRef.current++;
          setLevel(subRef.current);
          setMakeBoard(0);
          setNewBoard([
            "Monster",
            "Monster",
            "Monster",
            "Health",
            "Poison",
            "Shield",
            "Antidote",
          ]);
        }}
      >
        Skip Level
      </button>
      <div className=" mt-24 flex justify-center  text-xl font-bold ">
        <div className="flex flex-col w-72 border-4 border-black">
          <div>
            <img
              src="/images/title.png"
              className="  w-full border-b-2 border-black"
            />
          </div>

          {level === 0 ? (
            <StartScreen />
          ) : level === 10 ? (
            <VictoryScreen />
          ) : level === 12 ? (
            <GameoverScreen />
          ) : makeBoard === 0 ? (
            <CreateBoard />
          ) : (
            <CurrentBoard />
          )}
          <div className=" h-20  bg-yellow-100 border-0  border-black border-t-2 p-2  ">
            <p className="flex-wrap-reverse text-base">{actionText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
