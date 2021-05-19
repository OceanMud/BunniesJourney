import React, { useEffect, useContext } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const InitScreen = () => {
  const { setInitScreen } = useContext(UserContext);
  const { music, setMusic } = useContext(UserContext);
  const { sound, setSound } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const [playbuttonHover] = useSound("/sounds/buttonhover.mp3", {
    volume: 0.5,
  });

  useEffect(() => {
    setActionText("Welcome to Bunnies Journey!");

    return () => {};
  });

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />

      <div className="flex w-40 absolute left-20 space-x-1 top-2">
        <button
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          className={`group focus:outline-none ${
            music
              ? "bg-green-500   bg-opacity-30  hover:bg-opacity-60"
              : "bg-red-500    bg-opacity-30  hover:bg-opacity-60"
          }   h-14 w-14  border-black border-2`}
        >
          <img
            alt="title"
            src={music ? "images/music.svg" : "images/musicoff.svg"}
            className=" ml-1 h-10 opacity-75 group-hover:opacity-100"
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
          className={` shadow-2xl group focus:outline-none ${
            sound
              ? "bg-green-500   bg-opacity-30  hover:bg-opacity-60"
              : "bg-red-500    bg-opacity-30  hover:bg-opacity-60"
          }   h-14 w-14  border-black border-2`}
        >
          <img
            alt="title"
            src={sound ? "images/sound.svg" : "images/soundoff.svg"}
            className=" ml-1 h-10 opacity-75 group-hover:opacity-100"
            onClick={() => {
              setSound(!sound);
            }}
          />
        </button>
      </div>
      <div className="group absolute top-20  cursor-pointer right-24 h-20 w-24   bg-blue-500 border-2 border-black    bg-opacity-30  hover:bg-opacity-60 shadow-xl">
        <img
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          alt="title"
          src="images/settingsplay.svg"
          className="h-20 ml-1 opacity-70 group-hover:opacity-100"
          onClick={() => {
            setInitScreen(false);
          }}
        />
      </div>

      <img alt="main" src={hero} className="absolute top-44 right-28  h-16  " />
    </div>
  );
};

export default InitScreen;
