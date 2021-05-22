import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const CreditsScreen = () => {
  const { sound } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);

  const { setHeaderToggles } = useContext(UserContext);

  const [playbuttonHover] = useSound("./sounds/buttonhover.mp3", {
    volume: 0.3,
  });

  useEffect(() => {
    return () => {};
  });

  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />

      <div className="absolute top-0">
        <div className="  h-72  bg-gray-600 bg-opacity-20 w-72 ">
          <div className="top-6 left-7 absolute space-y-2 w-56 ">
            <button
              className="  focus:outline-none opacity-90 shadow-2xl w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
              onClick={() => {
                window.open("https://www.twitter.com/OceanMud");
              }}
              onMouseEnter={() => {
                setActionText("visit my personal Twitter");
                if (sound) {
                  playbuttonHover();
                }
              }}
            >
              My Twitter
            </button>
            <button
              onClick={() => {
                window.open("https://www.twitch.tv/OceanMud");
              }}
              onMouseEnter={() => {
                setActionText("visit my Twitch stream");
                if (sound) {
                  playbuttonHover();
                }
              }}
              className="focus:outline-none opacity-90 shadow-2xl w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-10 border border-b-2 border-purple-700 rounded"
            >
              My Twitch
            </button>
          </div>
        </div>
        <div className="top-36 left-16 absolute  space-x-4">
          <button
            onClick={() => {
              setHeaderToggles({
                info: false,
                leaderboard: false,
                settings: false,
                heros: false,
                credits: false,
              });
            }}
            onMouseEnter={() => {
              if (sound) {
                playbuttonHover();
              }
            }}
            className={` focus:outline-none  mt-2  opacity-95  bg-blue-500 hover:bg-blue-700 font-bold py-3 px-4 border-2 border-blue-700 rounded ml-10`}
          >
            <img className=" opacity-70 h-10 " src="images/home.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditsScreen;
