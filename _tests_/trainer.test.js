const Trainer = require("../trainer-class");

describe("Trainer class", () => {
  test("Trainer class should return an object", () => {
    expect(typeof new Trainer()).toBe("object");
  });
  describe("PROPERTIES", () => {
    test("instance of the trainer class should have all required properties with default values", () => {
      const testTrainer = new Trainer();
      expect(testTrainer).toHaveProperty("name", "ash");
      expect(testTrainer).toHaveProperty("max", 6);
      expect(testTrainer).toHaveProperty("team", []);
      expect(testTrainer).toHaveProperty("items", []);
    });
  });
});
