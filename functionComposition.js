// random number
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// generate random character
const getRandomCharacter = () => String.fromCharCode(getRandomNumber(97, 122));

// random string
const getRandomString = (length) => {
    let generatedRandomString = "";
  for (let i = 0; i < length; i++) {
       generatedRandomString += getRandomCharacter();
    }
    return generatedRandomString;
};

const getRandomUUID = (lengthsArray) => {
  return lengthsArray
    .map((stringLength) => getRandomString(stringLength))
    .join("-");
};

const main = () => {
    console.log(getRandomNumber(97, 122));
    console.log(getRandomCharacter());
    console.log(getRandomString(8));
    const myArr = [8, 4, 4, 4, 12];
    console.log(getRandomUUID(myArr));
};
main();