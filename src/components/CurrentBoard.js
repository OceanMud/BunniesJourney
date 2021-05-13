import React, { useState, useEffect, useContext, useRef } from "react";
import UserContext from "./UserContext";
import { monstersField, monstersCave, monstersHell } from "./monsters";

const CurrentBoard = () => {
  const { newBoard, setNewBoard } = useContext(UserContext);
  const { player, setPlayer } = useContext(UserContext);
  const { level, setLevel } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { setMakeBoard } = useContext(UserContext);
  const { background, setBackground } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const [wrongMove, setWrongMove] = useState(false);
  const [toggle, setToggle] = useState(true);

  const boardRef = useRef([]);
  boardRef.current = newBoard;
  console.log(boardRef.current);
  const subRef = useRef({});
  subRef.current = player;

  let levelCount = level;

  const determineMove = (current, possible) => {
    if (current === 0 && (possible === 1 || possible === 3)) {
      return true;
    }
    if (current === 1 && (possible === 0 || possible === 2 || possible === 4)) {
      return true;
    }

    if (current === 3 && (possible === 0 || possible === 4 || possible === 6)) {
      return true;
    }
    if (
      current === 4 &&
      (possible === 1 || possible === 3 || possible === 5 || possible === 7)
    ) {
      return true;
    }
    if (current === 5 && (possible === 2 || possible === 4 || possible === 8)) {
      return true;
    }
    if (current === 6 && (possible === 3 || possible === 7)) {
      return true;
    }
    if (current === 7 && (possible === 4 || possible === 6 || possible === 8)) {
      return true;
    }
    if (current === 8 && (possible === 7 || possible === 5)) {
      return true;
    }

    return false;
  };

  let monsterImg = monstersField;
  if (level >= 1 && level < 4) {
    setBackground("/images/icons/tile/field.png");
    monsterImg = monstersField;
  } else if (level >= 4 && level < 7) {
    setBackground("/images/icons/tile/cave.png");
    monsterImg = monstersCave;
  } else if (level >= 7 && level < 10) {
    setBackground("/images/icons/tile/hell.png");
    monsterImg = monstersHell;
  }

  useEffect(() => {
    console.log("mounted2");
    console.log(newBoard);

    if (level === 1) {
      setActionText("Every journey starts with the first step");
    } else if (level === 2) {
      setActionText("You cross the field");
    } else if (level === 3) {
      setActionText("You see a cave in the distance!");
    } else if (level === 4) {
      setActionText("You cautiously enter the Cave...");
    } else if (level === 5) {
      setActionText("You go deeper into the Cave");
    } else if (level === 6) {
      setActionText("You start to feel extremely hot");
    } else if (level === 7) {
      setActionText("You have reached the Abyss");
    } else if (level === 8) {
      setActionText("You are deeper than any bunny has gone ");
    } else if (level === 9) {
      setActionText("You see the amulet in the distance!");
    }
    return () => {
      console.log("unmounted2");
    };
  }, []);

  return (
    <div className="grid grid-cols-3 grid-rows-3 ">
      {boardRef.current.map((tile, index) => (
        <div
          key={index}
          className="cursor-pointer"
          onClick={() => {
            const newMove = boardRef.current.findIndex(
              (item, index) => item === "Hero"
            );
            console.log(newMove);
            const tryMove = determineMove(newMove, index);

            if (tryMove) {
              console.log("true");

              if (tile === "") {
                setActionText("You move around a bit");

                if (player.poisoned) {
                  if (player.protected) {
                    subRef.current = [
                      player.hp,
                      player.poisoned,
                      false,
                      "text-green-700",
                    ];
                    setActionText("Poison broke your protection");
                  } else {
                    subRef.current = [
                      player.hp - 1,
                      player.poisoned,
                      false,
                      "text-green-700",
                    ];
                    setActionText("You feel sick");
                  }
                  if (subRef.current[0] <= 0) {
                    setLevel(12);
                  }
                  setPlayer({
                    hp: subRef.current[0],
                    poisoned: subRef.current[1],
                    protected: subRef.current[2],
                    color: subRef.current[3],
                  });
                }

                let move = boardRef.current;
                move.splice(newMove, 1, "");
                move.splice(index, 1, "Hero");
                boardRef.current = move;
                console.log("move", boardRef.current);
                setNewBoard(move);
                console.log("test", boardRef.current[index]);

                if (wrongMove) {
                  setToggle(false);
                  setWrongMove(false);
                } else {
                  setWrongMove(true);
                  setToggle(true);
                }
              }

              if (tile === "Monster") {
                setActionText(`You attack a ${monsterImg[index].name} `);
                let checkPoison = "text-black";

                if (player.protected) {
                  monsterImg[index].attack = 0;
                  setActionText(
                    `You attack a ${monsterImg[index].name}. You feel less Protected `
                  );
                }

                if (player.poisoned) {
                  checkPoison = "text-green-700";
                  monsterImg[index].attack = monsterImg[index].attack + 1;
                  setActionText(
                    `You attack a ${monsterImg[index].name}. You feel sick`
                  );
                }

                setWrongMove(false);
                subRef.current = [
                  player.hp - monsterImg[index].attack,
                  player.poisoned,
                  false,
                  checkPoison,
                ];

                setPlayer({
                  hp: subRef.current[0],
                  poisoned: subRef.current[1],
                  protected: subRef.current[2],
                  color: subRef.current[3],
                });

                if (subRef.current[0] <= 0) {
                  setLevel(12);
                }
                document.getElementById(index).style.visibility = "hidden";
                //   console.log(index);
                let move = boardRef.current;
                move.splice(newMove, 1, "");
                move.splice(index, 1, "Hero");
                boardRef.current = move;
                console.log("monsterKill", boardRef.current);
                setNewBoard(move);
              }

              if (tile === "Health") {
                setActionText("You feel healthy");

                if (player.poisoned) {
                  subRef.current = [
                    9,
                    player.poisoned,
                    player.protected,
                    player.color,
                  ];
                  setActionText("You Feel healthy. You feel sick");
                } else {
                  subRef.current = [
                    10,
                    player.poisoned,
                    player.protected,
                    player.color,
                  ];
                }

                setWrongMove(false);

                setPlayer({
                  hp: subRef.current[0],
                  poisoned: subRef.current[1],
                  protected: subRef.current[2],
                  color: subRef.current[3],
                });

                document.getElementById(index).style.visibility = "hidden";
                //   console.log(index);
                let move = boardRef.current;
                move.splice(newMove, 1, "");
                move.splice(index, 1, "Hero");
                boardRef.current = move;
                console.log("monsterKill", boardRef.current);
                setNewBoard(move);
              }

              if (tile === "Antidote") {
                setActionText("You are cured");
                setWrongMove(false);
                let checkProtected = player.protected;

                if (checkProtected) {
                  checkProtected = "text-yellow-200";
                } else {
                  checkProtected = "text-black";
                }

                subRef.current = [
                  player.hp,
                  false,
                  player.protected,
                  checkProtected,
                ];
                setPlayer({
                  hp: subRef.current[0],
                  poisoned: subRef.current[1],
                  protected: subRef.current[2],
                  color: subRef.current[3],
                });

                console.log("test2", subRef.current);

                document.getElementById(index).style.visibility = "hidden";
                //   console.log(index);
                let move = boardRef.current;
                move.splice(newMove, 1, "");
                move.splice(index, 1, "Hero");
                boardRef.current = move;
                console.log("Antidoted", boardRef.current);
                setNewBoard(move);
              }

              if (tile === "Poison") {
                setActionText("You feel sick");

                if (player.protected) {
                  subRef.current = [player.hp, true, false, "text-green-700"];
                  setActionText("You feel sick. You feel less protected");
                } else {
                  subRef.current = [
                    player.hp - 1,
                    true,
                    false,
                    "text-green-700",
                  ];
                }

                if (subRef.current[0] <= 0) {
                  setLevel(12);
                }

                setWrongMove(false);

                setPlayer({
                  hp: subRef.current[0],
                  poisoned: subRef.current[1],
                  protected: subRef.current[2],
                  color: subRef.current[3],
                });

                console.log("test2", subRef.current);

                document.getElementById(index).style.visibility = "hidden";
                //   console.log(index);
                let move = boardRef.current;
                move.splice(newMove, 1, "");
                move.splice(index, 1, "Hero");
                boardRef.current = move;
                console.log("poisoned", boardRef.current);
                setNewBoard(move);
              }

              if (tile === "Shield") {
                setActionText("You feel protected");
                setWrongMove(false);
                let checkPoison = "text-yellow-200";
                let checkProtection = true;

                if (player.poisoned) {
                  checkPoison = "text-green-700";
                  checkProtection = false;
                  setActionText(
                    "You feel protected. Poison broke your protection"
                  );
                }

                subRef.current = [
                  player.hp,
                  player.poisoned,
                  checkProtection,
                  checkPoison,
                ];

                setPlayer({
                  hp: subRef.current[0],
                  poisoned: subRef.current[1],
                  protected: subRef.current[2],
                  color: subRef.current[3],
                });

                document.getElementById(index).style.visibility = "hidden";
                //   console.log(index);
                let move = boardRef.current;
                move.splice(newMove, 1, "");
                move.splice(index, 1, "Hero");
                boardRef.current = move;
                console.log("protected", boardRef.current);
                setNewBoard(move);
              }

              if (tile === "Arrow") {
                setLevel(levelCount + 1);
                setMakeBoard(0);

                document.getElementById(index).style.visibility = "hidden";
                //   console.log(index);
                let move = boardRef.current;
                move.splice(newMove, 1, "");
                move.splice(index, 1, "Hero");
                boardRef.current = move;
                console.log("Arrow", boardRef.current);
                setNewBoard(move);

                if (wrongMove) {
                  setToggle(false);
                  setWrongMove(false);
                } else {
                  setWrongMove(true);
                  setToggle(true);
                }
              }
            }
          }}
        >
          {console.log("test")}
          <div className="relative border-l  border-b border-r-0 border-black ">
            <img
              alt="background"
              src={background}
              className="w-24 shadow-2xl "
            />

            {((wrongMove && tile === "Hero") ||
              (toggle === true && tile === "Hero")) && (
              <div id={index}>
                <img
                  alt="Hero"
                  src={hero}
                  className=" w-14 absolute z-30 shadow-2xl left-6 top-6 "
                />
                <p
                  className={`w-14 shadow-2xl absolute z-30 left-10 top-0 ${player.color}  `}
                >
                  {player.hp}
                </p>
              </div>
            )}

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

// {tile === "" && boardRef.current[index] === "Hero" && (
//     <div>
//       <img
//         alt="Hero"
//         src="/images/icons/main/1.png"
//         className=" w-14 absolute z-30 left-6 top-6"
//       />
//       <p
//         className={`w-14 absolute z-30 left-10 top-0 ${player.color} `}
//       >
//         {player.hp}
//       </p>
//     </div>
//   )}
