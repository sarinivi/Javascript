import csv from "csvtojson";
import pkg from '@laufire/utils/collection.js';
const { map, keys, reduce, find, sort, filter } = pkg;

const inputData = './markSheetData.csv';

const subjectWisePassMarks = {
  tamil: 35,
  english: 35,
  maths: 35,
  science: 35,
  social: 35,
};

const getTotal = (marks) =>
  reduce(marks, (curMark, nextMark) => curMark + nextMark, 0);

const getResult = (marks, subjects) =>
  find(marks, (mark, index) => mark < subjectWisePassMarks[subjects[index]]) ? "fail" : "pass";

const processMarkSheet = (markSheet) => {
    const subjects = keys(subjectWisePassMarks);
    const marks = map(subjects, (subject) => markSheet[subject]); 
    return {
      ...markSheet,
      total: getTotal(marks),
      result: getResult(marks, subjects),
    };
  };

const assignRank = (markSheets) =>
  map(markSheets, (markSheet, index, array) => ({
    ...markSheet,
    Rank: markSheet.result === "pass"
      ? 1 +
        filter(array, (student) => student.result === "pass" && student.total > markSheet.total).length
      : "-", 
  }));

const getCounts = (processedMarkSheets) => ({
  passCount: filter(processedMarkSheets, (markSheet) => markSheet.result === "pass").length,
  failCount: filter(processedMarkSheets, (markSheet) => markSheet.result === "fail").length,
});

const processMarkSheets = (markSheets) =>
  assignRank(sort(map(markSheets, processMarkSheet), (a, b) => b.total - a.total));

const getInput = async () => {
  const markSheets = await csv({
    colParser: {
      "column1": "omit",
      "column2": "string",
    },
    checkType: true,
  }).fromFile(inputData);
  return markSheets;
};

const displayMarkSheets = async () => processMarkSheets(await getInput());

const main = async () => {
  const result = await displayMarkSheets();
  console.table(result);
  const { passCount, failCount } = getCounts(result);
  console.log("Pass Count :", passCount);
  console.log("Fail Count :", failCount);
};

main();

