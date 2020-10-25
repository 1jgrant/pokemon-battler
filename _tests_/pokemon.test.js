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
  });
  describe("METHODS", () => {
    test("initStats method should initialise the pokemon class instance stats to those from the pokedex reference at given level", () => {
      const testBulbasaur = new Pokemon("bulbasaur", 15);
      testBulbasaur.initStats();
      const expHP = 38;
      const expAtt = 19;
      const expDef = 19;
      const expSpeed = 18;
      console.log(testBulbasaur);
      expect(testBulbasaur.hp).toBe(expHP);
      expect(testBulbasaur.att).toBe(expAtt);
      expect(testBulbasaur.def).toBe(expDef);
      expect(testBulbasaur.speed).toBe(expSpeed);
    });
  });
});
