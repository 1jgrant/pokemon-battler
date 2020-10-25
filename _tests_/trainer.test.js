const Trainer = require("../trainer-class");

describe("Trainer class", () => {
  test("Trainer class should return an object", () => {
    expect(typeof new Trainer()).toBe("object");
  });
  describe("PROPERTIES", () => {
    test("instance of the trainer class should have all required properties with default values", () => {
      const testTrainer = new Trainer();
      const testTrainer2 = new Trainer(3, "gary");
      expect(testTrainer).toHaveProperty("name", "ash");
      expect(testTrainer).toHaveProperty("max", 6);
      expect(testTrainer).toHaveProperty("team", []);
      expect(testTrainer).toHaveProperty("items", []);
      expect(testTrainer).toHaveProperty("activePokemon", undefined);

      expect(testTrainer2).toHaveProperty("name", "gary");
      expect(testTrainer2).toHaveProperty("max", 3);
    });
  });
  describe("METHODS", () => {
    test("catch - should place an instance of the specified pokemon in the Trainer instance's team", () => {
      const testTrainer = new Trainer();
      testTrainer.catch("squirtle", 15);
      expect(testTrainer.team[0].name).toBe("squirtle");
    });
    test("catch - should can place multiple instances of the same class into the team", () => {
      const testTrainer = new Trainer();
      testTrainer.catch("squirtle", 15);
      testTrainer.catch("squirtle", 30);
      expect(testTrainer.team[0].level).toBe(15);
      expect(testTrainer.team[1].level).toBe(30);
      expect(testTrainer.team[0]).not.toBe(testTrainer.team[1]);
    });
    test("catch - should not add to the team if team is full", () => {
      const testTrainer = new Trainer(3);
      testTrainer.catch("squirtle", 15);
      testTrainer.catch("squirtle", 30);
      testTrainer.catch("charmander", 35);
      testTrainer.catch("bulbasaur", 99);
      expect(testTrainer.team.length).toBe(3);
    });
    test("changePokemon - should change the active pokemon", () => {
      const testTrainer = new Trainer(3);
      testTrainer.catch("squirtle", 15);
      testTrainer.catch("squirtle", 30);
      testTrainer.catch("charmander", 35);
      expect(testTrainer.activePokemon).toBe(testTrainer.team[0]);
      testTrainer.changePokemon(2);
      expect(testTrainer.activePokemon).toBe(testTrainer.team[2]);
    });
    test("changePokemon - may only be used to select pokemon that have not fainted", () => {
      const testTrainer = new Trainer(3);
      testTrainer.catch("squirtle", 15);
      testTrainer.catch("squirtle", 30);
      testTrainer.catch("charmander", 35);
      testTrainer.team[1].hp = 0;
      testTrainer.changePokemon(1);
      expect(testTrainer.activePokemon).toBe(testTrainer.team[0]);
    });
  });
});
