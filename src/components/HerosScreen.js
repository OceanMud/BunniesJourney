import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const HerosScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  const { setActionText } = useContext(UserContext);
  const { sound } = useContext(UserContext);
  const { hero, setHero } = useContext(UserContext);
  const [newHero, setNewHero] = useState(1);
  const [playbuttonHover] = useSound("./sounds/buttonhover.mp3", {
    volume: 0.3,
  });

  useEffect(() => {
    if (hero === "images/icons/main/2.png") {
      setNewHero(2);
    }
    if (hero === "images/icons/main/3.png") {
      setNewHero(3);
    }
  }, []);

  const heroLogic = (direction) => {
    if (newHero === 1 && direction === "Forward") {
      setActionText("Bowser pushes past any obstacle!");
      setNewHero(2);
    } else if (newHero === 1 && direction === "Backward") {
      setActionText("Andy loves a nice cocktail!");
      setNewHero(4);
    } else if (newHero === 2 && direction === "Forward") {
      setActionText("Petey is all about safety!");
      setNewHero(3);
    } else if (newHero === 2 && direction === "Backward") {
      setActionText("Max is the worlds bravest bunny!");
      setNewHero(1);
    } else if (newHero === 3 && direction === "Forward") {
      setActionText("Andy loves a nice cocktail!");
      setNewHero(4);
    } else if (newHero === 3 && direction === "Backward") {
      setActionText("Bowser pushes past any obstacle!");
      setNewHero(2);
    } else if (newHero === 4 && direction === "Backward") {
      setActionText("Petey is all about safety!");
      setNewHero(3);
    } else if (newHero === 4 && direction === "Forward") {
      setActionText("Max is the worlds bravest bunny!");
      setNewHero(1);
    }
  };
  return (
    <div className="relative ">
      <img alt="background" src="images/background.jpg" className="h-72" />
      <div className="absolute top-2 left-7 ">
        <div className=" h-48 w-56  text-lg  border-gray-800 bg-gray-200 bg-opacity-60 text-center text-gray-900 border-double shadow-2xl  border-8 space-y-1">
          {newHero === 1 ? (
            <p>Max </p>
          ) : newHero === 2 ? (
            <p>Bowser</p>
          ) : newHero === 3 ? (
            <p>Petey</p>
          ) : (
            <p>Farmer Andy</p>
          )}
          {newHero === 1 ? (
            <p>HP: 12</p>
          ) : newHero === 2 ? (
            <p>HP: 8</p>
          ) : newHero === 3 ? (
            <p>HP: 4</p>
          ) : (
            <p>HP: 10</p>
          )}

          {newHero === 1 ? (
            <p> Is A Cute Bunny</p>
          ) : newHero === 2 ? (
            <p>
              <span className="text-green-700">Poison Immunity</span>
            </p>
          ) : newHero === 3 ? (
            <p>
              <span className="text-yellow-600">
                Refreshes With Shield Every Level
              </span>
            </p>
          ) : (
            <p>
              <span className="text-pink-600">Antidotes also fully heal</span>
            </p>
          )}
          <p></p>
          <img
            alt="left arrow"
            src="images/leftarrow.svg"
            className="absolute bottom-1 hover:-translate-x-2 transform transition ease-in-out  left-2 h-16  cursor-pointer"
            onMouseEnter={() => {
              if (sound) {
                playbuttonHover();
              }
            }}
            onClick={() => heroLogic("Backward")}
          />

          <img
            alt="right arrow"
            src="images/rightarrow.svg"
            className="absolute bottom-1 left-36 h-16  hover:opacity-100  hover:translate-x-2 transform transition ease-in-out cursor-pointer"
            onMouseEnter={() => {
              if (sound) {
                playbuttonHover();
              }
            }}
            onClick={() => heroLogic("Forward")}
          />
        </div>

        <button
          onMouseEnter={() => {
            if (sound) {
              playbuttonHover();
            }
          }}
          onClick={() => {
            setHero(`images/icons/main/${newHero}.png`);
            setHeaderToggles({
              info: false,
              leaderboard: false,
              settings: false,
              heros: false,
              credits: false,
            });
          }}
          class="focus:outline-none shadow-2xl w-full bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-10  border-2 absolute border-green-700 rounded mt-6 hover:border-green-900 "
        >
          <img
            alt="checkmark"
            className=" opacity-80 ml-12 h-10 "
            src="images/check.svg"
          />
        </button>
      </div>

      <img
        alt="person2"
        src={
          newHero === 1
            ? "images/icons/main/1.png"
            : newHero === 2
            ? "images/icons/main/2.png"
            : newHero === 3
            ? "images/icons/main/3.png"
            : "images/icons/main/4.png"
        }
        className="absolute top-32 right-28 h-16"
      />

      <div
        className="group -space-x-1"
        onClick={() => {
          setHero("images/icons/main/2.png");
          setHeaderToggles({
            info: false,
            leaderboard: false,
            settings: false,
            heros: false,
            credits: false,
          });
        }}
      ></div>
    </div>
  );
};

export default HerosScreen;
