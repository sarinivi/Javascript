const capitalize = (word) => {
  if (typeof word !== "string" || word.length === 0) {
    return "invalid";
  }
  const [first, ...rest] = word;
  const capitalizedFirst = first.toUpperCase();
  const remaining = rest.join("");
  
  return capitalizedFirst + remaining;
};

module.exports = { capitalize };