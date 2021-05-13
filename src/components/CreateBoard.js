import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";
import {
  monstersField,
  monsterShuffle,
  monstersCave,
  monstersHell,
} from "./monsters";

const CreateBoard = () => {
  const { level } = useContext(UserContext);
  const { setBackground } = useContext(UserContext);
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);

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
  //   const { resetBoard, setResetBoard } = useContext(UserContext);
  let monsterImg = monstersField;
  if (level >= 1 && level < 3) {
    setBackground("/images/icons/tile/field.png");
    monsterImg = monstersField;
  } else if (level >= 3 && level < 7) {
    setBackground("/images/icons/tile/cave.png");
    monsterImg = monstersCave;
  } else if (level >= 7 && level < 10) {
    setBackground("/images/icons/tile/hell.png");
    monsterImg = monstersHell;
  }

  useEffect(() => {
    monsterShuffle();

    let shuffled = [
      "Monster",
      "Monster",
      "Monster",
      "Health",
      "Poison",
      "Shield",
      "Antidote",
    ]
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    shuffled.splice(2, 0, "Arrow");
    shuffled.splice(6, 0, "Hero");

    subRef.current = shuffled;
    setNewBoard(subRef.current);

    setMakeBoard(1);
    return () => {};
  }, [level]);

  return <></>;
};

export default CreateBoard;
