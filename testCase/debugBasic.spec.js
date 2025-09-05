const { add } = require('./debugBasic');

const cases = [
  {
    a:5,
    b:10,
    expected:15
  },
  {
    a:0,
    b:0,
    expected:0
  },
  {
    a:-5,
    b:-10,
    expected:-15
  },
  {
    a:10,
    b:-5,
    expected:5
  }
]
describe('add function', () => {
cases.forEach(({ a,b, expected }) => {
  test("Display the output for the addition of numbers",() => {
   expect(add(a,b)).toBe(expected);
  });
 });
});



