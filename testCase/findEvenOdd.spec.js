const { evenOdd } = require('./findEvenOdd.js');

const cases = [
    { 
        input: 4, 
        expected: "even"
    },
    { 
        input: 3, 
        expected: "odd"
    },
    { 
        input: 0, 
        expected: "even"
    },
    { 
        input: -4, 
        expected: "even"
    },
    { 
        input: -3, 
        expected: "odd"
    },
    { 
        input: 100000, 
        expected: "even" 
    },
    { 
        input: 999999, 
        expected: "odd"
    },
    { 
        input: "hello", 
        expected: "invalid"
    },
    { 
        input: null, 
        expected: "invalid" 
    },
    { 
        input: [2], 
        expected: "invalid" 
    }
  ];

describe('Even or Odd function', () => {
  cases.forEach(({ input, expected }) => {
    test("Display the given input as even or odd", () => {
      expect(evenOdd(input)).toBe(expected);
    });
  });
});
