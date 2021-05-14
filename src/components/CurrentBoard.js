import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";

import levelActionText from "./determineActionText";
import gameLogic from "./gameLogic";
import CurrentBoardDrawn from "./CurrentBoardDrawn";

const CurrentBoard = () => {
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);

  const boardRef = useRef([]);
  boardRef.current = newBoard;

  const subRef = useRef({});
  subRef.current = player;

  let levelCount = level;

  useEffect(() => {
    const actionText = levelActionText(level);
    setActionText(actionText);

    return () => {};
  }, []);

  const initLogic = (tile, index) => {
    if (tile === "Hero") {
      return;
    }

    const update = gameLogic(
      tile,
      index,
      boardRef.current,
      subRef.current,
      level
    );

    if (!update) {
      return;
    }

    if (tile === "Arrow" || tile === "Cave" || tile === "Amulet") {
      setLevel(levelCount + 1);
      setMakeBoard(0);
      return;
    }

    subRef.current = update[0];
    boardRef.current = update[2];

    setPlayer({
      hp: subRef.current[0],
      poisoned: subRef.current[1],
      protected: subRef.current[2],
      color: subRef.current[3],
    });

    if (subRef.current[0] <= 0) {
      setLevel(12);
    }

    setActionText(update[1]);
    setNewBoard(boardRef.current);
  };

  return (
    <div className=" grid grid-cols-3 grid-rows-3 ">
      {boardRef.current.map((tile, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => initLogic(tile, index)}
        >
          <CurrentBoardDrawn tile={tile} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CurrentBoard;
