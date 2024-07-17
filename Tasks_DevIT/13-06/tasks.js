// _____________________________
// STRINGS
var arr = [123, 233, [31, 40, [225, 6]]];
function flatFilter(arr) {
    var flattedArr = arr.flat(2);
    var filteredArr = flattedArr.filter(function (e) { return e > 100; });
    return filteredArr;
}
console.log(flatFilter(arr));
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
