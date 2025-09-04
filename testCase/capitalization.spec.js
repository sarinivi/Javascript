const { capitalize } = require('./capitalization.js')

describe('Capitalize first letter',() => {
    test('Display "hello" to "Hello"',() => {
        expect(capitalize("hello")).toBe(("Hello"));
    });
    test('Display 123 to "invalid"',() => {
        expect(capitalize(123)).toBe(("invalid"));
    });
    test('Display "" to "invalid"',() => {
        expect(capitalize("")).toBe(("invalid"));
    });
    test('Display "helloworld" to "Helloworld"',() => {
        expect(capitalize("helloworld")).toBe(("Helloworld"));
    });
    test('Display "hello world" to "Hello world"',() => {
        expect(capitalize("hello world")).toBe(("Hello world"));
    });
}); 