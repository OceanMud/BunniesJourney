import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import UserContext from "./components/UserContext";

const Context = () => {
  const [level, setLevel] = useState(0);
  const [background, setBackground] = useState("");
  const [newBoard, setNewBoard] = useState([
    "Monster",
    "Monster",
    "Monster",
    "Health",
    "Poison",
    "Shield",
    "Antidote",
  ]);
  const [makeBoard, setMakeBoard] = useState(0);
  const [actionText, setActionText] = useState("");
  const [hero, setHero] = useState("images/icons/main/1.png");
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const [headerToggles, setHeaderToggles] = useState({
    info: false,
    leaderboard: false,
    settings: false,
    heros: false,
  });
  const [player, setPlayer] = useState({
    hp: 10,
    poisoned: false,
    protected: false,
    color: "text-black",
  });

  return (
    <React.StrictMode>
      <UserContext.Provider
        value={{
          actionText,
          setActionText,
          level,
          setLevel,
          background,
          setBackground,
          newBoard,
          setNewBoard,
          hero,
          setHero,
          player,
          setPlayer,
          makeBoard,
          setMakeBoard,
          difficulty,
          setDifficulty,
          score,
          setScore,
          headerToggles,
          setHeaderToggles,
        }}
      >
        <App />
      </UserContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Context />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
