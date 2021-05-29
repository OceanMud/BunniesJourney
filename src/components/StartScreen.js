import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";
import { getLeaderBoard } from "./utils";

const StartScreen = () => {
  const { setActionText } = useContext(UserContext);
  const { setToken } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);
  const { setPlayer } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { setDifficulty } = useContext(UserContext);
  const { setMode } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);
  const { setHighScoreCount } = useContext(UserContext);
  const { setLeaderboard } = useContext(UserContext);
  const { setHeaderToggles } = useContext(UserContext);
  const { sound } = useContext(UserContext);
  const [submitCooldown, setSubmitCooldown] = useState(false);
  const [playbuttonHover] = useSound("./sounds/buttonhover.mp3", {
    volume: 0.3,
  });
  const subRef = useRef(0);
  subRef.current = score;

  useEffect(() => {
    setActionText(
      "The Bunny Kingdom is cursed! You must find and destroy the Amulet of Gondor!"
    );
    setPlayer({
      hp: 12,
      poisoned: false,
      protected: false,
      color: "text-black",
    });

    setMakeBoard(0);

    subRef.current = 0;
    setScore(subRef.current);

    return () => {};
  }, []);

  const resetCharacter = () => {
    if (hero === "images/icons/main/3.png") {
      setPlayer({
        hp: 4,
        poisoned: false,
        protected: true,
        color: "text-yellow-200",
      });
    }

    if (hero === "images/icons/main/2.png") {
      setPlayer({
        hp: 8,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }

    if (hero === "images/icons/main/1.png") {
      setPlayer({
        hp: 12,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }
    if (hero === "images/icons/main/4.png") {
      setPlayer({
        hp: 10,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }
  };

  const fetchLeaderboard = () => {
    setActionText("Fetching Leaderboard...");
    const results = async () => await getLeaderBoard();

    results()
      .then((result) => {
        setLeaderboard(result.data);
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
  };

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />
      <div className="top-6 left-7 absolute space-y-2 w-56 ">
        <button
          className="  focus:outline-none opacity-90 shadow-2xl w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
          onMouseEnter={() => {
            setActionText(
              "The Bunny Kingdom is cursed! You must find and destroy the Amulet of Gondor!"
            );
            if (sound) {
              playbuttonHover();
            }
          }}
          onClick={() => {
            setToken({ getToken: false, currentToken: "" });
            resetCharacter();
            setLevel(1);
            setMode("Story");
            setHighScoreCount({
              enemy: 0,
              potion: 0,
              level: 0,
            });
          }}
        >
          Story Mode
        </button>
        <button
          onMouseEnter={() => {
            setActionText(
              "How far can you go? Test your skill against levels that keep getting harder!"
            );
            if (sound) {
              playbuttonHover();
            }
          }}
          onClick={() => {
            setToken({ getToken: false, currentToken: "" });
            resetCharacter();
            setLevel(1);
            setMode("Endless");
            setDifficulty("Easy");
            setHighScoreCount({
              enemy: 0,
              potion: 0,
              level: 0,
            });
          }}
          className="focus:outline-none opacity-90 shadow-2xl w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
        >
          Endless Mode
        </button>
        <button
          className="focus:outline-none opacity-90 shadow-2xl w-full bg-yellow-300 hover:bg-yellow-500 text-white font-bold  px-10 border border-b-2  border-yellow-500 rounded"
          onClick={() => {
            fetchLeaderboard();
          }}
          onMouseEnter={() => {
            setActionText(
              "Become a legend by reaching the top of the leaderboards!"
            );
            if (sound) {
              playbuttonHover();
            }
          }}
        >
          <img
            alt="trophy"
            className=" ml-12  opacity-80  h-10 "
            src="images/trophy.svg"
          />
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
      <img
        alt="left arrow"
        src="images/leftarrow.svg"
        className="absolute left-8 opacity-80 bottom-10 hover:-translate-x-2 transform transition ease-in-out   h-16  cursor-pointer"
        onMouseEnter={() => {
          if (sound) {
            playbuttonHover();
          }
        }}
        onClick={() =>
          setHeaderToggles({
            info: false,
            leaderboard: false,
            settings: false,
            heros: true,
          })
        }
      />

      <img
        alt="right arrow"
        src="images/rightarrow.svg"
        className="absolute bottom-10 opacity-80 left-44 h-16  hover:opacity-100  hover:translate-x-2 transform transition ease-in-out cursor-pointer"
        onMouseEnter={() => {
          if (sound) {
            playbuttonHover();
          }
        }}
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
