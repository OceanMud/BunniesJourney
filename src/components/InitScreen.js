import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";
import { getLeaderBoard } from "./utils";

const InitScreen = () => {
  const { setInitScreen } = useContext(UserContext);

  const [door, setDoor] = useState(false);

  const { music, setMusic } = useContext(UserContext);
  const { sound, setSound } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);

  const [playbuttonHover] = useSound("/sounds/buttonhover.mp3", {
    volume: 0.5,
  });
  const [playDoor] = useSound("/sounds/door.mp3", {
    volume: 1,
  });

  useEffect(() => {
    getLeaderBoard();
    setActionText("Welcome to Bunnies Journey!");

    return () => {};
  });

  return (
    <div className="relative overflow-hidden">
      <img
        alt="background"
        src="images/intropic.png"
        className="h-72 absolute"
      />
      <div className="flex">
        <img
          alt="background"
          src="images/door.png"
          className={`${
            !door ? "translate-x-0" : "-translate-x-36"
          } transform transition ease-in-out duration-2500 w-36 h-72 `}
        />
        <img
          alt="background"
          src="images/door.png"
          className={`${
            !door ? "translate-x-0" : "translate-x-36"
          } transform transition ease-in-out duration-2500 w-36 h-72 `}
        />
      </div>

      <div id="99" className="flex w-40 absolute right-9 space-x-1 top-2">
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
      <div
        className="group absolute top-28  cursor-pointer right-24 h-20 w-20   bg-gray-400 border-4 rounded-full border-black    bg-opacity-60  hover:bg-opacity-80 shadow-xl"
        id="100"
      >
        <img
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          alt="title"
          src="images/settingsplay.svg"
          className="h-16 ml-1 mt-1 opacity-70 group-hover:opacity-100"
          onClick={() => {
            document.getElementById(99).style.visibility = "hidden";
            document.getElementById(100).style.visibility = "hidden";
            if (sound) {
              playDoor();
            }

            setDoor(true);
            setTimeout(() => {
              setInitScreen(false);
            }, 1400);
          }}
        />
      </div>
      {/* 
      <img alt="main" src={hero} className="absolute top-44 left-28  h-16  " /> */}
    </div>
  );
};

export default InitScreen;
