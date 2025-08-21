import csv from 'csvtojson';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const subjects = ['tamil', 'english', 'maths', 'science', 'social'];

const passMarks = {
  tamil: 35,
  english: 35,
  maths: 35,
  science: 35,
  social: 35,
};

const getTotal = marks => marks.reduce((acc, cur) => acc + cur, 0);

const getResult = student =>
  subjects.find(subject => student[subject] < passMarks[subject]) ? "fail" : "pass";

const isPass = student => student.result === "pass";

const hasSameScoreAsPrev = (student, prevTotal) => student.total === prevTotal;

const calculateRank = (rank, sameRankCount, updateRank) =>
  updateRank ? rank + 1 + sameRankCount : rank;

const calculateSameRankCount = (sameRankCount, updateSameScore, updateRank) =>
  updateSameScore ? sameRankCount + 1 : updateRank ? 0 : sameRankCount;

const assignRank = (sortedMarkSheets) => {
  let rank = 0;
  let sameRankCount = 0;
  let prevTotal = null;

  return sortedMarkSheets.map(student => {
    const pass = isPass(student);
    const sameScore = hasSameScoreAsPrev(student, prevTotal);
    const updateRank = pass && !sameScore;
    const updateSameScore = pass && sameScore;

    rank = calculateRank(rank, sameRankCount, updateRank);
    sameRankCount = calculateSameRankCount(sameRankCount, updateSameScore, updateRank);
    prevTotal = student.total;

    return {
      ...student,
      rank: pass ? rank : "-"
    };
  });
};

const getCount = rankedMarkSheets => {
  const totalPassCount = rankedMarkSheets.filter(student => student.result === "pass").length;
  const totalFailCount = rankedMarkSheets.length - totalPassCount;
  return {
    students: rankedMarkSheets,
    passCount: totalPassCount,
    failCount: totalFailCount
  };
};

const updateMarkSheets = markSheets => {
  const processedMarkSheets = markSheets.map(markSheet => {
    const marks = subjects.map(subject => Number(markSheet[subject]));
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

const main = () => {
  const csvFilePath = path.join(__dirname, 'markSheetData.csv');
  csv()
    .fromFile(csvFilePath)
    .then((markSheets) => {
      const studentDetails = updateMarkSheets(markSheets);

      console.table(studentDetails.students);
      console.log("Students Pass Count:", studentDetails.passCount, "and Fail Count:", studentDetails.failCount);
    })
    .catch((err) => {
      console.error('Error reading CSV:', err);
    });
};

main();
