import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";
import { monsterShuffle } from "./monsters";
import { monsterShuffle1 } from "./endlessMonsters";
import { packetLogic } from "./packetSelection";
import { determineBackground } from "./determineBackground";

const CreateBoard = () => {
  const { level } = useContext(UserContext);
  const { setBackground } = useContext(UserContext);
  const { hero } = useContext(UserContext);

  const { setEnemy } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { mode } = useContext(UserContext);
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { difficulty } = useContext(UserContext);
  const subRef = useRef([
    "Monster",
    "Monster",
    "Monster",
    "Health",
    "Poison",
    "Shield",
    "Antidote",
  ]);
  subRef.current = newBoard;

  if (mode === "Story") {
    if (level >= 1 && level < 3) {
      setBackground("/images/icons/tile/field.png");
    } else if (level >= 3 && level < 7) {
      setBackground("/images/icons/tile/cave.png");
    } else if (level >= 7 && level < 10) {
      setBackground("/images/icons/tile/hell.png");
    }
  }

  if (mode === "Endless") {
    const update = determineBackground(level);
    try {
      setEnemy(update.enemy);
      setBackground(update.background);
    } catch {}
  }

  useEffect(() => {
    let shuffledTemplate = "";

    if (mode === "Story") {
      monsterShuffle();
      shuffledTemplate = [
        "Monster",
        "Monster",
        "Monster",
        "Health",
        "Poison",
        "Shield",
        "Antidote",
      ];
    }

    if (mode === "Endless") {
      monsterShuffle1();
      const newLevel = packetLogic(level, difficulty);
      shuffledTemplate = newLevel;
    }

    let shuffled = shuffledTemplate
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    if (level === 3) {
      shuffled.splice(2, 0, "Cave");
    } else if (level === 9) {
      if (mode === "Story") {
        shuffled.splice(2, 0, "Amulet");
      }
      if (mode === "Endless") {
        shuffled.splice(2, 0, "Sign");
      }
    } else {
      shuffled.splice(2, 0, "Arrow");
    }

    shuffled.splice(6, 0, "Hero");

    subRef.current = shuffled;
    setNewBoard(subRef.current);

    if (level === 1 && hero === "images/icons/main/1.png") {
      setPlayer({
        hp: 12,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }

    if (level === 1 && hero === "images/icons/main/2.png") {
      setPlayer({
        hp: 8,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }

    if (level === 1 && hero === "images/icons/main/4.png") {
      setPlayer({
        hp: 10,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }

    if (hero === "images/icons/main/3.png") {
      setPlayer({
        hp: 4,
        poisoned: false,
        protected: true,
        color: "text-yellow-200",
      });
    }

    // if (level === 1 && hero === "images/icons/main/3.png") {
    //   setPlayer({
    //     hp: 6,
    //     poisoned: false,
    //     protected: true,
    //     color: "text-yellow-200",
    //   });
    // }

    setMakeBoard(1);
    return () => {};
  }, [level]);

  return <></>;
};

export default CreateBoard;
