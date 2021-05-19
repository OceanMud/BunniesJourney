import React, { useContext } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const SettingsScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setScore } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);

  const { music, setMusic } = useContext(UserContext);

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
            })
          }
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          className="   bg-blue-500 hover:bg-blue-700 font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
        >
          <img className=" opacity-70 h-10 " src="images/settingsplay.svg" />
        </button>

        {level === 0 && (
          <button
            onClick={() =>
              setHeaderToggles({
                info: false,
                leaderboard: false,
                settings: false,
                heros: true,
              })
            }
            onMouseEnter={() => {
              if (sound) {
                playbuttonHover();
              }
            }}
            className="   bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
          >
            <img className=" opacity-70 h-10 " src="./images/heros.svg" />
          </button>
        )}

        {level !== 0 && (
          <>
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
              onClick={() => {
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                  heros: false,
                });
                setScore(0);
                setLevel(1);
                setMakeBoard(0);
              }}
              onMouseEnter={() => {
                if (sound) {
                  playbuttonHover();
                }
              }}
            >
              <img className=" opacity-70 h-10 " src="images/replay.svg" />
            </button>
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
              onClick={() => {
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                  heros: false,
                });

                setScore(0);
                setLevel(0);
              }}
              onMouseEnter={() => {
                if (sound) {
                  playbuttonHover();
                }
              }}
            >
              <img className=" opacity-70 h-10 " src="images/home.svg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsScreen;
