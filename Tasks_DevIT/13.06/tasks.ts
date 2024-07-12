// _____________________________
// STRINGS

// 1.
// function charAtConcat(string1: string, string2: string): string {
//   const char1: string = string1.charAt(0);
//   const char2: string = string2.charAt(4);
//   return char1.concat(char2);
// }

// console.log(charAtConcat("I love", "JavaScript"));

// 2.
// function sliceIncludes(str: string) {
//   return str.slice(28).includes("JavaScript");
// }
// console.log(
//   sliceIncludes(
//     "I know 4 foreign languages: ukrainian, russian, english and JavaScript"
//   )
// );

// 3.
// function strSplit(str: string) {
//   return str.split(" ", 5);
// }
// console.log(strSplit("Ще не вмерла в Україні ні слава, ні воля"));

// 4.
// function repeatLastIndex(str: string) {
//   const strRepeat: string = str.repeat(3);
//   const strLastIndex: number = strRepeat.lastIndexOf("C");
//   return strLastIndex;
// }
// console.log(repeatLastIndex("ACHTUNG"));

// 5.
// function replace(str: string) {
//   const country: RegExp = /Америка/gi;
//   return str.replace(country, "Україна");
// }
// console.log(replace("Америка - найкраща країна у світі"));

// _____________________________
// ARRAYS

// 1.
// let arr: Array<string> = ["Україна", "Америка", "Португалія", "росія"];
// function popPush(arr: Array<string>): Array<string> {
//   const popArr: string | undefined = arr.pop();
//   const pushArr: number = arr.push("Іспанія");
//   return arr;
// }
// console.log(popPush(arr));

//2.
// let arr: Array<string> = ["єнот", "лисиця", "заєць", "їжак", "ведмідь"];
// function reverseShift(arr: Array<string>): Array<string> {
//   const shifted: string | undefined = arr.reverse().shift();
//   return arr;
// }
// console.log(reverseShift(arr));

// 3.
// const arr: Array<string> = ["полуниця", "слива", "банан", "яблуко", "груша"];
// function sortUnshift(arr: Array<string>): Array<string> {
//   const sortedArr: Array<string> = arr.sort();
//   const unshiftedArr: number = arr.unshift("ананас");
//   return arr;
// }
// console.log(sortUnshift(arr));

// 4.
// const arr: Array<string> = ["Київ", "Запоріжжя", "Житомир", "Вінниця", "Харків"];
// function sliceSplice(arr: Array<string>): Array<string> {
//   const slicedArr = arr.slice(1, 4);
//   slicedArr.splice(2, 0, "Одеса");
//   return slicedArr;
// }
// console.log(sliceSplice(arr));

// 5.
// type TNumberOrNumbers = number | TNumberOrNumbers[];
// const arr: TNumberOrNumbers[] = [123, 233, [31, 40, [225, 6]]];

// function flatFilter(arr: number[]): Array<number> {
//   const flattedArr: number[] = arr.flat(2);
//   const filteredArr: number[] = flattedArr.filter((e) => e > 100);
//   return filteredArr;
// }
// console.log(flatFilter(arr as number[]));

// _____________________________
// NUMBERS

// 1.
// let a: number = 4.33;
// let b: number = 5.66;
// let c: number = 24.74;

// function minCeil(a: number, b: number, c: number): number {
//   let minNum: number = Math.min(a, b, c);
//   let ceiledNum: number = Math.ceil(minNum);
//   return ceiledNum;
// }
// console.log(minCeil(a, b, c));

// 2.
// let a: number = 7.77;
// let b: number = 8.88;
// let c: number = 9.99;

// function maxFloor(a: number, b: number, c: number): number {
//   let maxNum: number = Math.max(a, b, c);
//   let flooredNum: number = Math.floor(maxNum);
//   return flooredNum;
// }
// console.log(maxFloor(a, b, c));

// 3.
// function formatNumber(num: number): object {
//   return {
//     fixed: num.toFixed(2),
//     locale: num.toLocaleString(),
//     precision: num.toPrecision(3),
//   };
// }

// const number: number = 12345.6789;
// console.log(formatNumber(number));

// 4.
// function getRandomNumber(): number {
//   return Math.random();
// }
// console.log(getRandomNumber());

// 5.
// function absoluteValue(num: number): number {
//   return Math.abs(num);
// }

// const number: number = -9;
// console.log(absoluteValue(number));
