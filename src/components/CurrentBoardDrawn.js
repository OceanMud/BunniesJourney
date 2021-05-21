import React, { useEffect, useContext } from "react";
import UserContext from "./UserContext";
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

import currentBoardDrawnImages from "./currentBoardDrawnImages";

const CurrentBoardDrawn = ({ tile, index }) => {
  const { background } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const { player } = useContext(UserContext);
  const { enemy } = useContext(UserContext);
  const { mode } = useContext(UserContext);
  const { level } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);

  let drawEnemy = monstersField;

  if (mode === "Story") {
    if (level >= 1 && level < 3) {
      drawEnemy = monstersField;
    } else if (level >= 3 && level < 7) {
      drawEnemy = monstersCave;
    } else if (level >= 7 && level < 10) {
      drawEnemy = monstersAbyss;
    }
  }

  if (mode === "Endless") {
    if (enemy === "Cave") {
      drawEnemy = endlessMonstersCave;
    }

    if (enemy === "CrystalCave") {
      drawEnemy = endlessMonstersCrystalsCave;
    }
    if (enemy === "Field") {
      drawEnemy = endlessMonstersField;
    }
    if (enemy === "Abyss") {
      drawEnemy = endlessMonstersAbyss;
    }
    if (enemy === "IceCave") {
      drawEnemy = endlessMonstersIceCave;
    }
    if (enemy === "Ruin") {
      drawEnemy = endlessMonstersRuin;
    }
    if (enemy === "Tundra") {
      drawEnemy = endlessMonstersTundra;
    }
  }

  useEffect(() => {
    return () => {};
  }, []);

  const actionLogic = (tile) => {
    if (tile === "Hero") {
      setActionText("The Hero! ");
    }

    if (tile === "Monster") {
      setActionText("Attack at your own risk");
    }

    if (tile === "Antidote") {
      setActionText("Cures poison with antidote  ");
    }

    if (tile === "Poison") {
      setActionText("1 dmg every move while poisoned");
    }

    if (tile === "Shield") {
      setActionText("Shields the first damage taken");
    }

    if (tile === "Health") {
      setActionText("Brings you back to full health");
    }

    if (tile === "Arrow" || tile === "Cave" || tile === "Amulet") {
      setActionText("The Exit!");
    }
  };

  const image = currentBoardDrawnImages.find((select) => select.tile === tile);

  return (
    <div
      onMouseEnter={() => actionLogic(tile)}
      className="relative border-l  border-b border-r-0 border-black "
    >
      <img alt="background" src={background} className="w-24 shadow-2xl " />

      {image.tile === "Hero" && (
        <div>
          <img
            alt={currentBoardDrawnImages[0].alt}
            src={eval(currentBoardDrawnImages[0].src)}
            className=" w-14 absolute z-30 shadow-2xl left-6 top-6"
          />
          <p
            className={`w-14 absolute z-30 left-10 shadow-2xl top-0 ${player.color}  `}
          >
            {player.hp}
          </p>
        </div>
      )}

      {tile === image.tile && (
        <div id={index}>
          {image.src.length > 0 && (
            <img
              alt={image.alt}
              src={!image.special ? image.src : eval(image.src)}
              className=" w-14 absolute z-30 shadow-2xl left-6 top-6"
            />
          )}

          {image.tile === "Monster" ? (
            <p className="w-14 absolute z-10 shadow-2xl left-11 top-0 ">
              {drawEnemy[index].attack}
            </p>
          ) : undefined}
        </div>
      )}
    </div>
  );
};

export default CurrentBoardDrawn;
