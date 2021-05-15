import React, { useContext } from "react";
import UserContext from "./UserContext";

const InfoScreen = () => {
  const { setHeaderToggles } = useContext(UserContext);
  return (
    <div
      onClick={() => setHeaderToggles({ info: false, leaderboard: false })}
      className="relative"
    >
      <img alt="background" src="images/scoring2.jpg" />
      {/* <div>
        <p className=" absolute  top-12 left-8 "> 5 </p>
        <img
          alt="monster"
          src="images/icons/bosses/9.png"
          className=" absolute w-10 top-20 left-4 inset-0"
        />
        <p className=" absolute  top-20 right-28 "> +50 points </p>
      </div>

      <div>
        <img
          alt="background"
          src="images/icons/tile/field.png"
          className=" absolute w-10 top-32 left-4 inset-0"
        />
        <p className=" absolute bottom-32 left-16 "> -10 points </p>
      </div> */}
    </div>
  );
};

export default InfoScreen;
