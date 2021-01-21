/*
Battle order:
pass in two trainers
Trainers first pokemon come out
Trainer 1 chooses whether to use item - used immediately
Trainer 1 chooses move
Trainer 2 chooses whether to use item - used immediately
Trainer 2 chooses move
first attack depends on - move priority, then speed of pokemon
first attack,
has defender fainted? if so, 
    *** defender does not attack, trainer picks new active pokemon, if none left, other trainer has won ***
        *** if pokemon are available, bring out new pokemon & restart loop ***
second attack
has defender fainted? if so, 
    *** trainer picks new active pokemon if none left, other trainer has won ***
        *** if pokemon are available, bring out new pokemon & restart loop ***
otherwise, restart loop

-- damage calculations: 
https://bulbapedia.bulbagarden.net/wiki/Damage#Damage_calculation//
*/
const { types, matrix } = require("./types");

class Battle {
  constructor(trainer1, trainer2) {
    this.t1 = trainer1;
    this.t2 = trainer2;
    this.order = [this.t1, this.t2];
    this.winner = {};
    this.loser = {};
  }
  // method for each trainer to select their move
  selectMove(trainer, move) {
    // display available actions - attack, item, change pokemon
    if (trainer === this.t1) {
      this.t1.nextMove = this.t1.activePokemon.moves[move];
    } else if (trainer === this.t2) {
      this.t2.nextMove = this.t2.activePokemon.moves[move];
    }
  }

  useMove(attacker, defender) {
    // set the attack/defence ratio based on the move's category
    let adRatio;
    if (attacker.nextMove.category === "physical") {
      adRatio = attacker.activePokemon.att / defender.activePokemon.def;
    } else if (attacker.nextMove.category === "special") {
      adRatio = attacker.activePokemon.spAtt / defender.activePokemon.spDef;
    }
    // calculate base damage
    const baseDmg = Math.floor(
      (((2 * attacker.activePokemon.level) / 5 + 2) *
        attacker.nextMove.power *
        adRatio) /
        50 +
        2
    );
    // multipliers can be accessed via matrix[attackerIndex][defenderIndex]
    const typeMod =
      matrix[types.indexOf(attacker.nextMove.type)][
        types.indexOf(defender.activePokemon.type)
      ];
    // can also implement luck modifier
    const totalDmg = baseDmg * typeMod;
    defender.activePokemon.hp -= totalDmg;
    if (defender.activePokemon.hp < 0) {
      defender.activePokemon.hp = 0;
      defender.activePokemon.isConscious = false;
    }
    attacker.nextMove.currentPP--;

    this.createMoveMessages(attacker, defender, typeMod);
  }

  createMoveMessages(attacker, defender, multiplier) {
    const msg = {
      att: attacker.activePokemon.name,
      def: defender.activePokemon.name,
      move: attacker.nextMove.name,
      defHP: defender.activePokemon.hp,
      defMaxHP: defender.activePokemon.maxHp,
    };
    const effect = {
      0: `It's not effective.`,
      0.5: `It's not very effective.`,
      1: "",
      2: `It's super effective!`,
    };
    msg.effect = effect[multiplier];
    console.log(`${msg.att} used ${msg.move}. ${msg.effect}`);
    // console.log(
    //   `${msg.att} used ${msg.move}. ${msg.effect} ${msg.def} has ${msg.defHP}/${msg.defMaxHP} HP remaining`
    // );
  }

  createHpMessage(p1, p2) {
    const p1Percent = p1.hp / p1.maxHp;
    const p1BarLength = Math.ceil(20 * p1Percent);
    const p1Bar = Array(p1BarLength)
      .fill("=")
      .concat(Array(20 - p1BarLength).fill("_"))
      .join("");

    const p2Percent = p2.hp / p2.maxHp;
    const p2BarLength = Math.ceil(20 * p2Percent);
    const p2Bar = Array(p2BarLength)
      .fill("=")
      .concat(Array(20 - p2BarLength).fill("_"))
      .join("");

    console.log(
      `${p1.name}\tHP:${p1.hp}/${p1.maxHp} [${p1Bar}]\n${p2.name}\tHP:${p2.hp}/${p2.maxHp} [${p2Bar}]`
    );
  }

  fight() {
    // trainer's moves are already decided
    //check which move should go first
    this.order.sort(() => {
      if (this.t1.nextMove.priority < this.t2.nextMove.priority) return -1;
      if (this.t1.nextMove.priority > this.t2.nextMove.priority) return 1;
      // If priority is the same, sort on pokemon speed
      if (this.t1.activePokemon.speed < this.t2.activePokemon.speed) return -1;
      if (this.t1.activePokemon.speed > this.t2.activePokemon.speed) return 1;
    });
    this.useMove(this.order[0], this.order[1]);
    if (this.order[1].activePokemon.isConscious) {
      this.useMove(this.order[1], this.order[0]);
      this.createHpMessage(this.t1.activePokemon, this.t2.activePokemon);
      if (!this.order[0].activePokemon.isConscious) {
        console.log(`${this.order[0].activePokemon.name} fainted`);
        //only using 1 pokemon, so trainer has lost
        this.winner = this.order[1];
        this.loser = this.order[0];
      }
    } else {
      this.createHpMessage(this.t1.activePokemon, this.t2.activePokemon);
      console.log(`${this.order[1].activePokemon.name} fainted`);
      //only using 1 pokemon, so trainer has lost
      this.winner = this.order[0];
      this.loser = this.order[1];
    }
  }
}

module.exports = Battle;
