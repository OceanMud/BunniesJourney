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
    </div>
  );
};

export default InfoScreen;
