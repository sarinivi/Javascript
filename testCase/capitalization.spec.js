const { capitalize } = require('./capitalization.js')

const cases = 
    [
        {
            input:"hello",
            expected:"Hello"
        },
        {
            input:123,
            expected:"invalid"
        },
        {
            input:"",
            expected:"invalid"
        },
        {
            input:"helloworld",
            expected:"Helloworld"
        },
        {
            input:"hello world",
            expected:"Hello world"
        }
    ]
describe('Capitalize first letter',() => {
    cases.forEach(({input,expected}) => {
      test("Display the first letter of the given input to upper case", () => {
      expect(capitalize(input)).toBe(expected);
    });
  });
});