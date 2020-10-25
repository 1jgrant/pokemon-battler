const Pokemon = require("../pokemon-class");
const pokedex = require("../pokedex");
const movesRef = require("../moves");

describe("Pokemon class", () => {
  test("Pokemon class should return an object", () => {
    expect(typeof new Pokemon()).toBe("object");
  });
  describe("PROPERTIES", () => {
    test("instance of the Pokemon class should have all required properties at default values before initialisation", () => {
      const testPokemon = new Pokemon("test", 10);
      expect(testPokemon).toHaveProperty("name", "test");
      expect(testPokemon).toHaveProperty("level", 10);
      expect(testPokemon).toHaveProperty("hp", 10);
      expect(testPokemon).toHaveProperty("att", 10);
      expect(testPokemon).toHaveProperty("def", 10);
      expect(testPokemon).toHaveProperty("spAtt", 10);
      expect(testPokemon).toHaveProperty("spDef", 10);
      expect(testPokemon).toHaveProperty("speed", 10);
      expect(testPokemon).toHaveProperty("type", "normal");
      expect(testPokemon).toHaveProperty("isConscious", true);
      expect(testPokemon).toHaveProperty("moves", {});
      expect(testPokemon).toHaveProperty("sound", "default");
    });
    test("pokemon instances should have min and max levels of 1 & 100", () => {
      const testPokemon = new Pokemon("test", 0);
      expect(testPokemon.level).toBe(1);
      const testPokemon2 = new Pokemon("test2", 101);
      expect(testPokemon2.level).toBe(100);
    });
  });
  describe("METHODS", () => {
    test("initStats - method should initialise the pokemon class instance stats using pokedex reference base stats for specified pokemon and its level", () => {
      const testBulbasaur = new Pokemon("bulbasaur", 15);
      testBulbasaur.initStats();
      const expHP = 38;
      const expAtt = 19;
      const expDef = 19;
      const expSpeed = 18;
      const expMoves = {
        tackle: {
          type: "normal",
          category: "physical",
          power: 40,
          accuracy: 100,
          maxPP: 35,
          currentPP: 35,
          priority: 0,
        },
        "vine whip": {
          type: "grass",
          category: "physical",
          power: 45,
          accuracy: 100,
          maxPP: 25,
          currentPP: 25,
          priority: 0,
        },
      };
      expect(testBulbasaur.hp).toBe(expHP);
      expect(testBulbasaur.att).toBe(expAtt);
      expect(testBulbasaur.def).toBe(expDef);
      expect(testBulbasaur.speed).toBe(expSpeed);
      expect(testBulbasaur.type).toBe("grass");
      expect(testBulbasaur.moves).toEqual(expMoves);

      const testCharmander = new Pokemon("charmander", 15);
      testCharmander.initStats();
      const expHP2 = 36;
      const expAtt2 = 20;
      const expDef2 = 17;
      const expSpeed2 = 24;
      const expMoves2 = {
        scratch: {
          type: "normal",
          category: "physical",
          power: 40,
          accuracy: 100,
          maxPP: 35,
          currentPP: 35,
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
      expect(testCharmander.hp).toBe(expHP2);
      expect(testCharmander.att).toBe(expAtt2);
      expect(testCharmander.def).toBe(expDef2);
      expect(testCharmander.speed).toBe(expSpeed2);
      expect(testCharmander.type).toBe("fire");
      expect(testCharmander.moves).toEqual(expMoves2);
    });
    test("initStats - when specified pokemon name is not present in pokedex instance of pokemon class is initialised with missingNo stats", () => {
      const testRandom = new Pokemon("random", 15);
      testRandom.initStats();
      const expHP = 34;
      const expAtt = 45;
      const expDef = 5;
      const expSpeed = 13;
      const expMoves = {
        "water gun": {
          type: "water",
          category: "special",
          power: 40,
          accuracy: 100,
          maxPP: 25,
          currentPP: 25,
          priority: 0,
        },
      };
      expect(testRandom.hp).toBe(expHP);
      expect(testRandom.att).toBe(expAtt);
      expect(testRandom.def).toBe(expDef);
      expect(testRandom.speed).toBe(expSpeed);
      expect(testRandom.type).toBe("normal");
      expect(testRandom.moves).toEqual(expMoves);
    });
    test("initStats - when stats are changed after initialisation, the pokedex and moves objects should not be mutated", () => {
      const testBulbasaur = new Pokemon("bulbasaur", 15);
      testBulbasaur.initStats();
      testBulbasaur.type = "fire";
      testBulbasaur.moves.tackle.type = "grass";
      testBulbasaur.speed = 100;
      //checking updated the instance
      expect(testBulbasaur.type).toBe("fire");
      expect(testBulbasaur.moves.tackle.type).toBe("grass");
      expect(testBulbasaur.speed).toBe(100);
      //checking non mutation of the reference
      expect(pokedex.bulbasaur.type).toBe("grass");
      expect(movesRef.tackle.type).toBe("normal");
      expect(pokedex.bulbasaur.speed).toBe(45);
    });
  });
});
