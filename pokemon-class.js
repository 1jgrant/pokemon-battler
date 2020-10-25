//pokemon class
const pokedex = require("./pokedex");

class Pokemon {
  constructor(name, level) {
    this.name = name;
    this.level = level;
    this.hp = 10;
    this.att = 10;
    this.def = 10;
    this.spAtt = 10;
    this.spDef = 10;
    this.speed = 10;
    this.type = "normal";
    this.isConscious = true;
    this.moves = [];
    this.sound = "default";
  }

  initStats() {}
}

module.exports = Pokemon;
