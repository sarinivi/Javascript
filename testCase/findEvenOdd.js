const evenOdd = (num) => {
  if (typeof num !== "number") {
    return "invalid";
  }
  return (num % 2 === 0) ? "even" : "odd";
};

module.exports = { evenOdd };