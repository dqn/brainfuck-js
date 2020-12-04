import { interpret } from "../src/bf";

describe("interpret", () => {
  it("case 1", () => {
    const out = interpret("+++");
    expect(out).toBe("");
  });
});
