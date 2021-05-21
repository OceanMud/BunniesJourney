const levelActionText = (level, enemy, mode) => {
  if (level === 1) {
    if (mode === "Story") {
      return "Every journey starts with the first step";
    }

    if (mode === "Endless") {
      return "Your journey has become a little harder";
    }
  } else if (level === 2) {
    return "You cross the field";
  } else if (level === 3) {
    return "You see a cave in the distance!";
  } else if (level === 4) {
    if (mode === "Story") {
      return "You cautiously enter the Cave...";
    }

    if (mode === "Endless") {
      return `You cautiously enter the ${enemy}...`;
    }
  } else if (level === 5) {
    return "You go deeper into the Cave";
  } else if (level === 6) {
    if (mode === "Story") {
      return "You start to feel extremely hot";
    }
    if (mode === "Endless") {
      return `You sense danger ahead`;
    }
  } else if (level === 7) {
    if (mode === "Story") {
      return "You have reached the Abyss";
    }
    if (mode === "Endless") {
      return `You have reached the ${enemy}`;
    }
  } else if (level === 8) {
    return "You are deeper than any bunny has gone ";
  } else if (level === 9) {
    if (mode === "Story") {
      return "You see the amulet in the distance!";
    }
    if (mode === "Endless") {
      return `You see the end of the cave in the distance!`;
    }
  }
};

export default levelActionText;
