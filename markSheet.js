import csvToJson from 'csvtojson';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from '@laufire/utils/collection.js';
const { map, find, values, keys } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));

const subjectWisePassMarks = {
  tamil: 35,
  english: 35,
  maths: 35,
  science: 35,
  social: 35,
};

const getTotal = marks => marks.reduce((acc, cur) => acc + cur, 0);

const getResult = markSheet =>
 find((subjectWisePassMarks), (mark, subject) => markSheet[subject] < mark) ? "fail" : "pass";

const isPass = student => student.result === "pass";

const hasSameScoreAsPrev = (student, prevTotal) => student.total === prevTotal;

const calculateRank = (rank, sameRankCount, updateRank) =>
  updateRank ? rank + 1 + sameRankCount : rank;

const calculateSameRankCount = (sameRankCount, updateSameScore, updateRank) =>
  updateSameScore ? sameRankCount + 1 : updateRank ? 0 : sameRankCount;

const assignRank = (sortedMarkSheets) => {
  let rank = 0;
  let sameRankCount = 0;
  let prevTotal = 0;

  return sortedMarkSheets.map(markSheet => {
    const pass = isPass(markSheet);
    const sameScore = hasSameScoreAsPrev(markSheet, prevTotal);
    const updateRank = pass && !sameScore;
    const updateSameScore = pass && sameScore;
    rank = calculateRank(rank, sameRankCount, updateRank);
    sameRankCount = calculateSameRankCount(sameRankCount, updateSameScore, updateRank);
    prevTotal = markSheet.total;
    return {
      ...markSheet,
      rank: pass ? rank : "-"
    };
  });
};

const getCount = rankedMarkSheets => {
  const passCount = rankedMarkSheets.filter(isPass).length;
  const failCount = rankedMarkSheets.length - passCount;
  return {
    students: rankedMarkSheets,
    passCount: passCount,
    failCount: failCount
  };
};

const updateMarkSheets = markSheets => {
  const processedMarkSheets = map(markSheets, (markSheet) => {
    
    const marks = map(keys(subjectWisePassMarks), (subject) => Number(markSheet[subject]));
    return {
      ...markSheet,
      total: getTotal(marks),
      result: getResult(markSheet)
    };
  });
  const sortedMarkSheets = processedMarkSheets.sort((a, b) => b.total - a.total);
  const rankedMarkSheets = assignRank(sortedMarkSheets);
  return getCount(rankedMarkSheets);
};

const getInput = async () => {
  const markSheets = await csvToJson().fromFile(path.join(__dirname, 'markSheetData.csv'));
  return  markSheets ;
};

const main = async () => {
  try {
    const inputData = await getInput();
    const studentDetails = updateMarkSheets(inputData);

    console.table(studentDetails.students);
    console.log("Students Pass Count:", studentDetails.passCount, "and Fail Count:", studentDetails.failCount);
  } catch (err) {
    console.error('Error reading CSV:', err);
  }
};
main();

