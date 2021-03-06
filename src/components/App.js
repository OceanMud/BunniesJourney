import React, { useRef, useContext } from "react";
import UserContext from "./UserContext";
import CreateBoard from "./CreateBoard";
import CurrentBoard from "./CurrentBoard";
import StartScreen from "./StartScreen";
import VictoryScreen from "./VictoryScreen";
import GameoverScreen from "./GameoverScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import InfoScreen from "./InfoScreen";
import SettingsScreen from "./SettingsScreen";
import HerosScreen from "./HerosScreen";
import InitScreen from "./InitScreen";
import CreditsScreen from "./CreditsScreen";
import { getLeaderBoard } from "./utils";

import ReactAudioPlayer from "react-audio-player";

import "../styles/App.css";

function App() {
  const { level, setLevel } = useContext(UserContext);
  const { leaderboard, setLeaderboard } = useContext(UserContext);
  const { setNewBoard } = useContext(UserContext);
  const { score } = useContext(UserContext);
  const { makeBoard, setMakeBoard } = useContext(UserContext);
  const { actionText } = useContext(UserContext);
  const { headerToggles, setHeaderToggles } = useContext(UserContext);
  const { music } = useContext(UserContext);
  const { initScreen } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);

  const subRef = useRef(1);
  subRef.current = level;

  const localScore = JSON.parse(localStorage.getItem("score"));

  const toggleInfo = () => {
    if (headerToggles.info) {
      setHeaderToggles({
        info: false,
        leaderboard: false,
        settings: false,
        heros: false,
        credits: false,
      });
    } else {
      setHeaderToggles({
        info: true,
        leaderboard: false,
        settings: false,
        heros: false,
        credits: false,
      });
    }
  };

  const toggleLeaderboard = () => {
    if (headerToggles.leaderboard) {
      setHeaderToggles({
        info: false,
        leaderboard: false,
        settings: false,
        heros: false,
        credits: false,
      });
    } else {
      setHeaderToggles({
        info: false,
        leaderboard: true,
        settings: false,
        heros: false,
        credits: false,
      });
    }
  };

  const toggleSettings = () => {
    if (headerToggles.settings) {
      setHeaderToggles({
        info: false,
        leaderboard: false,
        settings: false,
        heros: false,
        credits: false,
      });
    } else {
      setHeaderToggles({
        info: false,
        leaderboard: false,
        settings: true,
        heros: false,
        credits: false,
      });
    }
  };

  const fetchLeaderboard = () => {
    const results = async () => await getLeaderBoard();
    setActionText("Fetching LeaderBoard...");
    if (leaderboard === "") {
      results()
        .then((result) => {
          console.log("test");
          setLeaderboard(result.data);
          !initScreen && toggleLeaderboard();

          setHeaderToggles({
            info: false,
            leaderboard: true,
            settings: false,
            heros: false,
          });
        })
        .catch((e) => {
          setActionText("Error Please Try Again Later");
          console.log("error");
        });
    }

    if (leaderboard) {
      !initScreen && toggleLeaderboard();
    }
  };
  return (
    <div>
      {music ? (
        <ReactAudioPlayer src="./sounds/Field_loop2.mp3" autoPlay loop />
      ) : undefined}

      {/* <button
        className="  text-gray-700"
        alt=""
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
      </button> */}
      <div className="  flex justify-center  text-xl font-bold ">
        <div className="flex flex-col w-72 border-4 border-black">
          <div className="relative ">
            <img
              alt="title"
              src="/images/title2.png"
              className="  w-full border-b-2 border-black"
            />

            <img
              alt="trophy"
              onClick={() => {
                fetchLeaderboard();
              }}
              src="/images/trophy.svg"
              className=" cursor-pointer absolute opacity-80  bottom-1 right-2 h-5  "
            />

            <img
              alt="info"
              onClick={() => {
                setActionText("Take your game to the next level!");
                !initScreen && toggleInfo();
              }}
              src="/images/info.svg"
              className=" cursor-pointer absolute opacity-80  bottom-1 right-8 h-5  "
            />

            <img
              alt="settings"
              onClick={() => {
                !initScreen && toggleSettings();
              }}
              src="/images/settings.svg"
              className=" cursor-pointer absolute opacity-80  bottom-1 right-14 h-5  "
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

          {initScreen ? (
            <InitScreen />
          ) : headerToggles.info ? (
            <InfoScreen />
          ) : headerToggles.leaderboard ? (
            <LeaderboardScreen />
          ) : headerToggles.settings ? (
            <SettingsScreen />
          ) : headerToggles.heros ? (
            <HerosScreen />
          ) : headerToggles.credits ? (
            <CreditsScreen />
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
