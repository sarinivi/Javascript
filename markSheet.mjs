import { markSheets } from './markSheetData.mjs';

const getTotal = marks => marks.reduce((acc, cur) => acc + cur, 0);

const getResult = marks => marks.every(mark => mark >= 35) ? "PASS" : "FAIL";

const getRank = updateMarkSheet => {
  let rank = 0;
  return updateMarkSheet
    .sort((a, b) => b.total - a.total)
    .map(student => ({ ...student, rank: student.result === "PASS" ? ++rank : "-" }));
};
const processMarkSheet = markSheets =>
  markSheets.map(student => {
    const marks = Object.values(student).slice(1);
    return { ...student, total: getTotal(marks), result: getResult(marks) };
  });
const main = () => {
  const updateMarkSheet = processMarkSheet(markSheets);
  const rankedMarkSheet = getRank(updateMarkSheet);
  console.table(rankedMarkSheet);
};
main();