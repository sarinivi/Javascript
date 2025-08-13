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
var getDiscountPercent = function (productName) {
  if(discounts[productName]){
    return discounts[productName];
  }
  return 0;
};

var getTaxPercent = function (productName) {
  if(taxes[productName]){
    return taxes[productName];
  }
  return 0;
    
};

var getUnitPrice = function (itemName) {
    if(rates[itemName]){
      return rates[itemName];
    }
};

var getSum = function () {
   return purchases.reduce((acc,cur) => {
   let itemPrice = cur.units * getUnitPrice(cur.item);
   let discountPrice = itemPrice - (getDiscountPercent(cur.item)/100) * itemPrice;
   let taxPrice = discountPrice +  (getTaxPercent(cur.item)/100) * discountPrice;
   return acc + taxPrice ;
  },0)
};

// Do not change below this line.
/* Main Function */
var main = function main() {
  console.log("Total Bill :",getSum());
  }

main();

//Find total price for items in cart.