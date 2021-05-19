import React, { useEffect, useContext } from "react";
import UserContext from "./UserContext";

const InitScreen = () => {
  const { setInitScreen } = useContext(UserContext);
  const { music, setMusic } = useContext(UserContext);
  const { sound, setSound } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { hero } = useContext(UserContext);

  useEffect(() => {
    setActionText("Welcome to Bunnies Journey!");

    return () => {};
  });

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />

      <div className="flex w-40 absolute left-24 space-x-1 top-2">
        <button
          className={`group focus:outline-none ${
            music ? "bg-blue-500   bg-opacity-20" : "bg-red-500   bg-opacity-20"
          }   h-10 w-10  border-black border-2`}
        >
          <img
            alt="title"
            src={music ? "images/music.svg" : "images/musicoff.svg"}
            className=" top-6 left-24 h-10 opacity-75 group-hover:opacity-100"
            onClick={() => {
              setMusic(!music);
            }}
          />
        </button>

        <button
          className={`group focus:outline-none ${
            sound ? "bg-blue-500   bg-opacity-20" : "bg-red-500   bg-opacity-20"
          }   h-10 w-10  border-black border-2`}
        >
          <img
            alt="title"
            src={sound ? "images/sound.svg" : "images/soundoff.svg"}
            className=" top-6 left-24 h-10 opacity-75 group-hover:opacity-100"
            onClick={() => {
              setSound(!sound);
            }}
          />
        </button>
      </div>
      <img
        alt="title"
        src="images/play.svg"
        className="absolute top-20 opacity-80 cursor-pointer hover:opacity-100 left-24 h-20"
        onClick={() => {
          setInitScreen(false);
          setMusic(true);
        }}
      />

      <img alt="main" src={hero} className="absolute top-44 right-28  h-16  " />
    </div>
  );
};

export default InitScreen;
