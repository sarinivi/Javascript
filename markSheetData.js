const markSheets = [
  { rollNo: 1, tamil: 85, english: 99, maths: 89, science: 98, social: 91 },
  { rollNo: 2, tamil: 65, english: 69, maths: 66, science: 68, social: 85 },
  { rollNo: 3, tamil: 21, english: 94, maths: 96, science: 78, social: 54 },
  { rollNo: 4, tamil: 65, english: 87, maths: 65, science: 72, social: 64 },
  { rollNo: 5, tamil: 45, english: 81, maths: 68, science: 32, social: 86 },
  { rollNo: 6, tamil: 87, english: 63, maths: 75, science: 15, social: 68 },
  { rollNo: 7, tamil: 90, english: 26, maths: 45, science: 84, social: 65 },
  { rollNo: 8, tamil: 54, english: 54, maths: 65, science: 61, social: 94 },
  { rollNo: 9, tamil: 16, english: 24, maths: 35, science: 34, social: 99 },
  { rollNo: 10, tamil: 55, english: 76, maths: 46, science: 57, social: 38 }
];

const subjects = ['tamil', 'english', 'maths', 'science', 'social'];

const passMarks = {
  tamil: 35,
  english: 35,
  maths: 35,
  science: 35,
  social: 35,
}; 

module.exports = { markSheets, subjects, passMarks };
