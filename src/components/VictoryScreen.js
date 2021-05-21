import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const VictoryScreen = () => {
  const { setActionText } = useContext(UserContext);
  const { mode } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);
  const { setHeaderToggles } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);
  const { highScoreCount, setHighScoreCount } = useContext(UserContext);
  const { sound } = useContext(UserContext);
  const [monsterSummary, setMonsterSummary] = useState(false);
  const [potionSummary, setPotionSummary] = useState(false);
  const [levelSummary, setLevelSummary] = useState(false);
  const [finalScore, setFinalScore] = useState(false);
  const [buttonScore, setButtonScore] = useState(false);
  const [submitScore, setSubmitScore] = useState(false);
  const [name, setName] = useState("");

  const [playbuttonHover] = useSound("./sounds/buttonhover.mp3", {
    volume: 0.3,
  });

  const subRef = useRef(score);
  subRef.current = score;

  useEffect(() => {
    setTimeout(() => {
      setMonsterSummary(true);
    }, 500);

    setTimeout(() => {
      setPotionSummary(true);
    }, 1000);

    setTimeout(() => {
      setLevelSummary(true);
    }, 1500);

    setTimeout(() => {
      setFinalScore(true);
    }, 2000);

    setTimeout(() => {
      setButtonScore(true);
    }, 3000);

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

      <div className="absolute top-2 left-7">
        <div className=" h-48 w-56   border-gray-800 bg-gray-200 bg-opacity-60 border-double shadow-2xl  border-8">
          <div className="ml-1   ">
            {!submitScore ? (
              <div className=" text-center  mt-1">
                <div className="text-center mt-1 text-2xl">Summary</div>
                {monsterSummary ? (
                  <p>Enemies Slain: {highScoreCount.enemy}</p>
                ) : undefined}
                {potionSummary ? (
                  <p>Potions Used: {highScoreCount.potion}</p>
                ) : undefined}
                {levelSummary ? (
                  <p>Levels Passed: {highScoreCount.level}</p>
                ) : undefined}

                {finalScore ? (
                  <p className="mt-2  pb-2 border-b-4 bg-opacity-70 border-opacity-70 border-yellow-300 h-full bg-yellow-300 pt-2 text-center -ml-1  ">
                    Final Score: {subRef.current}
                  </p>
                ) : undefined}
              </div>
            ) : (
              <div className="text-center  mt-1">
                <div className="text-center mt-4  text-2xl">Submit Score</div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setHeaderToggles({
                      info: false,
                      leaderboard: true,
                      settings: false,
                      heros: false,
                    });
                  }}
                >
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                    maxlength="18"
                    className="pl-2 h-10 font-bold focus:outline-none w-full mt-5 -ml-1 border-gray-300 border border-b-2"
                    onChange={(e) => {
                      setName(e.value);
                    }}
                  />
                  <button
                    onMouseEnter={() => {
                      setActionText(
                        "How far can you go? Test your skill against levels that keep getting harder!"
                      );
                      if (sound) {
                        playbuttonHover();
                      }
                    }}
                    onClick={() => {}}
                    class="focus:outline-none opacity-90 shadow-2xl w-full bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-10 border border-b-2 border-green-700 rounded -ml-1 mt-4"
                  >
                    <img
                      className=" opacity-80 ml-8 h-10 "
                      src="images/check.svg"
                    />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {buttonScore ? (
          <div className=" -ml-5 space-x-1 ">
            <button
              onMouseEnter={() => {
                if (sound) {
                  playbuttonHover();
                }
              }}
              onClick={() => {
                setHighScoreCount({
                  enemy: 0,
                  potion: 0,
                  level: 0,
                });
                setScore(0);
                setLevel(1);
                setMakeBoard(0);
              }}
              className="   opacity-95   bg-blue-500 hover:bg-blue-700 font-bold py-4 px-5 border-2 border-blue-700 rounded"
            >
              <img className=" opacity-70 h-10 " src="images/replay.svg" />
            </button>
            <button
              onMouseEnter={() => {
                if (sound) {
                  playbuttonHover();
                }
              }}
              onClick={() => {
                setSubmitScore(true);
              }}
              className="  mt-2  bg-yellow-300 hover:bg-yellow-500 font-bold py-4 px-5 border-2 border-yellow-400 rounded"
            >
              <img className=" opacity-70 h-10 " src="images/trophy.svg" />
            </button>
            <button
              onMouseEnter={() => {
                if (sound) {
                  playbuttonHover();
                }
              }}
              onClick={() => {
                setHighScoreCount({
                  enemy: 0,
                  potion: 0,
                  level: 0,
                });
                setScore(0);
                setLevel(0);
                setMakeBoard(0);
              }}
              className="  mt-2  opacity-95  bg-blue-500 hover:bg-blue-700 font-bold py-4 px-5 border-2 border-blue-700 rounded"
            >
              <img className=" opacity-70 h-10 " src="images/home.svg" />
            </button>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default VictoryScreen;
