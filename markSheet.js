const { markSheets, subjects, passMarks } = require('./markSheetData.js');

const getTotal = marks => marks.reduce((acc, cur) => acc + cur, 0);

const getResult = student => subjects.find(subject => student[subject] < passMarks[subject]) ? "fail" : "pass";

const assignRank = (sortedMarkSheets) => {
  let rank = 0;
  let sameRankCount = 0;
  let prevTotal = null;
  return sortedMarkSheets.map(student => {
    const isPass = student.result === "pass";
    const sameScore = student.total === prevTotal;
    const updateRank = isPass && sameScore === false;
    const updateSameScore = isPass && sameScore === true;
    rank = updateRank ? rank + 1 + sameRankCount : rank;
    sameRankCount = updateSameScore ? sameRankCount + 1 : 0;
    prevTotal = student.total;
    return {
      ...student,
      rank: isPass ? rank : "-"
    };
  });
};

const updatedMarkSheets = markSheets => {
  const processedMarkSheets = markSheets.map(markSheet => {
    const marks = subjects.map(subject => markSheet[subject]);
    return {
      ...markSheet,
      total: getTotal(marks),
      result: getResult(markSheet)
    };
  });
  const sortedMarkSheets = processedMarkSheets.sort((a, b) => b.total - a.total);
  return assignRank(sortedMarkSheets);
};

const main = () => {
 console.table(updatedMarkSheets(markSheets));
};
main();



