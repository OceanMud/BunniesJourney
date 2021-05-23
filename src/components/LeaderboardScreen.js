import React, { useContext, useEffect } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const LeaderboardScreen = () => {
  const { leaderboard } = useContext(UserContext);
  const { sound } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setHeaderToggles } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { setScore } = useContext(UserContext);
  const { setDisableHs } = useContext(UserContext);

  const [playbuttonHover] = useSound("./sounds/buttonhover.mp3", {
    volume: 0.3,
  });

  useEffect(() => {
    setActionText("The Top 10 of Bunnies Journey!!!");

    return () => {};
  });

  return (
    <div className="relative">
      <img
        alt="background"
        src="images/background.jpg"
        className="h-72 opacity-90"
      />

      <div className="absolute top-0">
        <div className=" text-sm h-72   w-72 ">
          <div className=" h-60 w-64   border-gray-800 bg-gray-200 bg-opacity-60 ml-3 text-gray-900 border-double shadow-2xl  border-8 ">
            <div className="grid grid-cols-3 text-lg -mt-2 ">
              <h3 className="ml-2">Name</h3>
              <h3 className="justify-self-center">Score</h3>
              <h3 className="justify-self-center">Hero</h3>
            </div>
            <div className="ml-2 text-gray-900   ">
              {leaderboard.map((item, index) => (
                <div key={index} className="grid grid-cols-3  ">
                  <p className="">
                    {index + 1}.{item.owner}
                  </p>
                  <p className="justify-self-center">{item.score}</p>
                  <p className="justify-self-center">{item.hero}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="-bottom-1 left-16 absolute  space-x-4">
          {level !== 0 ? (
            <button
              onMouseEnter={() => {
                if (sound) {
                  playbuttonHover();
                }
              }}
              onClick={() => {
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                  heros: false,
                  credits: false,
                });
              }}
              className=" focus:outline-none  opacity-95   bg-blue-500 hover:bg-blue-700 font-bold  px-2 border-2 border-blue-700 rounded"
            >
              <img
                alt="play"
                className=" opacity-70 h-10 "
                src="images/settingsplay.svg"
              />
            </button>
          ) : undefined}

          <button
            onMouseEnter={() => {
              if (sound) {
                playbuttonHover();
              }
            }}
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
              setMakeBoard(0);
            }}
            className={` focus:outline-none    opacity-95  bg-blue-500 hover:bg-blue-700 font-bold  px-2 border-2 border-blue-700 rounded ${
              level === 0 && "ml-10"
            } `}
          >
            <img
              alt="home"
              className=" opacity-70 h-10 "
              src="images/home.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
