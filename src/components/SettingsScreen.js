import React, { useContext } from "react";
import UserContext from "./UserContext";

const SettingsScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setScore } = useContext(UserContext);
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
            })
          }
          class="  w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
        >
          Back
        </button>

        {level !== 0 ? (
          <>
            <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded">
              Restart
            </button>
            <button
              onClick={() => {
                setScore(0);
                setLevel(0);
                setHeaderToggles({
                  info: false,
                  leaderboard: false,
                  settings: false,
                });
              }}
              class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded"
            >
              Home
            </button>
          </>
        ) : undefined}

        <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-10 border border-b-2 border-blue-700 rounded">
          Credits
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;
