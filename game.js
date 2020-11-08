const inquirer = require("inquirer");
const Battle = require("./battle-class");
const { namesArr } = require("./pokedex");
const Trainer = require("./trainer-class");
const Pokemon = require("./pokemon-class");

const setupQs = [
  {
    type: "input",
    name: "begin",
    message: "Press enter to begin",
  },
  {
    type: "input",
    name: "p1Name",
    message: "Player 1, what is your name?:",
    default: "Ash",
  },
  {
    type: "input",
    name: "p2Name",
    message: "Player 2, what is your name?:",
    default: "Gary",
  },
];
// could create separate function for building the team, that can be called recursively until team is full

console.log("Welcome to the game!");

inquirer
  .prompt(setupQs)
  .then((setupAs) => {
    console.log("setup answers >>>", setupAs);
    const t1 = new Trainer(1, setupAs.p1Name);
    const t2 = new Trainer(1, setupAs.p2Name);
    //console.log(t1);
    const buildTeamQs = [
      {
        type: "list",
        name: "p1NewPokemon",
        message: `${setupAs.p1Name}, choose your pokemon`,
        choices: namesArr,
      },
      {
        type: "list",
        name: "p2NewPokemon",
        message: `${setupAs.p2Name}, choose your pokemon`,
        choices: namesArr,
      },
    ];
    return inquirer.prompt(buildTeamQs).then((teamAs) => {
      console.log(teamAs.p1NewPokemon);
      console.log(t1);
      t1.catch("bulbasaur", 30);
      console.log(t1);
      //   t2.catch(teamAs.p2NewPokemon, 30);
      //   return [t1, t2];
    });
  })
  .then(() => {
    // console.log(t1);
  });
