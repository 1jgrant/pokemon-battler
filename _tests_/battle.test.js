const Battle = require("../battle-class");
const Trainer = require("../trainer-class");

describe("Battle class", () => {
  test("Battle class should return an object", () => {
    expect(typeof new Battle()).toBe("object");
  });
  describe("PROPERTIES", () => {});
  describe("METHODS", () => {
    describe("selectMove", () => {
      test("method should update the nextMove property for the desired trainer", () => {
        const testTrainer1 = new Trainer(1, "trainer1");
        const testTrainer2 = new Trainer(1, "trainer2");
        testTrainer1.catch("squirtle", 15);
        testTrainer2.catch("charmander", 15);
        const testBattle = new Battle(testTrainer1, testTrainer2);
        testBattle.selectMove(testTrainer1, "bubble");
        testBattle.selectMove(testTrainer2, "scratch");
        expect(testBattle.nextMove1.name).toEqual("bubble");
        expect(testBattle.nextMove2.name).toEqual("scratch");
      });
    });
    describe("fight", () => {
      test("method should calculate moves order based on move priority", () => {
        const testTrainer1 = new Trainer(1, "trainer1");
        const testTrainer2 = new Trainer(1, "trainer2");
        testTrainer1.catch("charmander", 50);
        testTrainer2.catch("rattata", 15);
        const testBattle = new Battle(testTrainer1, testTrainer2);
        testBattle.selectMove(testTrainer1, "ember");
        testBattle.selectMove(testTrainer2, "quick attack");
        testBattle.fight();
        expect(testBattle.order[0].name).toBe("trainer2");
      });
      test("when move priority is the same, method should calculate fight order based on pokemon speed", () => {
        const testTrainer1 = new Trainer(1, "trainer1");
        const testTrainer2 = new Trainer(1, "trainer2");
        testTrainer1.catch("charmander", 10);
        testTrainer2.catch("rattata", 25);
        const testBattle = new Battle(testTrainer1, testTrainer2);
        testBattle.selectMove(testTrainer1, "ember");
        testBattle.selectMove(testTrainer2, "tackle");
        console.log(testBattle);
        testBattle.fight();
        expect(testBattle.order[0].name).toBe("trainer2");
      });
    });
    describe("useMove", () => {
      test("method should ", () => {});
    });
  });
});
