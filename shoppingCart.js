var rates = {
  Carrot: 10,
  Apple: 200,
  Guava: 50,
};

var discounts = {
  // values are in percentages.
  Apple: 10
};

var taxes = {
  // values are in percentages.
  Carrot: 5,
  Guava: 10
};

var purchases = [
  {
    item: 'Carrot',
    units: 20,
  },
  {
    item: 'Apple',
    units: 2,
  },
  {
    item: 'Guava',
    units: 1,
  }
];
/* Functions */
const getDiscountPercent = (productName) => discounts[productName] ? discounts[productName] : 0;
  
const getTaxPercent = (productName) => taxes[productName] ? taxes[productName] : 0; 

const getUnitPrice = (itemName) => rates[itemName];

const getLineItemPrice = (lineItem) => lineItem.units * getUnitPrice(lineItem.item);

const getSum = () => {
   return purchases.reduce((acc,cur) => {
   const itemPrice = getLineItemPrice(cur);
   const afterDiscount = itemPrice - (getDiscountPercent(cur.item)/100) * itemPrice;
   const afterTax = afterDiscount +  (getTaxPercent(cur.item)/100) * afterDiscount;
   return acc + afterTax;
  },0)
};

// Do not change below this line.
/* Main Function */
const main = () => {
  console.log("Total Bill :",getSum());
  }

main();

//Find total price for items in cart.