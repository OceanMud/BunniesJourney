import React, { useEffect, useContext } from "react";
import UserContext from "./UserContext";
import { monstersField, monstersCave, monstersHell } from "./monsters";

import currentBoardDrawnImages from "./currentBoardDrawnImages";

const CurrentBoardDrawn = ({ tile, index }) => {
  const { background } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const { player } = useContext(UserContext);
  const { level } = useContext(UserContext);

  let enemy = monstersField;

  if (level >= 1 && level < 3) {
    enemy = monstersField;
  } else if (level >= 3 && level < 7) {
    enemy = monstersCave;
  } else if (level >= 7 && level < 10) {
    enemy = monstersHell;
  }

  useEffect(() => {
    return () => {};
  });

  const image = currentBoardDrawnImages.find((select) => select.tile === tile);

  return (
    <div className="relative border-l  border-b border-r-0 border-black ">
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
              src={image.src.length > 20 ? image.src : eval(image.src)}
              className=" w-14 absolute z-30 shadow-2xl left-6 top-6"
            />
          )}

          {image.tile === "Monster" ? (
            <p className="w-14 absolute z-10 shadow-2xl left-11 top-0 ">
              {enemy[index].attack}
            </p>
          ) : undefined}
        </div>
      )}
    </div>
  );
};

export default CurrentBoardDrawn;
