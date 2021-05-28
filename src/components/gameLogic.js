import determineMove from "./determineMove";
import { monstersField, monstersCave, monstersAbyss } from "./monsters";
import {
  endlessMonstersCave,
  endlessMonstersCrystalsCave,
  endlessMonstersField,
  endlessMonstersAbyss,
  endlessMonstersIceCave,
  endlessMonstersRuin,
  endlessMonstersTundra,
} from "./endlessMonsters";

const checkStatus = (
  tile,
  player,
  index,
  level,
  score,
  mode,
  enemy,
  hero,
  potionStorage
) => {
  let monsterImg = "";
  let updatePlayer = player;
  let text = "";
  let newScore = score;
  let antidoteStorage = potionStorage;

  if (mode === "Story") {
    if (level >= 1 && level < 3) {
      monsterImg = monstersField;
    } else if (level >= 3 && level < 7) {
      monsterImg = monstersCave;
    } else if (level >= 7 && level < 10) {
      monsterImg = monstersAbyss;
    }
  }

  if (mode === "Endless") {
    if (enemy === "Cave") {
      monsterImg = endlessMonstersCave;
    }

    if (enemy === "CrystalCave") {
      monsterImg = endlessMonstersCrystalsCave;
    }
    if (enemy === "Field") {
      monsterImg = endlessMonstersField;
    }
    if (enemy === "Abyss") {
      monsterImg = endlessMonstersAbyss;
    }
    if (enemy === "IceCave") {
      monsterImg = endlessMonstersIceCave;
    }
    if (enemy === "Ruin") {
      monsterImg = endlessMonstersRuin;
    }
    if (enemy === "Tundra") {
      monsterImg = endlessMonstersTundra;
    }
  }

  if (tile === "Monster") {
    newScore = newScore + monsterImg[index].attack * 10;
    text = `You attack a ${monsterImg[index].name} `;
    let checkPoison = "text-black";
    let monsterDmg = 0;

    if (player.protected) {
      monsterDmg = monsterImg[index].attack;
      text = `You attack a ${monsterImg[index].name}. You feel less Protected `;
    }

    if (player.poisoned) {
      checkPoison = "text-green-700";
      monsterImg[index].attack = monsterImg[index].attack + 1;
      text = `You attack a ${monsterImg[index].name}. You feel sick`;
    }

    updatePlayer = [
      player.hp - (monsterImg[index].attack - monsterDmg),
      player.poisoned,
      false,
      checkPoison,
    ];

    document.getElementById(index).style.visibility = "hidden";
  }

  if (tile === "") {
    text = "You move around a bit";
    let checkProtected = player.protected;
    newScore = newScore - 10;

    if (checkProtected) {
      checkProtected = "text-yellow-200";
    } else {
      checkProtected = "text-black";
    }

    updatePlayer = [
      player.hp,
      player.poisoned,
      player.protected,
      checkProtected,
    ];
    if (player.poisoned) {
      updatePlayer = [player.hp - 1, player.poisoned, false, "text-green-700"];
      text = "You feel sick";
    }
  }

  if (tile === "Health") {
    text = "You feel healthy";

    if (player.poisoned) {
      if (hero === "images/icons/main/1.png") {
        updatePlayer = [11, player.poisoned, player.protected, player.color];
      }
      if (hero === "images/icons/main/3.png") {
        updatePlayer = [3, player.poisoned, player.protected, player.color];
      }
      if (hero === "images/icons/main/4.png") {
        updatePlayer = [9, player.poisoned, player.protected, player.color];
      }
    } else {
      if (hero === "images/icons/main/1.png") {
        updatePlayer = [12, player.poisoned, player.protected, player.color];
      }
      if (hero === "images/icons/main/2.png") {
        updatePlayer = [8, player.poisoned, player.protected, player.color];
      }
      if (hero === "images/icons/main/3.png") {
        updatePlayer = [4, player.poisoned, player.protected, player.color];
      }
      if (hero === "images/icons/main/4.png") {
        updatePlayer = [10, player.poisoned, player.protected, player.color];
      }
    }

    document.getElementById(index).style.visibility = "hidden";
  }

  if (tile === "Antidote") {
    text = "The Antidote had no effect";
    if (hero !== "images/icons/main/2.png") {
      if (player.poisoned) {
        text = "You are cured";
      }
    }
    let checkProtected = player.protected;

    if (checkProtected) {
      checkProtected = "text-yellow-200";
    } else {
      checkProtected = "text-black";
    }

    updatePlayer = [player.hp, false, player.protected, checkProtected];

    // if (hero === "images/icons/main/4.png") {
    //   if (player.poisoned) {
    //     text = text + ". You feel protected. You are fully healed";
    //     updatePlayer = [10, false, true, "text-yellow-200"];
    //   }
    // }

    if (hero === "images/icons/main/4.png") {
      if (!potionStorage) {
        if (!player.poisoned) {
          text = "You decide to save the Antidote for later";
          updatePlayer = [player.hp, false, player.protected, player.color];
          antidoteStorage = true;
        }
      } else {
        text = "You already have Antidote stored";
      }
    }

    document.getElementById(index).style.visibility = "hidden";
  }

  if (tile === "Poison") {
    if (hero !== "images/icons/main/4.png") {
      text = "This Poison tastes pretty good!";
      updatePlayer = [player.hp, false, player.protected, player.color];
      if (hero !== "images/icons/main/2.png") {
        text = "You feel sick";

        if (player.protected) {
          updatePlayer = [player.hp, true, false, "text-green-700"];
          text = "You feel sick. You feel less protected";
        } else {
          updatePlayer = [player.hp - 1, true, false, "text-green-700"];
        }
      }
    }

    if (hero === "images/icons/main/4.png") {
      if (!antidoteStorage) {
        text = "You feel sick";
        if (player.protected) {
          updatePlayer = [player.hp, true, false, "text-green-700"];
          text = text + ". You feel less protected";
        } else {
          updatePlayer = [player.hp - 1, true, false, "text-green-700"];
        }
      } else {
        text = "You use your saved Antidote.";
        antidoteStorage = false;
        updatePlayer = [player.hp, false, player.protected, player.color];
      }
    }

    document.getElementById(index).style.visibility = "hidden";
  }

  if (tile === "Shield") {
    text = "You feel protected";

    let checkPoison = "text-yellow-200";
    let checkProtection = true;

    if (player.poisoned) {
      checkPoison = "text-green-700";
      checkProtection = false;
      text = "You feel protected. Poison broke your protection";
    }

    updatePlayer = [player.hp, player.poisoned, checkProtection, checkPoison];

    document.getElementById(index).style.visibility = "hidden";
  }

  return [updatePlayer, text, newScore, antidoteStorage];
};

const gameLogic = (
  tile,
  index,
  boardRef,
  player,
  level,
  score,
  mode,
  enemy,
  hero,
  potionStorage
) => {
  const newMove = boardRef.findIndex((item) => item === "Hero");
  const validMove = determineMove(newMove, index);

  if (!validMove) {
    return false;
  }

  if (validMove) {
    const update = checkStatus(
      tile,
      player,
      index,
      level,
      score,
      mode,
      enemy,
      hero,
      potionStorage
    );

    let move = boardRef;
    move.splice(newMove, 1, "");
    move.splice(index, 1, "Hero");
    boardRef = move;

    // console.log([...update, boardRef]);
    return [...update, boardRef];
  }
};

export default gameLogic;
