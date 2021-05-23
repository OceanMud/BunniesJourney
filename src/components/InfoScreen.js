import React, { useContext } from "react";
import UserContext from "./UserContext";

const InfoScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  return (
    <div
      onClick={() => setHeaderToggles({ info: false, leaderboard: false })}
      className="relative"
    >
      <img alt="background" src="images/background.jpg" className="h-72" />
      <div className=" h-52 w-64  absolute top-3   border-gray-800 bg-gray-200 bg-opacity-60 ml-3 text-gray-900 border-double shadow-2xl  border-8 ">
        <h3 className="text-center mb-4">Scoring</h3>
        <div className=" ">
          <div className="flex space-x-2 items-center ">
            <img alt="background" src="images/icons/cave/1.png" className="" />
            <span>+ 10 Points * ATK</span>
          </div>
          <div className="flex space-x-2 mt-4 items-center ">
            <img
              alt="background"
              src="images/icons/arrow.png"
              className="h-7"
            />
            <span>+50 Points per Level</span>
          </div>
          <div className="flex space-x-2 mt-4 items-center ">
            <img
              alt="background"
              src="images/icons/tile/field.png"
              className="h-9"
            />
            <span>-10 Points Backward</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;
