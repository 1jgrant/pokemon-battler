const inquirer = require("inquirer");
const Battle = require("./battle-class");
const { namesArr } = require("./pokedex");
const Trainer = require("./trainer-class");
const Pokemon = require("./pokemon-class");
const options = ["Fight"];

console.log("Welcome to the game!");

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

const trainerAction = (battleInst, trainer) => {
  const actionQ = [
    {
      type: "list",
      name: "action",
      message: `${trainer.name}, choose your action:`,
      choices: options,
    },
  ];
  return inquirer.prompt(actionQ).then((actionA) => {
    if (actionA.action === "Fight") {
      const moveQ = [
        {
          type: "list",
          name: "move",
          message: `Choose move:`,
          choices: Object.keys(trainer.activePokemon.moves),
        },
      ];
      return inquirer.prompt(moveQ).then((moveA) => {
        battleInst.selectMove(trainer, moveA.move);
        return battleInst;
      });
    }
  });
};

const turn = (battleInst) => {
  const confirm = {
    type: "confirm",
    name: "conf",
    message: "go?",
    default: true,
  };
  inquirer
    .prompt(confirm)
    .then(() => {
      return trainerAction(battleInst, battleInst.t1);
    })
    .then(() => {
      return trainerAction(battleInst, battleInst.t2);
    })
    .then(() => {
      battleInst.fight();
      if (
        battleInst.t1.activePokemon.isConscious &&
        battleInst.t2.activePokemon.isConscious
      ) {
        console.log(battleInst);
        turn(battleInst);
      } else {
        console.log("fight is over");
      }
    });
};

inquirer
  .prompt(setupQs)
  .then((setupAs) => {
    const t1 = new Trainer(1, setupAs.p1Name);
    const t2 = new Trainer(1, setupAs.p2Name);
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
      t1.catch(teamAs.p1NewPokemon, 30);
      t2.catch(teamAs.p2NewPokemon, 30);
      return [t1, t2];
    });
  })
  .then(([t1, t2]) => {
    const battle = new Battle(t1, t2);
    console.log(
      `${battle.t1.name} sent out ${battle.t1.activePokemon.name}...`
    );
    console.log(
      `${battle.t2.name} sent out ${battle.t2.activePokemon.name}...`
    );
    return battle;
  })
  .then((battle) => {
    turn(battle);
  });
