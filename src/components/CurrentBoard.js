import React, { useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";
import { monstersField } from "./monsters";
import levelActionText from "./determineActionText";
import gameLogic from "./gameLogic";

const CurrentBoard = () => {
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { background } = useContext(UserContext);
  const { hero } = useContext(UserContext);

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
          <div className="relative border-l  border-b border-r-0 border-black ">
            <img
              alt="background"
              src={background}
              className="w-24 shadow-2xl "
            />

            {tile === "Hero" && (
              <div id={index}>
                <img
                  alt="Hero"
                  src={hero}
                  className=" w-14 absolute z-30 shadow-2xl left-6 top-6"
                />
                <p
                  className={`w-14 absolute z-30 left-10 shadow-2xl top-0 ${player.color}  `}
                >
                  {player.hp}
                </p>
              </div>
            )}
            {tile === "Arrow" && (
              <div id={index}>
                <img
                  alt="progress"
                  src={
                    level === 3
                      ? "/images/icons/cave.png"
                      : level === 9
                      ? "/images/icons/amulet.png"
                      : "/images/icons/arrow.png"
                  }
                  className="w-14 shadow-2xl absolute z-10 left-6 top-6"
                />
              </div>
            )}
            {tile === "Monster" && (
              <div id={index}>
                <img
                  alt="Monster"
                  src={monsterImg[index].img}
                  className="w-14 shadow-2xl absolute z-10 left-6 top-6"
                />
                <p className="w-14 absolute z-10 shadow-2xl left-11 top-0 ">
                  {monsterImg[index].attack}
                </p>
              </div>
            )}
            {tile === "Health" && (
              <div id={index}>
                <img
                  alt="HP Potion"
                  src="/images/icons/potions/Transperent/HealthPotion.png"
                  className="w-14 shadow-2xl absolute z-10 left-6 top-6"
                />
              </div>
            )}
            {tile === "Antidote" && (
              <div id={index}>
                <img
                  alt="Anti-Poison Potion"
                  src="/images/icons/potions/Transperent/AntidotePotion.png"
                  className="w-14 shadow-2xl absolute z-10 left-6 top-6"
                />
              </div>
            )}
            {tile === "Poison" && (
              <div id={index}>
                <img
                  alt="Poison Potion"
                  src="/images/icons/potions/Transperent/PoisonPotion.png"
                  className="w-14 shadow-2xl absolute z-10 left-6 top-6"
                />
              </div>
            )}
            {tile === "Shield" && (
              <div id={index}>
                <img
                  alt="Shield Potion"
                  src="/images/icons/potions/Transperent/ProtectionPotion.png"
                  className="w-14 shadow-2xl absolute z-10 left-6 top-6"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CurrentBoard;
