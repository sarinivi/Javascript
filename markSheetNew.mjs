import csv from "csvtojson";
import pkg from '@laufire/utils/collection.js';
const { map, keys, reduce, find } = pkg;

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
  find(marks, (mark, index) => mark < subjectWisePassMarks[subjects[index]])
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

  return markSheets.map((markSheet, index, array) =>
    ({
      ...markSheet,
      rank: markSheet.result === "pass"
        ? (lastAssignedRank = checkPreviousTotalAndAssignRank(array, index, lastAssignedRank))
        : undefined
    })
  );
};

const checkPreviousTotalAndAssignRank = (sheets, index, lastAssignedRank) =>
    sheets[index - 1]?.total === sheets[index].total
      ? lastAssignedRank  
      : index + 1;

const countResults = (processedMarkSheets) => {
  let pass = 0;
  let fail = 0;
 processedMarkSheets.map(markSheet => markSheet.result === "pass" ? ++pass : ++fail);

  return { pass, fail };
};


const processMarkSheets = (markSheets) => {
  const processedMarkSheets = map(markSheets, processMarkSheet);    
  const sortedMarkSheets = processedMarkSheets.sort((a, b) =>  {
    if (a.result !== b.result) {
    return a.result === "pass" ? -1 : 1;
  }

   return b.total - a.total;
});
  const rankedMarkSheets = assignRank(sortedMarkSheets);  

  return rankedMarkSheets;
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

const displayResult = (result) => {
  console.table(result);
  const { pass, fail } = countResults(result);
  console.log("Pass Count :", pass);
  console.log("Fail Count :", fail);
};

const main = async () => {
  const markSheets = await readInputFile();          
  const processedMarkSheets = processMarkSheets(markSheets);
  displayResult(processedMarkSheets);                        
};
main();