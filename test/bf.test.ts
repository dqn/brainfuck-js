import { Brainfuck } from "../src/bf";

describe("interpret", () => {
  it("case 1", () => {
    const bf = new Brainfuck("++++++[>++++++++<-].");
    const out = bf.interpret();
    expect(out).toBe("0");
  });
});
