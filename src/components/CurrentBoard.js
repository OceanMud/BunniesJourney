import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";
import { monstersField } from "./monsters";
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

  let monsterImg = monstersField;

  useEffect(() => {
    const actionText = levelActionText(level);
    setActionText(actionText);

    return () => {};
  }, []);

  const initLogic = (tile, index) => {
    if (tile === "Hero") {
      setPlayer({
        hp: subRef.current[0],
        poisoned: subRef.current[1],
        protected: subRef.current[2],
        color: subRef.current[3],
      });
      return;
    }

    if (tile === "Arrow") {
      setLevel(levelCount + 1);
      setMakeBoard(0);
      return;
    }

    const update = gameLogic(tile, index, boardRef.current, subRef.current);

    if (!update) {
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
    <div className="grid grid-cols-3 grid-rows-3 ">
      {boardRef.current.map((tile, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => initLogic(tile, index)}
        >
          <CurrentBoardDrawn
            tile={tile}
            index={index}
            monsterImg={monsterImg}
          />
        </div>
      ))}
    </div>
  );
};

export default CurrentBoard;
