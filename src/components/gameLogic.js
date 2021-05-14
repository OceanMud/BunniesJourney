import determineMove from "./determineMove";
import { monstersField, monstersCave, monstersHell } from "./monsters";

const checkStatus = (tile, player, index, level, score) => {
  let monsterImg = "";
  let updatePlayer = player;
  let text = "";
  let newScore = score;
  if (level >= 1 && level < 3) {
    monsterImg = monstersField;
  } else if (level >= 3 && level < 7) {
    monsterImg = monstersCave;
  } else if (level >= 7 && level < 10) {
    monsterImg = monstersHell;
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
      updatePlayer = [9, player.poisoned, player.protected, player.color];
    } else {
      updatePlayer = [10, player.poisoned, player.protected, player.color];
    }

    document.getElementById(index).style.visibility = "hidden";
  }

  if (tile === "Antidote") {
    text = "You are cured";

    let checkProtected = player.protected;

    if (checkProtected) {
      checkProtected = "text-yellow-200";
    } else {
      checkProtected = "text-black";
    }

    updatePlayer = [player.hp, false, player.protected, checkProtected];

    document.getElementById(index).style.visibility = "hidden";
  }

  if (tile === "Poison") {
    text = "You feel sick";

    if (player.protected) {
      updatePlayer = [player.hp, true, false, "text-green-700"];
      text = "You feel sick. You feel less protected";
    } else {
      updatePlayer = [player.hp - 1, true, false, "text-green-700"];
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

  return [updatePlayer, text, newScore];
};

const gameLogic = (tile, index, boardRef, player, level, score) => {
  const newMove = boardRef.findIndex((item) => item === "Hero");
  const validMove = determineMove(newMove, index);

  if (!validMove) {
    return false;
  }

  if (validMove) {
    const update = checkStatus(tile, player, index, level, score);

    let move = boardRef;
    move.splice(newMove, 1, "");
    move.splice(index, 1, "Hero");
    boardRef = move;
    // console.log("move", boardRef);
    // console.log("test", boardRef[index]);

    return [...update, boardRef];
  }
};

export default gameLogic;
