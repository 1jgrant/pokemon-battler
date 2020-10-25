const Pokemon = require("../pokemon-class");

describe("Pokemon class", () => {
  test("Pokemon class should return an object", () => {
    expect(typeof new Pokemon()).toBe("object");
  });
  describe("PROPERTIES", () => {
    test("instance of the Pokemon class should have all required properties", () => {
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
      expect(testPokemon).toHaveProperty("moves", []);
      expect(testPokemon).toHaveProperty("sound", "default");
    });
    test("should ", () => {});
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
        1: ["tackle"],
        7: ["leech seed"],
        13: ["vine whip"],
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
        1: ["scratch"],
        9: ["ember"],
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
        1: ["water gun"],
      };
      expect(testRandom.hp).toBe(expHP);
      expect(testRandom.att).toBe(expAtt);
      expect(testRandom.def).toBe(expDef);
      expect(testRandom.speed).toBe(expSpeed);
      expect(testRandom.type).toBe("grass");
      expect(testRandom.moves).toEqual(expMoves);
    });
  });
});
