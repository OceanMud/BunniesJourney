import React, { useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";

const SettingsScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setScore } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);

  const { sound, setSound } = useContext(UserContext);
  const { music, setMusic } = useContext(UserContext);

  const [soundOn, setSoundOn] = useState(false);

  // const [playMusic, { stop, isPlaying }] = useSound("./sounds/Field_loop.mp3");

  useEffect(() => {
    if (soundOn) {
    }
    console.log("test");
    if (!soundOn) {
    }

    return () => {};
  }, [soundOn]);

  const checkMusic = () => {
    if (music) {
      // setMusic(false);
      // playMusic();
      return;
    }

    if (!music) {
      // setMusic(true);
      // stop();

      return;
    }
  };

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />
      <div className="top-6 left-16 absolute space-y-2 w-36 ">
        <button
          onClick={() =>
            setHeaderToggles({
              info: false,
              leaderboard: false,
              settings: false,
              heros: false,
            })
          }
          className="  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
        >
          Back
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
            className="  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
          >
            Heros
          </button>
        )}

        {level !== 0 && (
          <>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
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
            >
              Restart
            </button>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
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
            >
              Home
            </button>
          </>
        )}

        <button
          onClick={() => setMusic(!music)}
          className="relative text-green-500 bg-green-500 border-green-700 hover:bg-green-700 hover:text-green-700"
        >
          <img
            className="left-12 top-0 opacity-70 absolute h-full"
            src="./images/sound.svg"
          />
          sasdasdasdasda
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;
