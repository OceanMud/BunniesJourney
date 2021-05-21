const Stage1 = [
  {
    enemy: "Field",
    background: "/images/icons/tile/field.png",
  },
  {
    enemy: "Field",
    background: "/images/icons/tile/field2.png",
  },
];

const Stage2 = [
  {
    enemy: "Cave",
    background: "/images/icons/tile/cave.png",
  },
  {
    enemy: "Cave",
    background: "/images/icons/tile/cave2.png",
  },
  {
    enemy: "CrystalCave",
    background: "/images/icons/tile/crystalcave.png",
  },
  {
    enemy: "CrystalCave",
    background: "/images/icons/tile/crystalcave2.png",
  },
  {
    enemy: "IceCave",
    background: "/images/icons/tile/icecave.png",
  },
  {
    enemy: "IceCave",
    background: "/images/icons/tile/icecave2.png",
  },
];

const Stage3 = [
  {
    enemy: "Ruin",
    background: "/images/icons/tile/ruin.png",
  },
  {
    enemy: "Ruin",
    background: "/images/icons/tile/ruin2.png",
  },
  {
    enemy: "Tundra",
    background: "/images/icons/tile/tundra.png",
  },
  {
    enemy: "Tundra",
    background: "/images/icons/tile/tundra2.png",
  },
  {
    enemy: "Abyss",
    background: "/images/icons/tile/hell.png",
  },
  {
    enemy: "Abyss",
    background: "/images/icons/tile/hell2.png",
  },
];

export const determineBackground = (level) => {
  let randomLevel = Math.floor(Math.random() * 2);
  let randomLevel2 = Math.floor(Math.random() * 6);

  if (level === 1) {
    return {
      enemy: Stage1[randomLevel].enemy,
      background: Stage1[randomLevel].background,
    };
  }

  if (level === 4) {
    return {
      enemy: Stage2[randomLevel2].enemy,
      background: Stage2[randomLevel2].background,
    };
  }

  if (level === 7) {
    return {
      enemy: Stage3[randomLevel2].enemy,
      background: Stage3[randomLevel2].background,
    };
  }
};
