var testData = [
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
var testData2 = [1, 2, 1990, 85, 24, 5, 7, 8.1];
var testData3 = [
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
var testData4 = [
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
function arrayNormalize(arr, scheme, transform) {
    if (transform === void 0) { transform = false; }
    if (scheme === "string") {
        return normalizeString(arr, transform);
    }
    if (scheme === "float") {
        return normalizeFloat(arr, transform);
    }
    if (scheme === "int") {
        return normalizeInt(arr, transform);
    }
    if (scheme === "number") {
        return normalizeNumber(arr, transform);
    }
    if (scheme === "bool") {
        return normalizeBool(arr, transform);
    }
    if (scheme === "array") {
        return normalizeArray(arr, transform);
    }
    if (scheme === "function") {
        return normalizeFunction(arr, transform);
    }
    if (typeof scheme === "object") {
        return normalizeObject(arr, scheme, transform);
    }
    return [];
}
function isString(str) {
    return typeof str === "string";
}
function normalizeString(arr, transform) {
    if (transform === void 0) { transform = false; }
    if (transform) {
        arr = arr.map(function (el) {
            if (typeof el === "number" || typeof el === "string") {
                return String(el);
            }
        });
    }
    return arr.filter(isString);
}
function normalizeNumber(arr, transform) {
    if (transform === void 0) { transform = false; }
    if (transform) {
        arr = arr.map(function (el) {
            var numberValue = Number(el);
            if (!Number.isNaN(numberValue)) {
                return numberValue;
            }
        });
    }
    return arr.filter(function (el) { return typeof el === "number"; });
}
function normalizeInt(arr, transform) {
    if (transform === void 0) { transform = false; }
    if (transform) {
        arr = arr.map(function (el) { return parseInt(String(el)); });
    }
    return arr.filter(function (el) { return typeof el === "number" && Number.isInteger(el); });
}
function normalizeFloat(arr, transform) {
    if (transform === void 0) { transform = false; }
    if (transform) {
        return (arr = arr.map(function (el) { return parseFloat(String(el)); }));
    }
    return arr.filter(function (el) { return typeof el === "number" && !Number.isInteger(el); });
}
function normalizeBool(arr, transform) {
    if (transform === void 0) { transform = false; }
    if (transform) {
        arr = arr.map(function (el) { return Boolean(el); });
    }
    return arr.filter(function (el) { return typeof el === "boolean"; });
}
function normalizeArray(arr, transform) {
    if (transform === void 0) { transform = false; }
    if (transform) {
        arr = arr.map(function (el) { return (Array.isArray(el) ? el : [el]); });
    }
    return arr.filter(function (el) { return Array.isArray(el); });
}
function normalizeFunction(arr, transform) {
    if (transform === void 0) { transform = false; }
    if (transform) {
        arr = arr.map(function (el) { return new Function(String(el)); });
    }
    return arr.filter(function (el) { return el instanceof Function; });
}
function normalizeObject(arr, scheme, transform) {
    if (transform === void 0) { transform = false; }
    var arrOfNormalizedObject = [];
    var arrOfObj = arr.filter(function (el) { return typeof el === "object" && el !== null; });
    for (var _i = 0, arrOfObj_1 = arrOfObj; _i < arrOfObj_1.length; _i++) {
        var obj = arrOfObj_1[_i];
        var normalizedObject = {};
        for (var key in scheme) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                var resultOfNormalizeValues = arrayNormalize([value], scheme[key], transform);
                if (resultOfNormalizeValues.length > 0) {
                    normalizedObject[key] = resultOfNormalizeValues;
                }
            }
        }
        if (Object.keys(normalizedObject).length > 0) {
            arrOfNormalizedObject.push(normalizedObject);
        }
    }
    return arrOfNormalizedObject;
}
var result = arrayNormalize(testData4, "string"); // ['Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
var result2 = arrayNormalize(testData4, "string", true); // ['1', '2', '1990', '85', '24', 'Vasya', 'colya@example.com', 'Rafshan', 'ashan@example.com']
var result3 = arrayNormalize(testData4, { age: "int" }); // []
var result4 = arrayNormalize(testData4, { age: "int" }, true); // [{age: 20}, {age: 34}, {age: 46}, {age: 16}, {age: 99}, {age: 11}]
// let result3 = arrayNormalize(testData4, { email: "string" });
console.log(result);
console.log(result2);
console.log(result3);
console.log(result4[0]);
// _____________________________________________________________
// // 11. Сделать функцию которая сможет делать срез данных с ассоциативного массива.
// // Синтаксис: array_pluck(arr: array, path: string): any[]
// // Пример:
// // let result = array_pluck(testData3, 'name') // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
// // let result2 = array_pluck(testData3, 'skills.php') // [0, 5, 8, 6, 0, 0]
// function array_pluck(arr: any[], key: string): any[] {
//   return arr.map((item) => {
//     let keys: string[] = key.split(".");
//     for (let key of keys) {
//       if (typeof item === "object") {
//         item = item[key];
//       } else {
//         return undefined;
//       }
//     }
//     return item;
//   });
// }
// // перебрать все елементы этого ассоциативного массива
// // если обьект имеет ключ (key) равен item, то вернуть все value ключей этого массива,
// // если не нашло, вернуть undefined
// // проблема с вложеностью решается key.split(".")
// let result = array_pluck(testData3, "name"); // ["Vasya", "Dima", "Colya", "Misha", "Ashan", "Rafshan"]
// let result2 = array_pluck(testData3, "skills.php"); // [0, 5, 8, 6, 0, 0]
// console.log(result);
// console.log(result2);
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
