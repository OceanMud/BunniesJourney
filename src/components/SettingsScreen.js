import React, { useContext } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const SettingsScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setScore } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { setDisableHs } = useContext(UserContext);
  const { music, setMusic } = useContext(UserContext);
  const { setHighScoreCount } = useContext(UserContext);

  const { sound, setSound } = useContext(UserContext);
  const [playbuttonHover] = useSound("./sounds/buttonhover.mp3", {
    volume: 0.3,
  });

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />
      <div className="top-0 -mt-1 left-20 absolute space-y-2 w-32 ">
        <button
          onMouseEnter={() => {
            if (!music) {
              setActionText("Turn On Music");
            }
            if (music) {
              setActionText("Turn Off Music");
            }
            if (sound) {
              playbuttonHover();
            }
          }}
          className={`group focus:outline-none ${
            music ? "bg-blue-500   bg-opacity-20" : "bg-red-500   bg-opacity-20"
          }   h-14 w-14  border-black border-2`}
        >
          <img
            alt="title"
            src={music ? "images/music.svg" : "images/musicoff.svg"}
            className=" h-10 ml-1 opacity-75 group-hover:opacity-100"
            onClick={() => {
              setMusic(!music);
            }}
          />
        </button>

        <button
          onMouseEnter={() => {
            if (!sound) {
              setActionText("Turn On Sound");
            }
            if (sound) {
              setActionText("Turn Off Sound");
            }

            if (sound) {
              playbuttonHover();
            }
          }}
          className={` ml-2 group focus:outline-none ${
            sound ? "bg-blue-500   bg-opacity-20" : "bg-red-500   bg-opacity-20"
          }   h-14 w-14  border-black border-2`}
        >
          <img
            alt="title"
            src={sound ? "images/sound.svg" : "images/soundoff.svg"}
            className=" h-10 ml-1 opacity-75 group-hover:opacity-100"
            onClick={() => {
              setSound(!sound);
            }}
          />
        </button>
        <button
          onClick={() =>
            setHeaderToggles({
              info: false,
              leaderboard: false,
              settings: false,
              heros: false,
              credits: false,
            })
          }
          onMouseEnter={() => {
            setActionText("Return to your journey");
            if (sound) {
              playbuttonHover();
            }
          }}
          className="   bg-blue-500 hover:bg-blue-700 font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
        >
          <img
            alt="continue"
            className=" opacity-70 h-10 "
            src="images/settingsplay.svg"
          />
        </button>

        {level === 0 && (
          <div>
            <button
              onClick={() =>
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                  heros: true,
                  credits: false,
                })
              }
              onMouseEnter={() => {
                setActionText("Choose your Hero");
                if (sound) {
                  playbuttonHover();
                }
              }}
              className="   bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
            >
              <img
                alt="heros"
                className=" opacity-70 h-10 "
                src="./images/heros.svg"
              />
            </button>
            <button
              onClick={() => {
                setActionText(
                  " Thanks for trying Bunnies Journey! Let me know what you thought!"
                );
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                  heros: false,
                  credits: true,
                });
              }}
              onMouseEnter={() => {
                setActionText("About the Creator");
                if (sound) {
                  playbuttonHover();
                }
              }}
              className=" mt-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
            >
              <img
                alt="credits"
                className=" opacity-70 h-10 "
                src="./images/credits.svg"
              />
            </button>
          </div>
        )}

        {level !== 0 && (
          <>
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
              onClick={() => {
                setDisableHs(false);
                setHighScoreCount({
                  enemy: 0,
                  potion: 0,
                  level: 0,
                });
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                  heros: false,
                  credits: false,
                });
                setScore(0);
                setLevel(1);
                setMakeBoard(0);
              }}
              onMouseEnter={() => {
                setActionText("Start a new journey");
                if (sound) {
                  playbuttonHover();
                }
              }}
            >
              <img
                alt="replay"
                className=" opacity-70 h-10 "
                src="images/replay.svg"
              />
            </button>
            <button
              className=" bg-blue-500  hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
              onClick={() => {
                setDisableHs(false);
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                  heros: false,
                  credits: false,
                });

                setScore(0);
                setLevel(0);
              }}
              onMouseEnter={() => {
                setActionText("Return to the main menu");
                if (sound) {
                  playbuttonHover();
                }
              }}
            >
              <img
                alt="home"
                className=" opacity-70 h-10 "
                src="images/home.svg"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsScreen;
