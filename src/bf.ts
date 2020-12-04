export type Command = ">" | "<" | "+" | "-" | "." | "," | "[" | "]";

export class Brainfuck {
  private srcIndex: number;
  private memory: number[];
  private memoryIndex: number;
  private input: string;
  private output: string;

  constructor(public src: string) {
    this.srcIndex = 0;
    this.memory = [0];
    this.memoryIndex = 0;
    this.input = "";
    this.output = "";
  }

  public interpret(): string {
    while (this.srcIndex !== this.src.length) {
      this.nextStep();
    }

    return this.output;
  }

  public nextStep() {
    switch (this.src[this.srcIndex++]) {
      case ">": {
        this.incrementDataPointer();
        break;
      }
      case "<": {
        this.decrementDataPointer();
        break;
      }
      case "+": {
        this.incrementByteAtDataPointer();
        break;
      }
      case "-": {
        this.decrementByteAtDataPointer();
        break;
      }
      case ".": {
        this.outputByteAtDataPointer();
        break;
      }
      case ",": {
        this.inputByteAtDataPointer();
        break;
      }
      case "[": {
        this.beginLoop();
        break;
      }
      case "]": {
        this.endLoop();
        break;
      }
    }
  }

  private incrementDataPointer() {
    if (this.memoryIndex === this.memory.length - 1) {
      this.memory = [...this.memory, 0];
    }
    ++this.memoryIndex;
  }

  private decrementDataPointer() {
    if (this.memoryIndex === 0) {
      this.memory = [0, ...this.memory];
    } else {
      --this.memoryIndex;
    }
  }

  private incrementByteAtDataPointer() {
    this.memory[this.memoryIndex] = (this.memory[this.memoryIndex] + 1) % 0xff;
  }

  private decrementByteAtDataPointer() {
    this.memory[this.memoryIndex] = (this.memory[this.memoryIndex] - 1) % 0xff;
  }

  private outputByteAtDataPointer() {
    this.output += this.memory[this.memoryIndex].toString();
  }

  private inputByteAtDataPointer() {
    if (this.input.length) {
      this.memory[this.memoryIndex] = this.input[0].charCodeAt(0);
      this.input = this.input.slice(1);
    } else {
      this.memory[this.memoryIndex] = 0;
    }
  }

  private beginLoop() {
    if (this.memory[this.memoryIndex]) {
      return;
    }

    for (let depth = 0; ; ) {
      if (this.srcIndex === this.src.length - 1) {
        throw new Error(`matching "]" is not found`);
      }

      ++this.srcIndex;

      if (this.src[this.srcIndex] === "[") {
        ++depth;
      } else if (this.src[this.srcIndex] === "]") {
        --depth;

        if (!depth) {
          break;
        }
      }
    }
  }

  private endLoop() {
    if (!this.memory[this.memoryIndex]) {
      return;
    }

    for (let depth = 0; ; ) {
      if (this.srcIndex === 0) {
        throw new Error(`matching "[" is not found`);
      }

      --this.srcIndex;

      if (this.src[this.srcIndex] === "]") {
        ++depth;
      } else if (this.src[this.srcIndex] === "[") {
        --depth;

        if (!depth) {
          break;
        }
      }
    }
  }
}
