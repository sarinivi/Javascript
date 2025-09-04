const add = (a, b) => {
  return a + b;
}

module.exports = { add };

let x = 5;
let y = 10;
const result = add(x, y);

console.log("Result is:", result);
