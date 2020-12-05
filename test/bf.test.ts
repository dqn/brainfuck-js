import { createInterpreter } from "../src/bf";

describe("interpret", () => {
  it("case 1", () => {
    const bf = createInterpreter("++++++[>++++++++<-].");
    const out = bf.interpret();
    expect(out).toBe("0");
  });
});
