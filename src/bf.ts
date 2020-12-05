export type Command = ">" | "<" | "+" | "-" | "." | "," | "[" | "]";

type Interpreter = {
  interpret: () => string;
  nextStep: () => void;
};

export function createInterpreter(src: string): Interpreter {
  let srcIndex: number = 0;
  let memory: number[] = [0];
  let memoryIndex: number = 0;
  let input: string = "";
  let output: string = "";

  const interpret = (): string => {
    while (srcIndex !== src.length) {
      nextStep();
    }

    return output;
  };

  const nextStep = () => {
    switch (src[srcIndex++]) {
      case ">": {
        incrementDataPointer();
        break;
      }
      case "<": {
        decrementDataPointer();
        break;
      }
      case "+": {
        incrementByteAtDataPointer();
        break;
      }
      case "-": {
        decrementByteAtDataPointer();
        break;
      }
      case ".": {
        outputByteAtDataPointer();
        break;
      }
      case ",": {
        inputByteAtDataPointer();
        break;
      }
      case "[": {
        beginLoop();
        break;
      }
      case "]": {
        endLoop();
        break;
      }
    }
  };

  const incrementDataPointer = () => {
    if (memoryIndex === memory.length - 1) {
      memory = [...memory, 0];
    }
    ++memoryIndex;
  };

  const decrementDataPointer = () => {
    if (memoryIndex === 0) {
      memory = [0, ...memory];
    } else {
      --memoryIndex;
    }
  };

  const incrementByteAtDataPointer = () => {
    memory[memoryIndex] = (memory[memoryIndex] + 1) % 0xff;
  };

  const decrementByteAtDataPointer = () => {
    memory[memoryIndex] = (memory[memoryIndex] - 1) % 0xff;
  };

  const outputByteAtDataPointer = () => {
    output += memory[memoryIndex].toString();
  };

  const inputByteAtDataPointer = () => {
    if (input.length) {
      memory[memoryIndex] = input[0].charCodeAt(0);
      input = input.slice(1);
    } else {
      memory[memoryIndex] = 0;
    }
  };

  const beginLoop = () => {
    if (memory[memoryIndex]) {
      return;
    }

    for (let depth = 0; ; ) {
      if (srcIndex === src.length - 1) {
        throw new Error(`matching "]" is not found`);
      }

      ++srcIndex;

      if (src[srcIndex] === "[") {
        ++depth;
      } else if (src[srcIndex] === "]") {
        --depth;

        if (!depth) {
          break;
        }
      }
    }
  };

  const endLoop = () => {
    if (!memory[memoryIndex]) {
      return;
    }

    for (let depth = 0; ; ) {
      if (srcIndex === 0) {
        throw new Error(`matching "[" is not found`);
      }

      --srcIndex;

      if (src[srcIndex] === "]") {
        ++depth;
      } else if (src[srcIndex] === "[") {
        --depth;

        if (!depth) {
          break;
        }
      }
    }
  };

  return {
    interpret,
    nextStep,
  };
}
