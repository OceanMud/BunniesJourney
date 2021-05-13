import React, { useRef, useContext } from "react";
import UserContext from "./UserContext";
import CreateBoard from "./CreateBoard";
import CurrentBoard from "./CurrentBoard";
import StartScreen from "./StartScreen";
import VictoryScreen from "./VictoryScreen";
import GameoverScreen from "./GameoverScreen";

import "../styles/App.css";

function App() {
  const { level, setLevel } = useContext(UserContext);
  // const { background, setBackground } = useContext(UserContext);
  const { setNewBoard } = useContext(UserContext);
  const { makeBoard, setMakeBoard } = useContext(UserContext);
  const { actionText } = useContext(UserContext);
  // const { resetBoard, setResetBoard } = useContext(UserContext);
  const subRef = useRef(1);
  subRef.current = level;

  return (
    <div classname="">
      <button
        onClick={() => {
          // let oldBoard = newBoard;
          // oldBoard.splice(2, 1);
          // oldBoard.splice(6, 1);
          // console.log(oldBoard);
          // setNewBoard(oldBoard);
          subRef.current++;
          setLevel(subRef.current);
          setMakeBoard(0);
          setNewBoard([
            "Monster",
            "Monster",
            "Monster",
            "Health",
            "Poison",
            "Shield",
            "Antidote",
          ]);
        }}
      >
        hello
      </button>
      <div className=" mt-24 flex justify-center  text-xl font-bold ">
        <div className="flex flex-col w-72 border-4 border-black">
          <div>
            <img
              src="/images/title.png"
              className="  w-full border-b-2 border-black"
            />
          </div>

          {level === 0 ? (
            <StartScreen />
          ) : level === 10 ? (
            <VictoryScreen />
          ) : level === 12 ? (
            <GameoverScreen />
          ) : makeBoard === 0 ? (
            <CreateBoard />
          ) : (
            <CurrentBoard />
          )}
          <div className=" h-20  bg-yellow-100 border-0  border-black border-t-2 p-2  ">
            <p className="flex-wrap-reverse text-base">{actionText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// <div className="grid grid-cols-3 grid-rows-3 ">
// <div id="1" className="relative ">
//   <img src={background} className="w-24 " />
// </div>
// <div id="2" className="relative">
//   <img src={background} className="w-24 " />
// </div>
// <div id="3" className="relative">
//   <img
//     src="/images/icons/arrow.png"
//     className="w-14 absolute z-10 left-6 top-6"
//   />
//   <img src={background} className="w-24 " />
// </div>
// <div id="4" className="relative">
//   <img src={background} className="w-24 " />
// </div>
// <div id="5" className="relative">
//   <img src={background} className="w-24 " />
// </div>
// <div id="6" className="relative">
//   <img src={background} className="w-24 " />
// </div>
// <div id="7" className="relative">
//   <img src={background} className="w-24 " />
// <img
//   src="/images/icons/main/1.png"
//   className="w-14 absolute z-10 left-6 top-6"
// />
// </div>
// <div id="8" className="relative">
//   <img src={background} className="w-24 " />
// </div>
// <div id="9" className="relative">
//   <img src={background} className="w-24 " />
// </div>
// </div>
