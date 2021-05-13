import React, { useContext } from "react";
import UserContext from "./UserContext";

const CurrentBoardDrawn = ({ tile, index, monsterImg }) => {
  const { background } = useContext(UserContext);
  const { hero } = useContext(UserContext);
  const { player } = useContext(UserContext);
  const { level } = useContext(UserContext);
  return (
    <div className="relative border-l  border-b border-r-0 border-black ">
      <img alt="background" src={background} className="w-24 shadow-2xl " />

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
  );
};

export default CurrentBoardDrawn;
