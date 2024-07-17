var articles = [
    {
        title: "justo. Praesent luctus. Curabitur",
        text: "sapien, gravida non, sollicitudin a,",
    },
    {
        title: "quam quis diam. Pellentesque",
        text: "eu odio tristique pharetra. Quisque ac",
    },
    {
        title: "quis lectus. Nullam suscipit,",
        text: "bibendum. Donec felis orci, adipiscing non, luctus sit",
    },
    {
        title: "Cras dolor dolor, tempus",
        text: "eget magna. Suspendisse tristique neque",
    },
    {
        title: "ut dolor dapibus gravida.",
        text: "ultricies adipiscing, enim mi tempor lorem, eget mollis",
    },
    {
        title: "elit. Etiam laoreet, libero",
        text: "eget metus eu erat semper rutrum.",
    },
    {
        title: "velit eu sem. Pellentesque",
        text: "Aliquam auctor, velit eget laoreet posuere, enim nisl elementum",
    },
    {
        title: "Aliquam ultrices iaculis odio.",
        text: "ligula consectetuer rhoncus. Nullam velit dui, semper et,",
    },
    {
        title: "a nunc. In at",
        text: "semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices",
    },
    {
        title: "iaculis quis, pede. Praesent",
        text: "mi. Aliquam gravida mauris ut mi. Duis risus",
    },
];
var FILTER_OPERATORS = {
    AND: "AND",
    OR: "OR",
};
var textLikeRule = { key: "text", rule: "like", params: ["mollis"] };
var titleStartLikeRule = {
    key: "title",
    rule: "sLike",
    params: ["ve"],
};
var titleEndLikeRule = { key: "title", rule: "eLike", params: ["ur"] };
var textRegExpRule = {
    key: "text",
    rule: "regExp",
    params: [new RegExp("[e]{2}")],
};
var handlerLikeRule = function (params, value) {
    return value.includes(params[0]);
};
var handlerSLikeRule = function (params, value) {
    return value.startsWith(params[0]);
};
var handlerELikeRule = function (params, value) {
    return value.endsWith(params[0]);
};
var handlerRegExpRule = function (params, value) {
    return params[0].test(value);
};
var ruleHandlers = {
    like: handlerLikeRule,
    sLike: handlerSLikeRule,
    eLike: handlerELikeRule,
    regExp: handlerRegExpRule,
};
var myFilter = function (handlers) {
    return function (items, rules, operator) {
        if (operator === void 0) { operator = FILTER_OPERATORS.OR; }
        return items.filter(function (item) {
            var results = rules.map(function (rule) {
                var handler = handlers[rule.rule];
                return handler(rule.params, item[rule.key]);
            });
            if (operator === FILTER_OPERATORS.AND) {
                return results.every(function (result) { return result; });
            }
            else {
                return results.some(function (result) { return result; });
            }
        });
    };
};
console.log(myFilter(ruleHandlers)(articles, [textLikeRule, titleEndLikeRule], FILTER_OPERATORS.OR));
// [
// {"title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"},
// {"title":"ut dolor dapibus gravida.","text":"ultricies adipiscing, enim mi tempor lorem, eget mollis"},
// {"title":"a nunc. In at","text":"semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices"}
// ]
console.log(myFilter(ruleHandlers)(articles, [textRegExpRule, titleStartLikeRule]));
// [{"title":"justo. Praesent luctus. Curabitur","text":"sapieen, gravida non, sollicitudin a,"},
// {"title":"velit eu sem. Pellentesque","text":"Aliquam auctor, velit eget laoreet posuere, enim nisl elementum"}]
console.log(myFilter(ruleHandlers)(articles, [titleEndLikeRule], FILTER_OPERATORS.AND));
var data = [
    { varyLoooongIDFieldName: 1, extremelyLooooooooooooongActiveFiedName: true },
    { varyLoooongIDFieldName: 2, extremelyLooooooooooooongActiveFiedName: false },
    { varyLoooongIDFieldName: 3, extremelyLooooooooooooongActiveFiedName: true },
    { varyLoooongIDFieldName: 4, extremelyLooooooooooooongActiveFiedName: false },
    { varyLoooongIDFieldName: 5, extremelyLooooooooooooongActiveFiedName: false },
    { varyLoooongIDFieldName: 6, extremelyLooooooooooooongActiveFiedName: false },
    { varyLoooongIDFieldName: 7, extremelyLooooooooooooongActiveFiedName: true },
    { varyLoooongIDFieldName: 8, extremelyLooooooooooooongActiveFiedName: true },
    { varyLoooongIDFieldName: 9, extremelyLooooooooooooongActiveFiedName: true },
    { varyLoooongIDFieldName: 10, extremelyLooooooooooooongActiveFiedName: true },
];
var compress = function (data) {
    var keys = Object.keys(data[0]);
    var values = data.map(function (el) {
        return keys.map(function (key, index) { return [index, el[key]]; });
    });
    return [keys, values];
};
console.log(compress(data)); // [["varyLoooongIDFieldName","extremelyLooooooooooooongActiveFiedName"],[[[0,1],[1,true]],[[0,2],[1,false]],[[0,3],[1,true]],[[0,4],[1,false]],[[0,5],[1,false]],[[0,6],[1,false]],[[0,7],[1,true]],[[0,8],[1,true]],[[0,9],[1,true]],[[0,10],[1,true]]]]
// ["varyLoooongIDFieldName","extremelyLooooooooooooongActiveFiedName"] - це const keys = Object.keys(data[0]), тобто ключі (назви полів) об'єктів масиву.
// [0,1] - 0 - це індекс елемента, котрому належить ключ (varyLoooongIDFieldName), 1 - це value цього елемента (1, 2, 3, 4...)
// [1,true] - 1 - це індекс елемента, котрому належить ключ (extremelyLooooooooooooongActiveFiedName), true - це value цього елемента (true, false, true...)
// 3.Напишите функцию которая восстанавливает сжатую коллекцию из задания 3
// !Для упрощения, объекты могут быть только одноуровневыми!
// type Data = [string[], (number | boolean)[][][]];
// type Result = {
//   [key: string]: number | boolean;
// }[];
// const compressedData: Data = [
//   ["varyLoooongIDFieldName", "extremelyLooooooooooooongActiveFiedName"],
//   [
//     [
//       [0, 1],
//       [1, true],
//     ],
//     [
//       [0, 2],
//       [1, false],
//     ],
//     [
//       [0, 3],
//       [1, true],
//     ],
//     [
//       [0, 4],
//       [1, false],
//     ],
//     [
//       [0, 5],
//       [1, false],
//     ],
//     [
//       [0, 6],
//       [1, false],
//     ],
//     [
//       [0, 7],
//       [1, true],
//     ],
//     [
//       [0, 8],
//       [1, true],
//     ],
//     [
//       [0, 9],
//       [1, true],
//     ],
//     [
//       [0, 10],
//       [1, true],
//     ],
//   ],
// ];
// const decompress = (data: Data): Result => {
//   const keys: string[] = data[0];
//   const values: (number | boolean)[][][] = data[1];
//   return values.map((el) => {
//     const obj: { [key: string]: number | boolean } = {};
//     el.map(([index, value]) => {
//       obj[keys[index as number]] = value;
//     });
//     return obj;
//   });
// };
// console.log(decompress(compressedData)); // [{"varyLoooongIDFieldName":1,"extremelyLooooooooooooongActiveFiedName":true},{"varyLoooongIDFieldName":2,"extremelyLooooooooooooongActiveFiedName":false},{"varyLoooongIDFieldName":3,"extremelyLooooooooooooongActiveFiedName":true},{"varyLoooongIDFieldName":4,"extremelyLooooooooooooongActiveFiedName":false},{"varyLoooongIDFieldName":5,"extremelyLooooooooooooongActiveFiedName":false},{"varyLoooongIDFieldName":6,"extremelyLooooooooooooongActiveFiedName":false},{"varyLoooongIDFieldName":7,"extremelyLooooooooooooongActiveFiedName":true},{"varyLoooongIDFieldName":8,"extremelyLooooooooooooongActiveFiedName":true},{"varyLoooongIDFieldName":9,"extremelyLooooooooooooongActiveFiedName":true},{"varyLoooongIDFieldName":10,"extremelyLooooooooooooongActiveFiedName":true}]
// Взяти по черзі 1 і 2 елемент першого масиву, додати його до кожного об'єкту нового масиву як ключі
// Взяти по черзі 2 елемент другого масиву і використати його як значення кожного 1го ключа об'єктів масиву
// Взяти по черзі 2 елемент третього масиву і використати його як значення кожного 2го ключа об'єктів масиву
// В результаті створити масив об'єктів
