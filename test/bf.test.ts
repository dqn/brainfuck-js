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

  it("nextStep", () => {
    const bf = createInterpreter("++++++++[>++++++++<-]>+.");
    while (bf.nextStep());
    const out = bf.getOutput();
    expect(out).toBe("A");
  });

  it("init", () => {
    const bf = createInterpreter("+");
    bf.interpret();
    expect(bf.getMemory()).toEqual([1]);
    bf.init();
    expect(bf.getMemory()).toEqual([0]);
    bf.interpret();
    expect(bf.getMemory()).toEqual([1]);
  });

  it("empty loop", () => {
    const bf = createInterpreter("[]");
    const out = bf.interpret();
    expect(out).toBe("");
  });
});
