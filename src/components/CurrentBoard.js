import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";

import levelActionText from "./determineActionText";
import gameLogic from "./gameLogic";
import CurrentBoardDrawn from "./CurrentBoardDrawn";
import useInitialFocus from "./useInitialFocus";

const CurrentBoard = () => {
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { score, setScore } = useContext(UserContext);

  const boardRef = useRef([]);
  boardRef.current = newBoard;

  const initalFocusRef = useRef(null);
  useInitialFocus(initalFocusRef);

  const subRef = useRef({});
  subRef.current = player;

  let levelCount = level;

  useEffect(() => {
    const actionText = levelActionText(level);
    setActionText(actionText);

    return () => {};
  }, []);

  const handleMovement = (e) => {
    console.log(e.key);
    if (e.key === "w" || e.key === "ArrowUp") {
      const findHero = newBoard.findIndex((select) => select === "Hero");
      let heroUp = findHero - 3;

      initLogic(newBoard[heroUp], heroUp);
    }

    if (e.key === "s" || e.key === "ArrowDown") {
      const findHero = newBoard.findIndex((select) => select === "Hero");

      let heroDown = findHero + 3;

      initLogic(newBoard[heroDown], heroDown);
    }

    if (e.key === "d" || e.key === "ArrowRight") {
      const findHero = newBoard.findIndex((select) => select === "Hero");

      let heroRight = findHero + 1;

      initLogic(newBoard[heroRight], heroRight);
    }

    if (e.key === "a" || e.key === "ArrowLeft") {
      const findHero = newBoard.findIndex((select) => select === "Hero");

      let heroLeft = findHero - 1;

      initLogic(newBoard[heroLeft], heroLeft);
    }
  };

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
    console.log(score);

    if (tile === "Arrow" || tile === "Cave" || tile === "Amulet") {
      setLevel(levelCount + 1);
      setMakeBoard(0);
      setScore(score + 50);
      return;
    }

    subRef.current = update[0];
    boardRef.current = update[3];

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
          ref={initalFocusRef}
          className="cursor-pointer outline-none"
          onClick={() => initLogic(tile, index)}
          onKeyDown={(e) => handleMovement(e)}
          tabIndex="1"
        >
          <CurrentBoardDrawn tile={tile} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CurrentBoard;
