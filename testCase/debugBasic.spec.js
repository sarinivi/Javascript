const { add } = require('./debugBasic');

describe('add function', () => {
  test('correctly adds two positive numbers', () => {
    expect(add(5, 10)).toBe(15);
  });

  test('returns 0 when adding 0 and 0', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('correctly adds negative numbers', () => {
    expect(add(-5, -10)).toBe(-15);
  });

  test('correctly adds a positive and a negative number', () => {
    expect(add(10, -5)).toBe(5);
  });
});
