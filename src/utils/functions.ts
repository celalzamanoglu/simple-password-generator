import Clipboard from "@react-native-clipboard/clipboard";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { characters as chars } from "./chars";

/* AsyncStorage adjustments to follow "Generate" button press count
const adjustGenerateCount = async () => {
  const gCount = await AsyncStorage.getItem("G_COUNTER");
  if (gCount === null) {
    AsyncStorage.setItem("G_COUNTER", "1");
  } else {
    // turn it into number and adjust the number
    let gCountNum = Number(gCount);
    gCountNum += 1;

    // if mod5 === 0 let the ad run when generate button pressed
    gCountNum % 5 === 0 ? setEnableAd(true) : setEnableAd(false);

    // turn it into str again and store it in AsyncStorage
    let gCountStr = gCountNum.toString();
    AsyncStorage.setItem("G_COUNTER", gCountStr);
  }
};
*/

export const getRandomNumber = (n: number): number => Math.floor(Math.random() * n);

export const copyToClipboard = (password: string) => Clipboard.setString(password);

export const generatePassword = (useSymbols: boolean, length: number) => {
  let n: number;
  let pw: string = "";
  let done = false;

  let includesLetter: boolean = false;
  let includesNumber: boolean = false;
  let includesSymbol: boolean = false;

  for (let i = 0; i < length; i++) {
    n = getRandomNumber(8);
    if (n === 1 && !chars.symbols.includes(pw.charAt(i - 1)) && i > 2 && useSymbols) {
      pw += chars.symbols[getRandomNumber(chars.symbols.length)];
      includesSymbol = true;
    } else if ((n === 3 || n === 4) && i > 0) {
      pw += chars.numbers[getRandomNumber(chars.numbers.length)];
      includesNumber = true;
    } else {
      pw += chars.letters[getRandomNumber(chars.letters.length)];
      includesLetter = true;
    }
  }

  // Validation for each case
  (useSymbols && includesSymbol && includesLetter && includesNumber) ||
  (!useSymbols && !includesSymbol && includesLetter && includesNumber)
    ? (done = true)
    : (done = false);

  if (done) {
    return pw;
  } else {
    return generatePassword(useSymbols, length);
  }
  // adjustGenerateCount();
};
