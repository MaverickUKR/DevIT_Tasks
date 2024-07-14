const testData = [
  1,
  2,
  1990,
  85,
  24,
  "Vasya",
  "colya@example.com",
  "Rafshan",
  "ashan@example.com",
  true,
  false,
];
const testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
const testData3 = [
  {
    name: "Vasya",
    email: "vasya@example.com",
    age: 20,
    skills: { php: 0, js: -1, madness: 10, rage: 10 },
  },
  {
    name: "Dima",
    email: "dima@example.com",
    age: 34,
    skills: { php: 5, js: 7, madness: 3, rage: 2 },
  },
  {
    name: "Colya",
    email: "colya@example.com",
    age: 46,
    skills: { php: 8, js: -2, madness: 1, rage: 4 },
  },
  {
    name: "Misha",
    email: "misha@example.com",
    age: 16,
    skills: { php: 6, js: 6, madness: 5, rage: 2 },
  },
  {
    name: "Ashan",
    email: "ashan@example.com",
    age: 99,
    skills: { php: 0, js: 10, madness: 10, rage: 1 },
  },
  {
    name: "Rafshan",
    email: "rafshan@example.com",
    age: 11,
    skills: { php: 0, js: 0, madness: 0, rage: 10 },
  },
];
const testData4 = [
  { name: "Vasya", email: "vasya@example.com", age: 20 },
  { name: "Dima", email: "dima@example.com", age: 34 },
  { name: "Colya", email: "colya@example.com", age: 46 },
  { name: "Misha", email: "misha@example.com", age: 16 },
  { name: "Ashan", email: "ashan@example.com", age: 99 },
  { name: "Rafshan", email: "rafshan@example.com", age: 11 },
  1,
  2,
  1990,
  85,
  24,
  "Vasya",
  "colya@example.com",
  "Rafshan",
  "ashan@example.com",
  true,
  false,
  [
    [
      [
        [
          1,
          2,
          1990,
          85,
          24,
          "Vasya",
          "colya@example.com",
          "Rafshan",
          "rafshan@kashan.com",
          true,
          false,
          [{ name: "Rafshan", email: "rafshan@kashan.com", age: 11 }],
        ],
      ],
    ],
  ],
];

// 8. Сделать функцию которая обрезает массив до указанного значения.
// Синтаксис: array_skip_until(arr: array, value: any): any[]
// Узнать индекс каждого элемента массива
// Обрезать массив по индекс - 1
// Вернуть новый массив

// function array_skip_until(arr: any[], value: string | number): any[] {
//   const index: number = arr.findIndex((el) => {
//     if (typeof el === "object" && el !== null) {
//       if (Array.isArray(el)) {
//         return el.flat(Infinity).includes(value);
//       }
//       return Object.values(el).includes(value);
//     } else {
//       return el === value;
//     }
//   });
//   return index === -1 ? [] : arr.slice(index);
// }

// let result = array_skip_until(testData, 2); // [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
// let result2 = array_skip_until(testData, "Rafshan"); // ["Rafshan", "ashan@example.com", true, false]
// let result3 = array_skip_until(testData, "asd"); // []

// console.log(result);
// console.log(result2);
// console.log(result3);

// Создать функцию которая нормализует данные в массиве исключая или преобразуя не подходящие.
//    Доступные шаблоны:
//    'string' => строки,
//    'number' => числа,
//    'int' => целые числа,
//    'float' => числа с плавающей точкой,
//    'bool' => true | false,
//    'function' => функция,
//    'array' => массив,
//    Object => объект {name: 'string'}
//    Синтаксис: array_normalize(arr: array, shema: string|Object[, transform: bool = false]): any[]

// type Schema =
//   | "string"
//   | "number"
//   | "int"
//   | "float"
//   | "bool"
//   | "function"
//   | "array"
//   | { [key: string]: Schema };
// type Result =
//   | number
//   | string
//   | boolean
//   | unknown[]
//   | Function
//   | { [key: string]: Result };

// function arrayNormalize(
//   arr: unknown[],
//   scheme: Schema,
//   transform: boolean = false
// ): Result[] {
//   if (scheme === "string") {
//     return normalizeString(arr, transform);
//   }
//   if (scheme === "float") {
//     return normalizeFloat(arr, transform);
//   }
//   if (scheme === "int") {
//     return normalizeInt(arr, transform);
//   }
//   if (scheme === "number") {
//     return normalizeNumber(arr, transform);
//   }
//   if (scheme === "bool") {
//     return normalizeBool(arr, transform);
//   }
//   if (scheme === "array") {
//     return normalizeArray(arr, transform);
//   }
//   if (scheme === "function") {
//     return normalizeFunction(arr, transform);
//   }
//   if (typeof scheme === "object") {
//     return normalizeObject(arr, scheme, transform);
//   }
//   return [];
// }

// function isString(str: unknown): str is string {
//   return typeof str === "string";
// }

// function normalizeString(arr: unknown[], transform: boolean = false): string[] {
//   if (transform) {
//     arr = arr.map((el) => {
//       if (typeof el === "number" || typeof el === "string") {
//         return String(el);
//       }
//     });
//   }
//   return arr.filter(isString);
// }

