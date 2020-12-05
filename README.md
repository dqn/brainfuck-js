# brainfuck-js

[![npm version](https://img.shields.io/npm/v/@dqn/brainfuck-js.svg)](https://www.npmjs.com/package/@dqn/brainfuck-js)
[![CI](https://github.com/dqn/brainfuck-js/workflows/CI/badge.svg)](https://github.com/dqn/brainfuck-js/actions)

Lightweight and debuggable Brainfuck interpreter.

## Installation

Using npm:

```bash
$ npm install @dqn/brainfuck-js
```

Using yarn:

```bash
$ yarn add @dqn/brainfuck-js
```

## Example

```js
const { createInterpreter } = require("@dqn/brainfuck-js");

const bf = createInterpreter("++++++++[>++++++++<-]>+.+.+.");
const output = bf.interpret(); // Return value is output string

console.log(output); // => ABC
console.log(bf.getMemory()); // => [0, 67]
console.log(bf.getMemoryIndex()); // => 1

// Initialize states
bf.init();

// Run next one step
bf.nextStep();

// Run to the end of the program
while (bf.nextStep()) {
  console.log(bf.getMemory());
  console.log(bf.getMemoryIndex());
  console.log(bf.getSrcIndex());
  console.log(bf.getOutput());
}

// With options
const bfWithOptions = createInterpreter("+[,+.-]", {
  input: "ABC",
  maxSteps: 100,
});

console.log(bfWithOptions.interpret()); // => BCD
```

## Options

| name       | type     | default                    |
| ---------- | -------- | -------------------------- |
| `input`    | `string` | `""`                       |
| `maxSteps` | `number` | `Number.POSITIVE_INFINITY` |

## License

MIT
