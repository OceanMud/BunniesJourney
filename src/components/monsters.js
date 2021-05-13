export let monstersField = [
  {
    name: "Barbsnake",
    attack: 0,
    img: "/images/icons/field/1.png",
  },
  {
    name: "Slagcrackle",
    attack: 1,
    img: "/images/icons/field/2.png",
  },
  {
    name: "Blazeling",
    attack: 2,
    img: "/images/icons/field/3.png",
  },
  {
    name: "Grievefiend",
    attack: 3,
    img: "/images/icons/field/4.png",
  },
  {
    name: "Mean Monstrosity",
    attack: 4,
    img: "/images/icons/field/5.png",
  },
  {
    name: "Mean Monstrosity",
    attack: 5,
    img: "/images/icons/field/6.png",
  },
  {
    name: "Colossal Howler",
    attack: 6,
    img: "/images/icons/bosses/1.png",
  },
  {
    name: "Howling Ash Phoenix",
    attack: 7,
    img: "/images/icons/bosses/2.png",
  },
  {
    name: "Cold-Blooded Berserker Behemoth",
    attack: 8,
    img: "/images/icons/bosses/3.png",
  },
];

export let monstersCave = [
  {
    name: "Mourncrackle",
    attack: 2,
    img: "/images/icons/cave/1.png",
  },
  {
    name: "Moldhag",
    attack: 3,
    img: "/images/icons/cave/2.png",
  },
  {
    name: "Spectralboy",
    attack: 4,
    img: "/images/icons/cave/3.png",
  },
  {
    name: "Mournchild",
    attack: 5,
    img: "/images/icons/cave/4.png",
  },
  {
    name: "Giant Mutant",
    attack: 6,
    img: "/images/icons/cave/5.png",
  },
  {
    name: "Reckless Glob",
    attack: 7,
    img: "/images/icons/cave/6.png",
  },
  {
    name: "Hungry Figure",
    attack: 8,
    img: "/images/icons/bosses/4.png",
  },
  {
    name: "Iron-Scaled Army Boar",
    attack: 9,
    img: "/images/icons/bosses/5.png",
  },
  {
    name: "Aquatic Thunder Ape",
    attack: 10,
    img: "/images/icons/bosses/6.png",
  },
];

export let monstersHell = [
  {
    name: "Brineling",
    attack: 3,
    img: "/images/icons/hell/1.png",
  },
  {
    name: "Poisonwoman",
    attack: 4,
    img: "/images/icons/hell/2.png",
  },
  {
    name: "Putridstrike",
    attack: 5,
    img: "/images/icons/hell/3.png",
  },
  {
    name: "Infernolich",
    attack: 6,
    img: "/images/icons/hell/4.png",
  },
  {
    name: "Grotesque Entity",
    attack: 7,
    img: "/images/icons/hell/5.png",
  },
  {
    name: "Quick Howler",
    attack: 8,
    img: "/images/icons/hell/6.png",
  },
  {
    name: "Parallel Howler",
    attack: 9,
    img: "/images/icons/bosses/7.png",
  },
  {
    name: "Chaotic Bone Bear",
    attack: 10,
    img: "/images/icons/bosses/8.png",
  },
  {
    name: "Cold-Blooded Mist Warthog",
    attack: 11,
    img: "/images/icons/bosses/9.png",
  },
];

export const monsterShuffle = () => {
  let monsterShuffle = monstersField
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  monstersField = monsterShuffle;

  let monsterShuffle2 = monstersCave
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  monstersCave = monsterShuffle2;

  let monsterShuffle3 = monstersHell
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  monstersHell = monsterShuffle3;
};
