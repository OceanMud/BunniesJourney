import React, { useRef, useContext } from "react";
import UserContext from "./UserContext";
import CreateBoard from "./CreateBoard";
import CurrentBoard from "./CurrentBoard";
import StartScreen from "./StartScreen";
import VictoryScreen from "./VictoryScreen";
import GameoverScreen from "./GameoverScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import InfoScreen from "./InfoScreen";

import "../styles/App.css";

function App() {
  const { level, setLevel } = useContext(UserContext);
  const { setNewBoard } = useContext(UserContext);
  const { score } = useContext(UserContext);
  const { makeBoard, setMakeBoard } = useContext(UserContext);
  const { actionText } = useContext(UserContext);
  const { headerToggles, setHeaderToggles } = useContext(UserContext);
  const subRef = useRef(1);
  subRef.current = level;

  const localScore = JSON.parse(localStorage.getItem("score"));

  const toggleInfo = () => {
    if (headerToggles.info) {
      setHeaderToggles({ info: false, leaderboard: false });
    } else {
      setHeaderToggles({ info: true, leaderboard: false });
    }
  };

  const toggleLeaderboard = () => {
    if (headerToggles.leaderboard) {
      setHeaderToggles({ info: false, leaderboard: false });
    } else {
      setHeaderToggles({ info: false, leaderboard: true });
    }
  };

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
          <div className="relative ">
            <img
              src="/images/title2.png"
              className="  w-full border-b-2 border-black"
            />

            <img
              onClick={() => toggleLeaderboard()}
              src="/images/trophy.svg"
              className=" cursor-pointer absolute opacity-80  bottom-1 right-2 h-5  "
            />

            <img
              onClick={() => toggleInfo()}
              src="/images/info.svg"
              className=" cursor-pointer absolute opacity-80  bottom-1 right-8 h-5  "
            />

            <div className=" text-gray-800 absolute text-xl  left-0 bottom-0">
              {level === 0 || level === 12 ? (
                <div className="flex space-x-1 items-center ">
                  <p> Best Score: </p>

                  <p className="leading-tight"> {localScore}</p>
                </div>
              ) : (
                <div className="flex space-x-1 items-center ">
                  <p>Score: </p>

                  <p className="leading-tight"> {score}</p>
                </div>
              )}
            </div>
          </div>

          {headerToggles.info ? (
            <InfoScreen />
          ) : headerToggles.leaderboard ? (
            <LeaderboardScreen />
          ) : level === 0 ? (
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
