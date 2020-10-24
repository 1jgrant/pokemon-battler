const { types, matrix } = require("../types");

describe("pokemon types and their strengths/weakness multipliers", () => {
  test("should be able to return the correct multipliers from the matrix", () => {
    const normal = 0;
    const fire = 8;
    const water = 9;
    const grass = 10;
    expect(matrix[normal][fire]).toBe(1);
    expect(matrix[fire][water]).toBe(0.5);
    expect(matrix[grass][water]).toBe(2);
    expect(matrix[grass][grass]).toBe(0.5);
  });
});
