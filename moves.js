//stats from:
//https://pokemondb.net/pokedex/game/red-blue-yellow

const movesRef = {
  scratch: {
    type: "normal",
    category: "physical",
    power: 40,
    accuracy: 100,
    maxPP: 35,
    currentPP: 35,
    priority: 0,
  },
  tackle: {
    type: "normal",
    category: "physical",
    power: 40,
    accuracy: 100,
    maxPP: 35,
    currentPP: 35,
    priority: 0,
  },
  // 'leech seed' : {
  //     type : 'grass'
  //     category : 'status',
  //     power : 45,
  //     accuracy : 90,
  //     maxPP : 10,
  //     currentPP : 10,
  // },
  "vine whip": {
    type: "grass",
    category: "physical",
    power: 45,
    accuracy: 100,
    maxPP: 25,
    currentPP: 25,
    priority: 0,
  },
  "quick attack": {
    type: "normal",
    category: "physical",
    power: 40,
    accuracy: 100,
    maxPP: 30,
    currentPP: 30,
    priority: 1,
  },
  "hyper fang": {
    type: "normal",
    category: "physical",
    power: 80,
    accuracy: 90,
    maxPP: 15,
    currentPP: 15,
    priority: 0,
  },
  bubble: {
    type: "water",
    category: "special",
    power: 40,
    accuracy: 100,
    maxPP: 30,
    currentPP: 30,
    priority: 0,
  },
  "water gun": {
    type: "water",
    category: "special",
    power: 40,
    accuracy: 100,
    maxPP: 25,
    currentPP: 25,
    priority: 0,
  },
  ember: {
    type: "fire",
    category: "special",
    power: 40,
    accuracy: 100,
    maxPP: 25,
    currentPP: 25,
    priority: 0,
  },
};

module.exports = movesRef;
