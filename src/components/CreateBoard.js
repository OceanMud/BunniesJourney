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
  const { background, setBackground } = useContext(UserContext);
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const { player } = useContext(UserContext);

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
    console.log("Level:", level);
    monsterShuffle();

    console.log("mounted");

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
    console.log(subRef.current);
    setMakeBoard(1);
    return () => {
      console.log("unmounted");
    };
  }, [level]);

  return (
    <div className="grid grid-cols-3 grid-rows-3 ">
      {newBoard.map((tile, index) => (
        <div key={index} className="cursor-pointer">
          <div id={index} className="relative border border-black ">
            <img alt="background" src={background} className="w-24 " />
            {tile === "Hero" && (
              <>
                <img
                  alt="Hero"
                  src={hero}
                  className="w-14 absolute z-10 left-6 top-6"
                />
                <p
                  className={`w-14 absolute z-10 left-10 top-0 ${player.color} `}
                >
                  {player.hp}
                </p>
              </>
            )}
            {tile === "Arrow" && (
              <img
                alt="progress"
                src="/images/icons/arrow.png"
                className="w-14 absolute z-10 left-6 top-6"
              />
            )}
            {tile === "Monster" && (
              <>
                <img
                  alt="Monster"
                  src={monsterImg[index].img}
                  className="w-14 absolute z-10 left-6 top-6"
                />
                <p className="w-14 absolute z-10 left-11 top-0 ">
                  {monsterImg[index].attack}
                </p>
              </>
            )}
            {tile === "Health" && (
              <img
                alt="HP Potion"
                src="/images/icons/potions/Transperent/HealthPotion.png"
                className="w-14 absolute z-10 left-6 top-6"
              />
            )}
            {tile === "Antidote" && (
              <img
                alt="Anti-Poison Potion"
                src="/images/icons/potions/Transperent/AntidotePotion.png"
                className="w-14 absolute z-10 left-6 top-6"
              />
            )}
            {tile === "Poison" && (
              <img
                alt="Poison Potion"
                src="/images/icons/potions/Transperent/PoisonPotion.png"
                className="w-14 absolute z-10 left-6 top-6"
              />
            )}
            {tile === "Shield" && (
              <img
                alt="Shield Potion"
                src="/images/icons/potions/Transperent/ProtectionPotion.png"
                className="w-14 absolute z-10 left-6 top-6"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateBoard;
