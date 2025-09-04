const { evenOdd } = require('./findEvenOdd.js');

describe('Even or Odd function', () => {
  const cases = [
    { input: 4, expected: "even", display: "even number" },
    { input: 3, expected: "odd", display: "odd number" },
    { input: 0, expected: "even", display: "zero (0)" },
    { input: -4, expected: "even", display: "negative even number" },
    { input: -3, expected: "odd", display: "negative odd number" },
    { input: 100000, expected: "even", display: "large positive even number" },
    { input: 999999, expected: "odd", display: "large positive odd number" },
    { input: "hello", expected: "invalid", display: "string input" },
    { input: null, expected: "invalid", display: "null input" },
    { input: [2], expected: "invalid", display: "array input" },
  ];

  cases.forEach(({ input, expected, display }) => {
    test(`Display "${expected}" when given ${display}`, () => {
      expect(evenOdd(input)).toBe(expected);
    });
  });
});
