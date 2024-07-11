// __________________________________________________________________

// STRING

// TASK 1

// function mirrorString(str: string): string {
//   let reversedStr: string = str.split("").reverse().join("");
//   return reversedStr;
// }
// let text: string = "some text that has been reversed";
// console.log(mirrorString(text)); // desrever neeb sah taht txet emos

// TASK 2

// function searchPolindrom(str: string): string {
//   let reversedStr: string = str.split("").reverse().join("");
//   return str === reversedStr ? "Поліндром" : "Не поліндром";
// }

// let isPolindrom: string = "Some text that mustn't be a polyndrom";

// console.log(searchPolindrom(isPolindrom)); // Строка Some text that mustn't be a polyndrom - не полиндром

// TASK 3

// function countVowels(str: string): number {
//   const vowelRegex: RegExp = /[aeiouAEIOU]/g;
//   const matches: IterableIterator<RegExpMatchArray> = str.matchAll(vowelRegex);
//   const count: number = [...matches].length;
//   return count;
// }

// console.log(countVowels("Some text for example")); // 7

// TASK 4

// function toPascalCase(str: string): string {
//   let modifiedStr: string = str
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join("");
//   return modifiedStr;
// }
// const inputStringForExample: string = "Example String for Conversion";
// const pascalCase: string = toPascalCase(inputStringForExample);
// console.log(`PascalCase: ${pascalCase}`); // ExampleStringForConversion

// TASK 5

// function toSnakeCase(str: string): string {
//   let modifiedStr: string = str
//     .split(" ")
//     .map((word) => word.toLowerCase())
//     .join("_");
//   return modifiedStr;
// }
// const inputStringForExample: string = "Example String for Conversion";
// const snakeCase: string = toSnakeCase(inputStringForExample);
// console.log(`Snake_case: ${snakeCase}`); // example_string_for_conversion

// __________________________________________________________________

// NUMBERS

// TASK 1

// function getRandomInteger(min: number, max: number): number {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min) + min);
// }
// console.log(getRandomInteger(1, 10)); // Случайное число от 1 до 10 включительно
// console.log(getRandomInteger(20, 30)); // Случайное число от 20 до 30 включительно
// console.log(getRandomInteger(-10, 10)); // Случайное число от -10 до 10 включительно

// TASK 2

// function roundToDecimal(number: number, decimals: number): string {
//   return number.toFixed(decimals);
// }

// console.log(roundToDecimal(3.1415926535, 2)); // 3.14
// console.log(roundToDecimal(1.123456789, 4)); // 1.1235
// console.log(roundToDecimal(10.5, 0)); // 11
// console.log(roundToDecimal(123.456, 1)); // 123.5

// TASK 3

// function sumFloatingPointNumbers(numbers: number[]): number {
//   let total: number = numbers.reduce(function (a, b) {
//     return a + b;
//   });
//   let res = Math.round(total * 10 ** 10);
//   return res / 10 ** 10;
// }

// console.log(sumFloatingPointNumbers([0.1, 0.2, 0.3])); // 0.6
// console.log(sumFloatingPointNumbers([1.1, 2.2, 3.3])); // 6.6
// console.log(sumFloatingPointNumbers([0.123, 0.456, 0.789])); // 1.368
// console.log(sumFloatingPointNumbers([10.5, 20.5, 30.5])); // 61.5

// TASK 4

// function isPrime(num: number): boolean {
//   for (let i = 2; num > i; i++) {
//     if (num % i == 0) {
//       return false;
//     }
//   }
//   return num > 1;
// }
// console.log(isPrime(2)); // true
// console.log(isPrime(4)); // false
// console.log(isPrime(17)); // true
// console.log(isPrime(18)); // false
// console.log(isPrime(29)); // true

// TASK 5

// function gcd(a: number, b: number): number {
//   while (b !== 0) {
//     const temp = b;
//     b = a % b;
//     a = temp;
//   }
//   return a;
// }
// console.log(gcd(48, 18)); // 6
// console.log(gcd(56, 98)); // 14
// console.log(gcd(101, 103)); // 1
// console.log(gcd(44, 19)); // 1
// console.log(gcd(270, 192)); // 6

// __________________________________________________________________

// ARRAYS

// TASK 1

// function secondLargest(arr: Array<number>): number {
//   const sortedValues: Array<number> = arr.sort((a, b) => a - b);
//   sortedValues.pop();
//   return Math.max(...sortedValues);
// }
// console.log(secondLargest([1, 2, 3, 4, 5])); // 4
// console.log(secondLargest([10, 20, 20, 30])); // 20
// console.log(secondLargest([5, 7, 7, 8, 3])); // 7

// TASK 2

// function mergeAndSort(arr1: Array<number>, arr2: Array<number>) {
//   let arrConcat: number[] = arr1.concat(arr2);
//   let sortedArr: Array<number> = arrConcat.sort((a, b) => a - b);
//   let noDupl: Set<number> = new Set(sortedArr);
//   return noDupl;
// }

// console.log(mergeAndSort([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
// console.log(mergeAndSort([10, 20], [20, 30])); // [10, 20, 30]
// console.log(mergeAndSort([5, 7, 9], [5, 7, 11])); // [5, 7, 9, 11]

// TASK 3

// function shuffleArray(arr: Array<number | string>) {
//   return arr.slice().sort(() => Math.random() - 0.5);
// }
// console.log(shuffleArray([1, 2, 3, 4, 5])); // К примеру будет 2, 3, 5, 4, 1
// console.log(shuffleArray(["a", "b", "c", "d"])); // К примеру будет b, a, d, c

// TASK 4

// function findPairsForEachFilter(
//   arr: Array<number>,
//   target: number
// ): Array<[number, number]> {
//   const pairs: Array<[number, number]> = [];
//   const uniqueVal: Set<number> = new Set();
//   arr.forEach((num) => {
//     const num2: number = target - num;
//     if (uniqueVal.has(num2)) {
//       pairs.push([num, num2]);
//     } else {
//       uniqueVal.add(num);
//     }
//   });
//   return pairs;
// }

// console.log(findPairsForEachFilter([1, 2, 3, 4, 5], 5)); // [[3, 2], [4, 1]]
// console.log(findPairsForEachFilter([10, 20, 10, 30, 40], 50)); // [[40, 10], [30, 20]]
// console.log(findPairsForEachFilter([5, 5, 10, 15], 20)); // [[15, 5]]

// TASK 5

// function removeFalsyValues(
//   arr: Array<string | number | boolean | null | undefined>
// ): Array<string | number | boolean | null | undefined> {
//   return arr.filter(Boolean);
// }
// console.log(
//   removeFalsyValues([0, 1, false, 2, "", 3, null, "a", undefined, NaN])
// ); // [1, 2, 3, 'a']
// console.log(removeFalsyValues([false, true, null, "hello", "", 42])); // [true, 'hello', 42]
// console.log(removeFalsyValues([NaN, 0, "", undefined, "world"])); // ['world']
