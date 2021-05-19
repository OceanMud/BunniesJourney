import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

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
  const { sound } = useContext(UserContext);
  const [playGulp] = useSound("./sounds/gulp.mp3", { volume: 0.5 });
  const [playWeapon] = useSound(`./sounds/weapon1.mp3`, { volume: 0.2 });
  const [playWeapon2] = useSound(`./sounds/weapon2.mp3`, { volume: 0.2 });
  const [playWeapon3] = useSound(`./sounds/weapon3.mp3`, { volume: 0.2 });
  const [playWeapon4] = useSound(`./sounds/weapon4.mp3`, { volume: 0.2 });
  const [playLevelComplete] = useSound(`./sounds/levelcomplete.mp3`, {
    volume: 0.2,
  });
  const [playGameOver] = useSound("/sounds/lose.mp3", {
    volume: 0.2,
  });
  const [playWin] = useSound(`./sounds/win.mp3`, {
    volume: 0.2,
  });

  const boardRef = useRef([]);
  boardRef.current = newBoard;

  const initalFocusRef = useRef(null);
  useInitialFocus(initalFocusRef);

  const subRef = useRef({});
  subRef.current = player;

  let levelCount = level;

  useEffect(() => {
    const actionText = levelActionText(level);

    setTimeout(() => {
      setActionText(actionText);
    }, 300);

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

    if (sound) {
      if (
        tile === "Health" ||
        tile === "Poison" ||
        tile === "Antidote" ||
        tile === "Shield"
      ) {
        playGulp();
      }

      if (tile === "Arrow" || tile === "Cave") {
        playLevelComplete();
      }

      if (tile === "Amulet") {
        playWin();
      }

      if (tile === "Monster") {
        const rWeapon = Math.floor(Math.random() * 4) + 1;

        if (rWeapon === 1) {
          playWeapon();
        } else if (rWeapon === 2) {
          playWeapon2();
        } else if (rWeapon === 3) {
          playWeapon3();
        } else if (rWeapon === 4) {
          playWeapon4();
        }
      }
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
      playGameOver();
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
