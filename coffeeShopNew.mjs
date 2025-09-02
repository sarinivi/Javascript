import csv from "csvtojson";
import pkg from "@laufire/utils/collection.js";
const { map, find, reduce } = pkg;

const costData = "./cost.csv";
const revenueData = "./revenue.csv";

const revenueMonth = 12;
const profitLimit = 300000;

const costFields = ["ElectricBill", "GasBill", "EmployeeSalary", "Ingredients", "WaterBill", "ShopRent", "WifiBill"];

const revenueFields = ["coffee", "tea", "biscuit", "cake", "juice"];

const getTotal = (data, array) =>  reduce(array, (sum, field) => sum + data[field],0);

const getProfitLevel = (profit) => profit >= profitLimit ? "highProfit" : "smallProfit";

const processCostAndRevenue = (cost, revenue) => {
  const totalCost = getTotal(cost, costFields);
  const totalRevenue = getTotal(revenue, revenueFields) * revenueMonth;
  const profit = totalRevenue - totalCost;

  return {
    year: cost.Year,
    totalCost: totalCost,
    totalRevenue: totalRevenue,
    profit: profit,
    profitLevel: getProfitLevel(profit),
  };
};

const processData = (costPerYear, revenuePerYear) =>
  map(costPerYear, (cost) => {
    const revenue = find(revenuePerYear, (revenue) => revenue.Year === cost.Year);

    return processCostAndRevenue(cost, revenue);
  });

const getInput = async () => {
const costPerYear = await csv({ checkType: true }).fromFile(costData);
const revenuePerYear = await csv({ checkType: true }).fromFile(revenueData);

  return { costPerYear, revenuePerYear };
};

const displayOutput = (data) => console.table(data);

const main = async () => {
  const { costPerYear, revenuePerYear } = await getInput();
  const profitData = processData(costPerYear, revenuePerYear);
  displayOutput(profitData);
};
main();
