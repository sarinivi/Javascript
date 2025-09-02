import csv from "csvtojson";
import pkg from "@laufire/utils/collection.js";
const { map, find, reduce } = pkg;

const costData = "./cost.csv";
const revenueData = "./revenue.csv";

const totalMonth = 12;
const profitLimit = 300000;

const costFields = ["ElectricBill", "GasBill", "EmployeeSalary", "Ingredients", "WaterBill", "ShopRent", "WifiBill"];

const revenueFields = ["coffee", "tea", "biscuit", "cake", "juice"];

const getTotal = (data, array) =>  reduce(array, (sum, field) => sum + data[field],0);

const classifyProfit = (profit) => profit >= profitLimit ? "highProfit" : "smallProfit";

const processCostAndRevenue = (cost, revenue) => {
  const totalExpense = getTotal(cost, costFields);
  const totalRevenue = getTotal(revenue, revenueFields) * totalMonth;
  const profit = totalRevenue - totalExpense;

  return {
    year: cost.year,
    totalCost: totalExpense,
    totalRevenue: totalRevenue,
    profit: profit,
    profitLevel: classifyProfit(profit),
  };
};

const processData = (expense, revenueData) =>
  map(expense, (cost) => {
    const revenue = find(revenueData, (revenue) => revenue.year === cost.year);

    return processCostAndRevenue(cost, revenue);
  });

const getInput = async () => {
const expense = await csv({ checkType: true }).fromFile(costData);
const revenue = await csv({ checkType: true }).fromFile(revenueData);

  return { expense, revenue };
};

const display = (data) => console.table(data);

const main = async () => {
  const { expense, revenue } = await getInput();
  const profitData = processData(expense, revenue);
  display(profitData);
};
main();
