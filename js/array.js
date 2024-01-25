console.log('array.js');

// sort()    : 정렬함수 - 오름차순
// reverst() : 정렬함수 - 내림차순

let fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.sort();
console.log(fruits);

fruits.reverse();
console.log(fruits);

let points = [40, 100, 1, 5, 25, 10];

points.sort();

points.sort(function(a, b) {
    // 오름차순
    return a-b;
});
console.log(points);

// filter : 기존 배열 -기준-> 새로운 배열
let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

let result = words.filter((value, idx) => {
    // return 데이터 타입 boolean
    // return value.length > 6;
    return value.indexOf('a') > -1;
});

console.log(result);

let userList = [{id : 100, name : 'Hong'}, {id : 200, name : 'Kang'}, {id : 300, name : 'Han'}];
let newList = userList.filter(obj => {
    return obj.name.indexOf('g') > -1;
})

newList.forEach(obj => {
    obj.age = 20;
})

console.log(userList, newList);

// fliter는 객체가 아닌 타입에 대해서는 복사개념, 참조타입이 내장되어 있는 배열일 경우는 새로운 배열을 만드는게 아니라 동일한 데이터를 가지는 것임

// map () : : 기존 배열 -기준+조작-> 새로운 배열
userList = [{id : 100, name : 'Hong'}, {id : 200, name : 'Kang'}, {id : 300, name : 'Han'}];

let newArray = userList.map(function(obj) {
    // return 데이터 타입 제한없음
    return obj.id < 300 ? obj.name : null;
});

// map은 길이(갯수)를 줄일 수 없음 

console.log(userList, newArray);

console.clear();
newList = userList.map((obj) => {
    return {
        id : obj.id,
        name : obj.name
    }
});

console.log(userList, newList);

newList.forEach(obj => {
    obj.age = 20;
})

console.log(userList, newList);

// reduce() : 누적합계
let nums = [ 50, 12, 999, 6, 100];
let sumRes = nums.reduce(function(total, value) {
    return total + value;
}, 0); // 초기값

console.log(sumRes);