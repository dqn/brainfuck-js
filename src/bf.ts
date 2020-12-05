export type Command = ">" | "<" | "+" | "-" | "." | "," | "[" | "]";

type Interpreter = {
  getSrc(): string;
  getSrcIndex(): number;
  getMemory(): number[];
  getMemoryIndex(): number;
  getOutput(): string;
  init(): void;
  interpret(): string;
  nextStep(): boolean;
};

type InterpreterOptions = {
  input?: string;
  maxSteps?: number;
};

export function createInterpreter(
  src: string,
  options?: InterpreterOptions,
): Interpreter {
  // MUST BE INITIALIZED IN `init`
  let srcIndex: number;
  let memory: number[];
  let memoryIndex: number;
  let output: string;
  let input: string;

  const maxSteps = options?.maxSteps ?? Number.POSITIVE_INFINITY;

  const init = () => {
    srcIndex = 0;
    memory = [0];
    memoryIndex = 0;
    output = "";
    input = options?.input ?? "";
  };

  const interpret = (): string => {
    for (let steps = 0; nextStep(); ++steps) {
      if (steps > maxSteps) {
        throw new Error("exceeded max steps");
      }
    }

    return output;
  };

  const nextStep = (): boolean => {
    if (srcIndex === src.length) {
      return false;
    }

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

    return srcIndex !== src.length;
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
    output += String.fromCharCode(memory[memoryIndex]);
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

  const getSrc = (): string => {
    return src;
  };

  const getSrcIndex = (): number => {
    return srcIndex;
  };

  const getMemory = (): number[] => {
    return memory;
  };

  const getMemoryIndex = (): number => {
    return memoryIndex;
  };

  const getOutput = (): string => {
    return output;
  };

  init();

  return {
    getSrc,
    getSrcIndex,
    getMemory,
    getMemoryIndex,
    getOutput,
    init,
    interpret,
    nextStep,
  };
}
