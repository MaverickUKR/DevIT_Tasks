# Strings

## Task 1: Знайдіть індекс першого входження підрядка в рядок (літера "U") за допомогою indexOf.

function findIndex() {
const str = "Hello, Ubuntu!";
}

findIndex(); // 7

## Task 2: Замініть частину рядка на інший підрядок за допомогою replace.

function replaceSubstr() {
const str = "Hello, Ubuntu!";
}

replaceSubstr(); // "Hello, World!"

## Task 3: Виділіть частину рядка за допомогою substring.

function subStr() {
const str = "Hello, Ubuntu!";
}

subStr(); // "Ubuntu"

## Task 4: Розділіть рядок на масив підрядків за допомогою split.

function splitStr() {
const str = "Hello, World!";
}

splitStr(); // ["Hello,", "World!"]

## Task 5: Видаліть пробіли з обох кінців рядка за допомогою trim.

function trimStr() {
const str = " Hello, Ubuntu! ";
}

trimStr(); // "Hello, Ubuntu!"

# Numbers

## Task 1: Створіть функцію, яка приймає масив чисел і повертає новий масив, де кожне число округлене до найближчого цілого.

function roundNums() {
const numbers = [1.4, 2.5, 3.6, 4.3];
}

roundNums(); // [1, 3, 4, 4]

## Task 2: Створіть функцію, яка повертає масив з 10 випадкових чисел у діапазоні від 0 до 100.

function randomNums() {
}

randomNums(); // 10 випадкових чисел між 0 і 100

## Task 3: Створіть функцію, яка приймає масив чисел і повертає об'єкт з найменшим та найбільшим числом в масиві.

function minMax() {
const numbers = [10, 5, 20, 8, 15];
const minNum = Math.min(...numbers);
const maxNum = Math.max(...numbers);
console.log({ min: minNum, max: maxNum });
}

minMax(); // { min: 5, max: 20 }

## Task 4: Перетворіть температуру з Цельсія в Фаренгейти, використовуючи Math.round для округлення результату.

function toFahren() {
const celsius = 25.4;
}

toFahren(); // Температура: 78°F

## Task 5: Форматуйте ціну товару до двох десяткових знаків за допомогою toFixed.

function fixedPrice() {
const price = 23.6789;
}

fixedPrice(); // Ціна: 23.68

# Arrays

## Task 1: Перевірте, чи є значення масивом за допомогою isArray.

function isArr() {
const arr = [1, 2, 3];
}

isArr(); // true

## Task 2: Видаліть останній елемент з масиву за допомогою pop.

function popArr() {
const arr = [1, 2, 3];
}

popArr(); // [1, 2]

## Task 3: Видаліть перший елемент з масиву за допомогою shift.

function shiftArr() {
const arr = [1, 2, 3];
}

shiftArr(); // [2, 3]

## Task 4: Відсортуйте елементи масиву за допомогою sort.

function sortArr() {
const arr = [3, 1, 2];
}

sortArr(); // [1, 2, 3]

## Task 5: Видаліть елементи 2 і 3 з масиву за допомогою splice.

function spliceArr() {
const arr = [1, 2, 3, 4];
}

spliceArr(); // [1, 4]

# Objects

## Task 1: Створити об'єкт obj з ключем name і значенням ubuntu. Перевірити чи є ключ name у цього об'єкта.

Приклад:

function createObj() {
Object.hasOwn(obj, 'name')
}
console.log(createObj()); // true

## Task 2: Створити об'єкт з наступними властивостями { name: "ubuntu", version: "24.04", type: "Linux" }. Зробити цей об'єкт іммутабельним (Object.freeze()). Спробувати змінити name об'єкта.

Приклад:

function createFrozenObj() {
}
createFrozenObj(); // Uncaught TypeError: "name" is read-only

## Task 3: Створіть об'єкт шляхом злиття двох об'єктів за допомогою Object.assign.

Приклад:

function mergedObj() {
const obj1 = { name: "ubuntu", version: "24.04" };
const obj2 = { type: "Linux", release: "April 2024" };
}

mergedObj(); // Object { name: "ubuntu", version: "24.04", type: "Linux", release: "April 2024" }

## Task 4: Визначте декілька властивостей для об'єкта за допомогою Object.defineProperties (name: "ubuntu", version: "24.04")

Приклад:

function defineProp() {
const obj = {};

    console.log(obj);

}

defineProp(); // Object { name: "ubuntu", version: "24.04" }

## Task 5: Отримайте імена власних властивостей об'єкта за допомогою Object.getOwnPropertyNames.

Приклад:

function getProp() {
const obj = {
name: "ubuntu",
version: "24.04",
type: "Linux"
};
}

getProp(); // ["name", "version", "type"]
