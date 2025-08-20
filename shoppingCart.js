// Refactored shoppingCart.js
const rates = {
  Carrot: 10,
  Apple: 200,
  Guava: 50,
};

const discounts = {
  Apple: 10, // values are in percentages
};

const taxes = {
  Carrot: 5,
  Guava: 10, // values are in percentages
};

const purchases = [
  { item: 'Carrot', units: 20 },
  { item: 'Apple', units: 2 },
  { item: 'Guava', units: 1 },
];

// Functions
const getDiscountPercent = (productName) => discounts[productName] || 0;

const getTaxPercent = (productName) => taxes[productName] || 0;

const getUnitPrice = (itemName) => rates[itemName];

const getLineItemPrice = ({ item, units }) => units * getUnitPrice(item);

const getSum = () => {
  return purchases.reduce((acc, { item, units }) => {
    const itemPrice = getLineItemPrice({ item, units });
    const discountPrice = itemPrice - (getDiscountPercent(item) / 100) * itemPrice;
    const taxPrice = discountPrice + (getTaxPercent(item) / 100) * discountPrice;
    return acc + taxPrice;
  }, 0);
};

// Main function
const main = () => {
  console.log("Total Bill :", getSum());
};
main();
