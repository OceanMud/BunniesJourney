import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";
import { submitLeaderboard } from "./utils";

const VictoryScreen = () => {
  const { setActionText } = useContext(UserContext);
  const { mode } = useContext(UserContext);

  const { hero } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { setLeaderboard } = useContext(UserContext);
  const { setLevel } = useContext(UserContext);
  const { setHeaderToggles } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);
  const { highScoreCount, setHighScoreCount } = useContext(UserContext);
  const { sound } = useContext(UserContext);
  const [monsterSummary, setMonsterSummary] = useState(false);
  const [potionSummary, setPotionSummary] = useState(false);
  const [levelSummary, setLevelSummary] = useState(false);
  const [finalScore, setFinalScore] = useState(false);
  const [buttonScore, setButtonScore] = useState(false);
  const [submitScore, setSubmitScore] = useState(false);
  const { disableHs, setDisableHs } = useContext(UserContext);
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

    const localScore = JSON.parse(localStorage.getItem("score"));
    if (mode === "Story" && player.hp > 0) {
      setActionText(
        "You Smash the Amulet and lift the curse of The Bunny Kingdom!"
      );
    }

    if (mode === "Story" && player.hp <= 0) {
      setActionText(
        "The Bunny Kingdom has been lost! Is there any adventurer that can save us? "
      );
    }

    if (mode === "Endless") {
      setActionText(
        "This journey has come to an end... and so the next  begins!"
      );
    }

    if (!localScore) {
      localStorage.setItem("score", JSON.stringify(subRef.current));
    } else {
      if (localScore > subRef.current) {
      } else {
        localStorage.setItem("score", JSON.stringify(subRef.current));
      }
    }

    if (hero === "images/icons/main/1.png") {
      setPlayer({
        hp: 10,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }

    if (hero === "images/icons/main/2.png") {
      setPlayer({
        hp: 6,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }

    if (hero === "images/icons/main/3.png") {
      setPlayer({
        hp: 4,
        poisoned: false,
        protected: true,
        color: "text-yellow-200",
      });
    }
    return () => {};
  }, []);

  const fetchLeaderboard = () => {
    let heroName = "";
    if (hero === "images/icons/main/1.png") {
      heroName = "Max";
    } else if (hero === "images/icons/main/2.png") {
      heroName = "Bowser";
    } else if (hero === "images/icons/main/3.png") {
      heroName = "Petey";
    }

    if (name === "") {
      setName("Anonymous");
    }

    const results = async () => await submitLeaderboard(name, score, heroName);

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
        console.log("error");
      });
  };

  return (
    <div className="relative ">
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
                  <p className="mt-3  pb-2 align-top border-b-4 bg-opacity-70 border-opacity-70 border-yellow-300 h-full bg-yellow-300 pt-2 text-center -ml-1  ">
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
                    fetchLeaderboard();
                  }}
                >
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                    maxlength="18"
                    className="pl-2 h-10 font-bold focus:outline-none w-full mt-5 -ml-1 border-gray-300 border border-b-2"
                    onChange={(e) => {
                      setName(e.target.value);
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
                    onClick={() => {
                      setDisableHs(true);
                    }}
                    class="focus:outline-none opacity-90 shadow-2xl w-full bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-10 border border-b-2 border-green-700 rounded -ml-1 mt-4"
                  >
                    <img
                      alt="checkmark"
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
                setActionText("Start a new journey");
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
                setDisableHs(false);
                setScore(0);
                setLevel(1);
                setMakeBoard(0);
              }}
              className={`${
                disableHs && "ml-11"
              }  opacity-95   bg-blue-500 hover:bg-blue-700 font-bold py-4 px-5 border-2 border-blue-700 rounded`}
            >
              <img
                alt="replay"
                className=" opacity-70 h-10 "
                src="images/replay.svg"
              />
            </button>
            {!disableHs && (
              <button
                onMouseEnter={() => {
                  setActionText(
                    "Become a legend by reaching the top of the leaderboard! "
                  );
                  if (sound) {
                    playbuttonHover();
                  }
                }}
                onClick={() => {
                  setDisableHs(true);
                  setSubmitScore(true);
                }}
                className="mt-2  bg-yellow-300 hover:bg-yellow-500 font-bold py-4 px-5 border-2 border-yellow-400 rounded"
              >
                <img
                  alt="trophy"
                  className=" opacity-70 h-10 "
                  src="images/trophy.svg"
                />
              </button>
            )}
            <button
              onMouseEnter={() => {
                setActionText("Return to the main menu");
                if (sound) {
                  playbuttonHover();
                }
              }}
              onClick={() => {
                setDisableHs(false);
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
              <img
                alt="home"
                className=" opacity-70 h-10 "
                src="images/home.svg"
              />
            </button>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default VictoryScreen;
