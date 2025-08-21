import pkg from '@laufire/utils/collection.js';
const { map } = pkg;

const products = {
  apple: 100,
  banana: 40,
  orange: 60
};

const applyDiscount = (price, percent) => price - (price * percent / 100);

const discountedProducts = map(products, (value) => applyDiscount(value, 20));

console.log(discountedProducts);



