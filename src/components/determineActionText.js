const levelActionText = (level) => {
  if (level === 1) {
    return "Every journey starts with the first step";
  } else if (level === 2) {
    return "You cross the field";
  } else if (level === 3) {
    return "You see a cave in the distance!";
  } else if (level === 4) {
    return "You cautiously enter the Cave...";
  } else if (level === 5) {
    return "You go deeper into the Cave";
  } else if (level === 6) {
    return "You start to feel extremely hot";
  } else if (level === 7) {
    return "You have reached the Abyss";
  } else if (level === 8) {
    return "You are deeper than any bunny has gone ";
  } else if (level === 9) {
    return "You see the amulet in the distance!";
  }
};

export default levelActionText;
