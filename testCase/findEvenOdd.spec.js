const {evenOdd} = require('./findEvenOdd.js')

describe('Even or Odd function' , () => {
  test('Display even when number is even ',() => {
    expect(evenOdd(4)).toBe(("even"));
  });
  test('Display odd when number is not even',() => {
    expect(evenOdd(3)).toBe(("odd"));
  });
  test('Display even when the number is 0',() => {
    expect(evenOdd(0)).toBe(("even"));
  });
  test('Display even when the given number is negative but even',() => {
    expect(evenOdd(-4)).toBe(("even"));
  });
  test('Display odd when the given number is negative but odd',() => {
    expect(evenOdd(-3)).toBe(("odd"));
  });
  test('Display even for the large positive even number',() => {
    expect(evenOdd(100000)).toBe(("even"));
  });
  test('Display odd for the large positive odd number',() => {
    expect(evenOdd(999999)).toBe(("odd"));
  });
  test('Display "invalid" when string is given ', () => {
    expect(evenOdd("hello")).toBe("invalid");
  });
  test('Display "invalid" when null is given ', () => {
    expect(evenOdd(null)).toBe("invalid");
  });
  test('Display "invalid" when number is given in array ', () => {
    expect(evenOdd([2])).toBe("invalid");
  });

});