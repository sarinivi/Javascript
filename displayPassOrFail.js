import pkg from '@laufire/utils/collection.js';
const { map } = pkg;

const students = {
  Arun: 72,
  Babu: 45,
  Chandra: 90,
  Divya: 30,
};

const displayPassOrFail = map(students, (value) => value > 35 ? "pass" : "fail");

console.log(displayPassOrFail);