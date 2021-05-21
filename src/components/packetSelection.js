const beginnerPacket = [
  "Monster",
  "Monster",
  "Monster",
  "Health",
  "Poison",
  "Shield",
  "Antidote",
];

const easyPacket = [
  ["Monster", "Monster", "Monster", "Health", "Health", "Poison", "Antidote"],
  ["Monster", "Monster", "Monster", "Shield", "Shield", "Poison", "Antidote"],
  ["Monster", "Monster", "Monster", "Monster", "Health", "Health", "Shield"],
];

const mediumPacket = [
  ["Monster", "Monster", "Monster", "Poison", "Health", "Antidote", "Shield"],
  ["Monster", "Monster", "Monster", "Monster", "Health", "Poison", "Poison"],
  ["Monster", "Monster", "Monster", "Monster", "Monster", "Health", "Shield"],
];

const hardPacket = [
  ["Monster", "Monster", "Monster", "Health", "Shield", "Poison", "Poison"],
  ["Monster", "Monster", "Health", "Shield", "Poison", "Poison", "Poison"],
  ["Monster", "Monster", "Monster", "Monster", "Monster", "Shield", "Shield"],
];

const grabEasyPacket = () => {
  const chooseSeed = Math.floor(Math.random() * 3);
  return easyPacket[chooseSeed];
};

const grabMediumPacket = () => {
  const chooseSeed = Math.floor(Math.random() * 3);
  return mediumPacket[chooseSeed];
};

const grabHardPacket = () => {
  const chooseSeed = Math.floor(Math.random() * 3);
  return hardPacket[chooseSeed];
};

export const packetLogic = (level, difficulty) => {
  const difficultySeed = Math.floor(Math.random() * 10) + 1;

  if (level >= 1 && level < 3) {
    if (difficulty === "Easy") {
      if (difficultySeed >= 8) {
        return grabEasyPacket();
      }
    }

    if (difficulty === "Medium") {
      if (difficultySeed > 5) {
        return grabEasyPacket();
      }
    }

    if (difficulty === "Hard") {
      if (difficultySeed > 3) {
        return grabEasyPacket();
      }
    }
  }

  if (level >= 3 && level < 7) {
    const difficultySeed = Math.floor(Math.random() * 10) + 1;

    if (difficulty === "Easy") {
      if (difficultySeed < 3) {
        return grabEasyPacket();
      }
      if (difficultySeed > 7) {
        return grabMediumPacket();
      }
    }

    if (difficulty === "Medium") {
      if (difficultySeed < 3) {
        return grabEasyPacket();
      }
      if (difficultySeed > 5) {
        return grabMediumPacket();
      }
    }

    if (difficulty === "Hard") {
      if (difficultySeed < 3) {
        return grabEasyPacket();
      }
      if (difficultySeed > 3) {
        return grabMediumPacket();
      }
    }
  }

  if (level >= 7 && level < 10) {
    if (difficulty === "Easy") {
      if (difficultySeed === 1) {
        return grabEasyPacket();
      }

      if (difficultySeed === 2 || difficultySeed === 3) {
        return grabMediumPacket();
      }

      if (difficultySeed > 7) {
        return grabHardPacket();
      }
    }

    if (difficulty === "Medium") {
      if (difficultySeed === 1) {
        return grabEasyPacket();
      }

      if (difficultySeed === 2 || difficultySeed === 3) {
        return grabMediumPacket();
      }

      if (difficultySeed > 5) {
        return grabHardPacket();
      }
    }

    if (difficulty === "Hard") {
      if (difficultySeed === 1) {
        return grabEasyPacket();
      }

      if (difficultySeed === 2) {
        return grabMediumPacket();
      }

      if (difficultySeed > 3) {
        return grabHardPacket();
      }
    }
  }

  return beginnerPacket;
};
