import React, { useContext } from "react";
import UserContext from "./UserContext";
import useSound from "use-sound";

const HerosScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  const { sound } = useContext(UserContext);
  const { setHero } = useContext(UserContext);
  const [playbuttonHover] = useSound("./sounds/buttonhover.mp3", {
    volume: 0.3,
  });
  return (
    <div className="relative">
      <img alt="background" src="images/background.jpg" className="h-72" />
      <img
        alt="title"
        src="images/TitlePick.png"
        className="absolute top-10 left-1 h-14"
      />{" "}
      <div
        className="group "
        onClick={() => {
          setHero("images/icons/main/1.png");
          setHeaderToggles({
            info: false,
            leaderboard: false,
            settings: false,
            heros: false,
          });
        }}
        onMouseEnter={() => {
          if (sound) {
            playbuttonHover();
          }
        }}
      >
        <img
          alt="main"
          src="images/icons/main/1.png"
          className="absolute top-44 left-4 h-16 cursor-pointer "
        />
        <p className=" group-hover:text-yellow-600  text-gray-800 absolute top-36 left-6 h-16 cursor-pointer">
          Max
        </p>
      </div>
      <div
        className="group -space-x-1"
        onClick={() => {
          setHero("images/icons/main/2.png");
          setHeaderToggles({
            info: false,
            leaderboard: false,
            settings: false,
            heros: false,
          });
        }}
        onMouseEnter={() => {
          if (sound) {
            playbuttonHover();
          }
        }}
      >
        <img
          alt="person2"
          src="images/icons/main/2.png"
          className="absolute top-44 left-28 h-16 cursor-pointer"
        />
        <p className=" group-hover:text-yellow-600  text-gray-800 absolute top-36  left-28 h-16 cursor-pointer">
          Bowser
        </p>
      </div>
      <div
        className="group space-x-2"
        onClick={() => {
          setHero("images/icons/main/3.png");
          setHeaderToggles({
            info: false,
            leaderboard: false,
            settings: false,
            heros: false,
          });
        }}
        onMouseEnter={() => {
          if (sound) {
            playbuttonHover();
          }
        }}
      >
        <img
          alt="person3"
          src="images/icons/main/3.png"
          className="absolute top-44 left-52 h-16 cursor-pointer"
        />
        <p className=" group-hover:text-yellow-600  text-gray-800 absolute top-36 left-52 h-16 cursor-pointer">
          Petey
        </p>
      </div>
    </div>
  );
};

export default HerosScreen;
