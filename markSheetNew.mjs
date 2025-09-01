import csv from "csvtojson";
import pkg from '@laufire/utils/collection.js';
import pkg1 from '@laufire/utils/crunch.js';
const { map, keys, reduce } = pkg;
const {index } = pkg1;

const inputData = './markSheetData.csv';

const subjectWisePassMarks = {
  tamil: 35,
  english: 35,
  maths: 35,
  science: 35,
  social: 35,
};

const subjects = keys(subjectWisePassMarks);

const getTotal = (marks) =>
  reduce(marks, (currentMark, nextMark) => currentMark + nextMark, 0);

const getResult = (marks, subjects) =>
  marks.find((mark, index) => mark < subjectWisePassMarks[subjects[index]])
    ? "fail"
    : "pass";

const processMarkSheet = (markSheet) => {
  const marks = map(subjects, (subject) => markSheet[subject]);

  return {
    ...markSheet,
    total: getTotal(marks),
    result: getResult(marks, subjects),
  };
};

const assignRank = (markSheets) => {
  let lastAssignedRank = 0;

  return markSheets.map((markSheet, index, array) => ({
    ...markSheet,
    rank: (lastAssignedRank = checkPreviousTotalAndAssignRank(array, index, lastAssignedRank))
  }));
};

const checkPreviousTotalAndAssignRank = (sheets, index, lastAssignedRank) =>
    sheets[index - 1]?.total === sheets[index].total
      ? lastAssignedRank  
      : index + 1;

const processMarkSheets = (markSheets) => {
  const processedMarkSheets = map(markSheets, processMarkSheet);
  const indexedMarkSheets = index(processedMarkSheets, ["result"]);
  const passedMarkSheets  = indexedMarkSheets["pass"];
  const failedMarkSheets  = indexedMarkSheets["fail"];

  const sortedPassMarkSheets = passedMarkSheets.sort((a, b) => b.total - a.total);
  const rankedPassMarkSheets = assignRank(sortedPassMarkSheets);

  return {
    updatedMarkSheets: [...rankedPassMarkSheets, ...failedMarkSheets],
    passCount: passedMarkSheets.length,
    failCount: failedMarkSheets.length,
  };
};

const readInputFile = async () => {
  const markSheets = await csv({
    colParser: {
      "column1": "omit",
      "column2": "string",
    },
    checkType: true,
  }).fromFile(inputData);
  return markSheets;
};

const displayResult = ({ updatedMarkSheets, passCount, failCount }) => {
  console.table(updatedMarkSheets);
  console.log("Pass Count :", passCount);
  console.log("Fail Count :", failCount);
};

const main = async () => {
  const markSheets = await readInputFile();
  const processedMarkSheets = processMarkSheets(markSheets);
  displayResult(processedMarkSheets);
};
main();