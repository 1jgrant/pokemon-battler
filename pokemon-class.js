//pokemon class
//stat calculations from https://bulbapedia.bulbagarden.net/wiki/Statistic#Base_stat_values
const pokedex = require("./pokedex");
const movesRef = require("./moves");

class Pokemon {
  constructor(name, level) {
    this.name = name;
    this.level = level < 1 ? 1 : level;
    this.hp = 10;
    this.att = 10;
    this.def = 10;
    this.spAtt = 10;
    this.spDef = 10;
    this.speed = 10;
    this.type = "normal";
    this.isConscious = true;
    this.moves = {};
    this.sound = "default";
  }

  initStats() {
    //If specified pokemon is in the pokedex, use its base stats to initialise
    //the instance, otherwise use the missingNo stats
    const ref = pokedex.hasOwnProperty(this.name)
      ? pokedex[this.name]
      : pokedex.missingNo;
    const keys = Object.keys(ref);
    keys.forEach((key) => {
      if (key === "type") {
        this[key] = ref[key];
      } else if (key === "moves") {
        const moveList = Object.values(ref.moves).flat();
        moveList.forEach((move) => (this.moves[move] = { ...movesRef[move] }));
      } else if (key === "hp") {
        this[key] = Math.floor(
          (ref[key] * 2 * this.level) / 100 + this.level + 10
        );
      } else {
        this[key] = Math.floor((ref[key] * 2 * this.level) / 100 + 5);
      }
    });
  }
}

module.exports = Pokemon;
