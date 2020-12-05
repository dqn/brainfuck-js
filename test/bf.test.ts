import { createInterpreter } from "../src/bf";

describe("interpret", () => {
  it("0", () => {
    const bf = createInterpreter("++++++[>++++++++<-]>.");
    const out = bf.interpret();
    expect(out).toBe("0");
  });

  it("Hello World!", () => {
    const bf = createInterpreter(
      "+++++++++[>++++++++>+++++++++++>+++>+<<<<-]>.>++.+++++++..+++.>+++++.<<+++++++++++++++.>.+++.------.--------.>+.>+.",
    );
    const out = bf.interpret();
    expect(out).toBe("Hello World!\n");
  });

  it("with input", () => {
    const bf = createInterpreter(",.,.,.", { input: "ABC" });
    const out = bf.interpret();
    expect(out).toBe("ABC");
  });

  it("with max steps", () => {
    const bf = createInterpreter("+[>+<]", { maxSteps: 100 });
    expect(() => {
      bf.interpret();
    }).toThrow(new Error("exceeded max steps"));
    expect(bf.getMemory()).toEqual([1, 20]);
  });
});