// function normalizeNumber(arr: unknown[], transform: boolean = false): number[] {
//   if (transform) {
//     arr = arr.map((el) => {
//       const numberValue = Number(el);
//       if (!Number.isNaN(numberValue)) {
//         return numberValue;
//       }
//     });
//   }
//   return arr.filter((el) => typeof el === "number") as number[];
// }

// function normalizeInt(arr: unknown[], transform: boolean = false): number[] {
//   if (transform) {
//     arr = arr.map((el) => parseInt(String(el)));
//   }
//   return arr.filter(
//     (el) => typeof el === "number" && Number.isInteger(el)
//   ) as number[];
// }

// function normalizeFloat(arr: unknown[], transform: boolean = false): number[] {
//   if (transform) {
//     return (arr = arr.map((el) => parseFloat(String(el))));
//   }
//   return arr.filter(
//     (el) => typeof el === "number" && !Number.isInteger(el)
//   ) as number[];
// }

// function normalizeBool(arr: unknown[], transform: boolean = false): boolean[] {
//   if (transform) {
//     arr = arr.map((el) => Boolean(el));
//   }
//   return arr.filter((el) => typeof el === "boolean") as boolean[];
// }

// function normalizeArray(arr: unknown[], transform: boolean = false) {
//   if (transform) {
//     arr = arr.map((el) => (Array.isArray(el) ? el : [el]));
//   }
//   return arr.filter((el): el is unknown[] => Array.isArray(el));
// }

// function normalizeFunction(
//   arr: unknown[],
//   transform: boolean = false
// ): Function[] {
//   if (transform) {
//     arr = arr.map((el) => new Function(String(el)));
//   }
//   return arr.filter((el) => el instanceof Function) as Function[];
// }

// function normalizeObject(
//   arr: unknown[],
//   scheme: Record<string, Schema>,
//   transform: boolean = false
// ) {
//   const arrOfNormalizedObject: Record<string, Result>[] = [];

//   const arrOfObj = arr.filter(
//     (el): el is Record<string, unknown> => typeof el === "object" && el !== null
//   );

//   for (const obj of arrOfObj) {
//     const normalizedObject: Record<string, Result> = {};

//     for (const key in scheme) {
//       if (obj.hasOwnProperty(key)) {
//         const value = obj[key];
//         const resultOfNormalizeValues = arrayNormalize(
//           [value],
//           scheme[key],
//           transform
//         );
//         if (resultOfNormalizeValues.length > 0) {
//           normalizedObject[key] = resultOfNormalizeValues;
//         }
//       }
//     }

//     if (Object.keys(normalizedObject).length > 0) {
//       arrOfNormalizedObject.push(normalizedObject);
//     }
//   }
//   return arrOfNormalizedObject;
// }

// let result = arrayNormalize(testData4, "string"); // ['Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
// let result2 = arrayNormalize(testData4, "string", true); // ['1', '2', '1990', '85', '24', 'Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
// let result3 = arrayNormalize(testData4, { age: "int" }); // []
// let result4 = arrayNormalize(testData4, { age: "int" }, true); // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]
// // let result3 = arrayNormalize(testData4, { email: "string" });

// console.log(result);
// console.log(result2);
// console.log(result3);
// console.log(result4[0]);

// _____________________________________________________________
// // 11. Сделать функцию которая сможет делать срез данных с ассоциативного массива.
// // Синтаксис: array_pluck(arr: array, path: string): any[]
// // Пример:
// // let result = array_pluck(testData3, 'name') // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
// // let result2 = array_pluck(testData3, 'skills.php') // [0, 5, 8, 6, 0, 0]

function array_pluck(arr: any[], key: string): any[] {
  return arr.map((item) => {
    let keys: string[] = key.split(".");
    for (let key of keys) {
      if (typeof item === "object") {
        item = item[key];
      } else {
        return undefined;
      }
    }
    return item;
  });
}
// // перебрать все елементы этого ассоциативного массива
// // если обьект имеет ключ (key) равен item, то вернуть все value ключей этого массива,
// // если не нашло, вернуть undefined
// // проблема с вложеностью решается key.split(".")
let result = array_pluck(testData3, "name"); // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
let result2 = array_pluck(testData3, "skills.php"); // [0, 5, 8, 6, 0, 0]
console.log(result);
console.log(result2);

// _____________________________________________________________
// // 12. Создать функцию которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.
// // Синтаксис: array_combine(keys: array, values: array): Object
// // Пример:
// // let result = array_combine(testData, testData2) // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}

// function array_combine(
//   keyArr: any[],
//   valueArr: string | number[]
// ): { [keyArr: string | number]: [valueArr: any] } {
//   let obj: { [key: string]: any } = {};
//   for (let i = 0; i < keyArr.length; i++) {
//     if (typeof keyArr[i] === "string" || typeof valueArr[i] === "number")
//       obj[keyArr[i]] = valueArr[i];
//   }
//   return obj;
// }
// console.log(array_combine(testData, testData2)); // { 1: 1, 2: 2, 24: 24, 85: 85, 1990: 1990, Vasya: 5, "colya@example.com": 7, Rafshan: 8.1, "ashan@example.com": undefined });

// // Сделать цикл, через который прогнать каждый массив в формате ключ : значение
