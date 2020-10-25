const Pokemon = require("./pokemon-class");

class Trainer {
  constructor(max = 6, name = "ash") {
    this.name = name;
    this.max = max;
    this.team = [];
    this.items = [];
    this.activePokemon = this.team[0];
  }

  catch(pokemon, level) {
    if (this.team.length < this.max) {
      const newPoke = new Pokemon(pokemon, level);
      newPoke.initStats();
      this.team.push(newPoke);
    } else {
      //console.log("Team is full!");
    }
    //if chosenPokemon has not been selected, update to first pokemon in team
    if (!this.activePokemon) this.activePokemon = this.team[0];
  }

  changePokemon(slot) {
    if (slot > -1 && slot < this.team.length && this.team[slot].hp > 0) {
      this.activePokemon = this.team[slot];
    } else if (this.team[slot].hp < 1) {
      //console.log(`${this.team[slot].name} is unconscious`);
    } else {
      //console.log("no pokemon there");
    }
  }
}

module.exports = Trainer;
