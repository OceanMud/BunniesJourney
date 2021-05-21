import React from "react";

const LeaderboardScreen = () => {
  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />

      <div className="absolute top-0">
        <div className=" text-sm h-72  bg-gray-600 bg-opacity-20 w-72 ">
          <div className="flex justify-between ml-2 mr-20 text-lg space-x-2">
            <h3>Name</h3>
            <h3>Score</h3>
          </div>
          <div className="ml-2">
            <p>1.</p>

            <p>2.</p>

            <p>3.</p>
            <p>4.</p>
            <p>5.</p>
            <p>6.</p>
            <p>7.</p>
            <p>8.</p>
            <p>9.</p>
            <p>10.</p>
          </div>
        </div>
        <div className="bottom-0 left-16 absolute  space-x-4">
          <button
            onMouseEnter={() => {
              // if (sound) {
              //   playbuttonHover();
              // }
            }}
            onClick={() => {
              // setHighScoreCount({
              //   enemy: 0,
              //   potion: 0,
              //   level: 0,
              // });
              // setScore(0);
              // setLevel(1);
              // setMakeBoard(0);
            }}
            className="   opacity-95   bg-blue-500 hover:bg-blue-700 font-bold py-2 px-3 border-2 border-blue-700 rounded"
          >
            <img className=" opacity-70 h-10 " src="images/settingsplay.svg" />
          </button>
          <button
            onMouseEnter={() => {
              // if (sound) {
              //   playbuttonHover();
              // }
            }}
            onClick={() => {
              // setHighScoreCount({
              //   enemy: 0,
              //   potion: 0,
              //   level: 0,
              // });
              // setScore(0);
              // setLevel(0);
              // setMakeBoard(0);
            }}
            className="  mt-2  opacity-95  bg-blue-500 hover:bg-blue-700 font-bold py-2 px-3 border-2 border-blue-700 rounded"
          >
            <img className=" opacity-70 h-10 " src="images/home.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
