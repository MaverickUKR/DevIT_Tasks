// _________________________________________
// STRINGS
// TASK 1
// function findIndex(): number {
//   const str: string = "Hello, Ubuntu!";
//   const index: number = str.indexOf("U");
//   return index;
// }
// console.log(findIndex()); //  7
// TASK 2
// function replaceSubstr(): string {
//     const str: string = "Hello, Ubuntu!";
//     const newStr: string = str.replace("Ubuntu", "World");
//     return newStr
// }
// console.log(replaceSubstr()); // "Hello, World!"
// TASK 3
// function subStr() {
//     const str: string = "Hello, Ubuntu!";
//     const subStr: string = str.substring(7, 13);
//     return subStr;
// }
// console.log(subStr()); // "Ubuntu"
// TASK 4
// function splitStr(): string[] {
//     const str: string = "Hello, Ubuntu!";
//     const parts: string[] = str.split(" ");
//     return parts;
// }
// console.log(splitStr()); // ["Hello,", "Ubuntu!"]
// TASK 5
// function trimStr(): string {
//   const str: string = "   Hello, Ubuntu!   ";
//   const trimmedStr: string = str.trim();
//   return trimmedStr;
// }
// console.log(trimStr()); // "Hello, Ubuntu!"
// _________________________________________
// NUMBERS
// TASK 1
// function roundNums(): number[] {
//   const numbers: number[] = [1.4, 2.5, 3.6, 4.3];
//   const roundNumbers: number[] = numbers.map((num) => Math.round(num));
//   return roundNumbers;
// }
// console.log(roundNums()); // // [1, 3, 4, 4]
// TASK 2
// function randomNums(): number[] {
//   const randomNumbers: number[] = Array.from({ length: 10 }, () =>
//     Math.floor(Math.random() * 101)
//   );
//   return randomNumbers;
// }
// console.log(randomNums()); // 10 випадкових чисел між 0 і 100
// TASK 3
// function minMax(): object {
//   const numbers: number[] = [10, 5, 20, 8, 15];
//   const minNum: number = Math.min(...numbers);
//   const maxNum: number = Math.max(...numbers);
//   return { min: minNum, max: maxNum };
// }
// console.log(minMax()); // { min: 5, max: 20 }
// TASK 4
// function toFahren(): string {
//   const celsius: number = 25.4;
//   const fahrenheit: number = (celsius * 9) / 5 + 32;
//   const roundedFahrenheit: number = Math.round(fahrenheit);
//   const result: string = `Температура: ${roundedFahrenheit}°F`;
//   return result;
// }
// console.log(toFahren()); // Температура: 78°F
// TASK 5
// function fixedPrice() {
//   const price = 23.6789;
//   const formattedPrice = price.toFixed(2);
//   const result = `Ціна: ${formattedPrice}`;
//   return result;
// }
// console.log(fixedPrice()); // Ціна: 23.68
// _________________________________________
// ARRAYS
// TASK 1
// function isArr(): boolean {
//   const arr: Array<number> = [1, 2, 3];
//   const isArray: boolean = Array.isArray(arr);
//   return isArray;
// }
// console.log(isArr()); // true
// TASK 2
// function popArr(): Array<number> {
//   const arr: number[] = [1, 2, 3];
//   arr.pop();
//   return arr;
// }
// console.log(popArr()); // [1, 2]
// TASK 3
// function shiftArr(): Array<number> {
//   const arr = [1, 2, 3];
//   arr.shift();
//   return arr;
// }
// console.log(shiftArr()); // [2, 3]
// TASK 4
// function sortArr() {
//   const arr = [3, 1, 2];
//   arr.sort();
//   return arr;
// }
// console.log(sortArr()); // [1, 2, 3]
// TASK 5
// function spliceArr(): Array<number> {
//   const arr: Array<number> = [1, 2, 3, 4];
//   const removedElements: Array<number> = arr.splice(1, 2);
//   return arr;
// }
// console.log(spliceArr()); // [1, 4]
// _________________________________________
// OBJECTS
// TASK 1
function createObj() {
    var obj = Object.create(Object.prototype, {
        name: {
            value: "ubuntu",
            writable: true,
            configurable: true,
            enumerable: true,
        },
    });
    return Object.prototype.hasOwnProperty.call(obj, "name");
}
console.log(createObj()); // true
// TASK 2
// function createFrozenObj(): string {
//   "use strict";
//   const obj: { name: string; version: string; type: string } = {
//     name: "ubuntu",
//     version: "24.04",
//     type: "Linux",
//   };
//   Object.freeze(obj);
//   return (obj.name = "anotherOS");
// }
// console.log(createFrozenObj()); // Uncaught TypeError: "name" is read-only
// TASK 3
// function mergedObj(): {
//   name: string;
//   version: string;
//   type: string;
//   release: string;
// } {
//   const obj1: {
//     name: string;
//     version: string;
//   } = { name: "ubuntu", version: "24.04" };
//   const obj2: {
//     type: string;
//     release: string;
//   } = { type: "Linux", release: "April 2024" };
//   return Object.assign({}, obj1, obj2);
// }
// console.log(mergedObj()); // Object { name: "ubuntu", version: "24.04", type: "Linux", release: "April 2024" }
// TASK 4
// function defineProp(): { name: string; version: string } {
//   const obj: { name?: string; version?: string } = {};
//   Object.defineProperties(obj, {
//     name: {
//       value: "ubuntu",
//       writable: true,
//       enumerable: true,
//       configurable: true,
//     },
//     version: {
//       value: "24.04",
//       writable: false,
//       enumerable: true,
//       configurable: false,
//     },
//   });
//   return obj as { name: string; version: string };
// }
// console.log(defineProp()); // Object { name: "ubuntu", version: "24.04" }
// TASK 5
// function getProp(): Array<string> {
//   const obj: { name: string; version: string; type: string } = {
//     name: "ubuntu",
//     version: "24.04",
//     type: "Linux",
//   };
//   return Object.getOwnPropertyNames(obj);
// }
// console.log(getProp()); // ["name", "version", "type"]
