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
  const [enemy, setEnemy] = useState("");
  const [highScoreCount, setHighScoreCount] = useState({
    enemy: 0,
    potion: 0,
    level: 0,
  });
  const [makeBoard, setMakeBoard] = useState(0);
  const [disableHs, setDisableHs] = useState(false);
  const [initScreen, setInitScreen] = useState(true);
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(false);
  const [actionText, setActionText] = useState("Welcome to Bunnies Journey!");
  const [hero, setHero] = useState("images/icons/main/1.png");
  const [difficulty, setDifficulty] = useState("Easy");
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState("");
  const [mode, setMode] = useState("Story");
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
          leaderboard,
          setLeaderboard,
          disableHs,
          setDisableHs,
          highScoreCount,
          setHighScoreCount,
          enemy,
          setEnemy,
          mode,
          setMode,
          initScreen,
          setInitScreen,
          sound,
          setSound,
          music,
          setMusic,
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
