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
        expect(testBattle.t1.nextMove.name).toEqual("bubble");
        expect(testBattle.t2.nextMove.name).toEqual("scratch");
      });
    });
    describe("useMove", () => {
      test("method should use the attacker's move on the defender, subtracting the correct amount of damage for normal type moves", () => {
        const testTrainer1 = new Trainer(1, "trainer1");
        const testTrainer2 = new Trainer(1, "trainer2");
        testTrainer1.catch("charmander", 15);
        testTrainer2.catch("squirtle", 15);
        const testBattle = new Battle(testTrainer1, testTrainer2);
        testBattle.selectMove(testTrainer1, "scratch");
        testBattle.selectMove(testTrainer2, "tackle");
        testBattle.useMove(testTrainer1, testTrainer2);
        expect(testTrainer2.activePokemon.hp).toBe(31);
      });
      test("method should use the attacker's move on the defender, subtracting the correct amount of damage for special type moves", () => {
        const test1 = new Trainer(1, "trainer1");
        const test2 = new Trainer(1, "trainer2");
        test1.catch("squirtle", 15);
        test2.catch("charmander", 15);
        const testBattle = new Battle(test1, test2);
        testBattle.selectMove(test1, "bubble");
        testBattle.selectMove(test2, "ember");
        testBattle.useMove(test1, test2);
        expect(test2.activePokemon.hp).toBe(20);
      });
      test("method should reduce the attacker's move PP by 1", () => {
        const test1 = new Trainer(1, "trainer1");
        const test2 = new Trainer(1, "trainer2");
        test1.catch("squirtle", 15);
        test2.catch("charmander", 15);
        const testBattle = new Battle(test1, test2);
        testBattle.selectMove(test1, "bubble");
        testBattle.selectMove(test2, "ember");
        testBattle.useMove(test1, test2);
        expect(test1.team[0].moves.bubble.currentPP).toBe(29);
      });
      test("pokemon health should be a minimum of 0", () => {
        const test1 = new Trainer(1, "trainer1");
        const test2 = new Trainer(1, "trainer2");
        test1.catch("squirtle", 100);
        test2.catch("charmander", 5);
        const testBattle = new Battle(test1, test2);
        testBattle.selectMove(test1, "bubble");
        testBattle.selectMove(test2, "ember");
        testBattle.useMove(test1, test2);
        expect(test2.team[0].hp).toBe(0);
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
        testBattle.fight();
        expect(testBattle.order[0].name).toBe("trainer2");
      });
      test("method should use both moves", () => {
        const testTrainer1 = new Trainer(1, "trainer1");
        const testTrainer2 = new Trainer(1, "trainer2");
        testTrainer1.catch("charmander", 15);
        testTrainer2.catch("rattata", 15);
        const testBattle = new Battle(testTrainer1, testTrainer2);
        testBattle.selectMove(testTrainer1, "ember");
        testBattle.selectMove(testTrainer2, "tackle");
        testBattle.fight();
        expect(testTrainer1.activePokemon.hp).not.toBe(36);
        expect(testTrainer2.activePokemon.hp).not.toBe(34);
      });
      test("if first defender faints, next move should not be taken", () => {
        const testTrainer1 = new Trainer(1, "trainer1");
        const testTrainer2 = new Trainer(1, "trainer2");
        testTrainer1.catch("charmander", 80);
        testTrainer2.catch("rattata", 15);
        const testBattle = new Battle(testTrainer1, testTrainer2);
        testBattle.selectMove(testTrainer1, "ember");
        testBattle.selectMove(testTrainer2, "tackle");
        testBattle.fight();
        expect(testTrainer1.activePokemon.hp).toBe(152);
        expect(testTrainer2.activePokemon.hp).toBe(0);
      });
      test("if second defender faints, next move should not be taken", () => {
        const testTrainer1 = new Trainer(1, "trainer1");
        const testTrainer2 = new Trainer(1, "trainer2");
        testTrainer1.catch("charmander", 10);
        testTrainer2.catch("rattata", 90);
        const testBattle = new Battle(testTrainer1, testTrainer2);
        testBattle.selectMove(testTrainer1, "ember");
        testBattle.selectMove(testTrainer2, "tackle");
        testBattle.fight();
        expect(testTrainer2.activePokemon.hp).toBe(154);
        expect(testTrainer1.activePokemon.hp).toBe(0);
      });
    });
  });
});
