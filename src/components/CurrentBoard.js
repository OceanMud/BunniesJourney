import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";

import levelActionText from "./determineActionText";
import gameLogic from "./gameLogic";
import CurrentBoardDrawn from "./CurrentBoardDrawn";
import { useHotkeys } from "react-hotkeys-hook";

const CurrentBoard = () => {
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);

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

  useHotkeys("w", () => {
    const findHero = newBoard.findIndex((select) => select === "Hero");

    let heroUp = findHero - 3;

    initLogic(newBoard[heroUp], heroUp);
  });

  useHotkeys("s", () => {
    const findHero = newBoard.findIndex((select) => select === "Hero");
    let heroDown = findHero + 3;

    initLogic(newBoard[heroDown], heroDown);
  });

  useHotkeys("d", () => {
    const findHero = newBoard.findIndex((select) => select === "Hero");

    let heroRight = findHero + 1;

    initLogic(newBoard[heroRight], heroRight);
  });

  useHotkeys("a", () => {
    const findHero = newBoard.findIndex((select) => select === "Hero");

    let heroLeft = findHero - 1;

    initLogic(newBoard[heroLeft], heroLeft);
  });

  const initLogic = (tile, index) => {
    if (tile === "Hero") {
      return;
    }

    const update = gameLogic(
      tile,
      index,
      boardRef.current,
      subRef.current,
      level,
      score
    );

    if (!update) {
      return;
    }

    setScore(update[2]);

    if (tile === "Arrow" || tile === "Cave" || tile === "Amulet") {
      setLevel(levelCount + 1);
      setMakeBoard(0);
      setScore(score + 50);
      return;
    }

    subRef.current = update[0];
    boardRef.current = update[3];

    console.log(subRef.current);

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
