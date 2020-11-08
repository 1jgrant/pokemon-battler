//stats from:
//https://pokemondb.net/pokedex/game/red-blue-yellow

const pokedex = {
  bulbasaur: {
    hp: 45,
    att: 49,
    def: 49,
    spAtt: 65,
    spDef: 65,
    speed: 45,
    type: "grass",
    moves: {
      1: ["tackle"], //growl
      //   7: ["leech seed"],
      13: ["vine whip"],
    },
  },
  charmander: {
    hp: 39,
    att: 52,
    def: 43,
    spAtt: 60,
    spDef: 50,
    speed: 65,
    type: "fire",
    moves: {
      1: ["scratch"], //growl
      9: ["ember"],
    },
  },
  squirtle: {
    hp: 44,
    att: 48,
    def: 65,
    spAtt: 50,
    spDef: 64,
    speed: 43,
    type: "water",
    moves: {
      1: ["tackle"], //tail whip
      8: ["bubble"],
      15: ["water gun"],
    },
  },
  rattata: {
    hp: 30,
    att: 56,
    def: 35,
    spAtt: 25,
    spDef: 35,
    speed: 72,
    type: "normal",
    moves: {
      1: ["tackle"], //tail whip
      7: ["quick attack"],
      14: ["hyper fang"],
    },
  },
  missingNo: {
    hp: 33,
    att: 136,
    def: 0,
    spAtt: 6,
    spDef: 6,
    speed: 29,
    type: "normal",
    moves: {
      1: ["water gun"],
    },
  },
};

const namesArr = Object.keys(pokedex);

module.exports = { pokedex, namesArr };
