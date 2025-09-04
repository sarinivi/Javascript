const { capitalize } = require('./capitalization.js')

describe('Capitalize first letter',() => {
    const cases = 
    [
        {input:"hello",expected:"Hello",display:"capitalized first letter"},
        {input:123,expected:"invalid",display:"Invalid input"},
        {input:"",expected:"invalid",display:"Invalid input"},
        {input:"helloworld",expected:"Helloworld",display:" capitalized first letter"},
        {input:"hello world",expected:"Hello world",display:"capitalized first letter"}
    ]
    cases.forEach(({input,expected,display}) => {
      test(`Display "${expected}" when given "${display}"`, () => {
      expect(capitalize(input)).toBe(expected);
    });
    });
    });