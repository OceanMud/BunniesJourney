import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";
import { monsterShuffle } from "./monsters";

const CreateBoard = () => {
  const { level } = useContext(UserContext);
  const { setBackground } = useContext(UserContext);
  const { setPlayer } = useContext(UserContext);
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

  if (level >= 1 && level < 3) {
    setBackground("/images/icons/tile/field.png");
  } else if (level >= 3 && level < 7) {
    setBackground("/images/icons/tile/cave.png");
  } else if (level >= 7 && level < 10) {
    setBackground("/images/icons/tile/hell.png");
  }

  useEffect(() => {
    monsterShuffle();

    let shuffledTemplate = "";

    if (difficulty === "easy") {
      shuffledTemplate = [
        "Monster",
        "Monster",
        "Monster",
        "Health",
        "Poison",
        "Shield",
        "Antidote",
      ];
    } else if (difficulty === "medium") {
      shuffledTemplate = [
        "Monster",
        "Monster",
        "Monster",
        "Health",
        "Poison",
        "Shield",
        "Monster",
      ];
    }
    if (difficulty === "hard") {
      shuffledTemplate = [
        "Monster",
        "Monster",
        "Monster",
        "Health",
        "Monster",
        "Shield",
        "Monster",
      ];
    }

    let shuffled = shuffledTemplate
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    if (level === 3) {
      shuffled.splice(2, 0, "Cave");
    } else if (level === 9) {
      shuffled.splice(2, 0, "Amulet");
    } else {
      shuffled.splice(2, 0, "Arrow");
    }

    shuffled.splice(6, 0, "Hero");

    subRef.current = shuffled;
    setNewBoard(subRef.current);

    if (level === 1) {
      setPlayer({
        hp: 10,
        poisoned: false,
        protected: false,
        color: "text-black",
      });
    }

    setMakeBoard(1);
    return () => {};
  }, [level]);

  return <></>;
};

export default CreateBoard;
