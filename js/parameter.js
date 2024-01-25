// Default Function Parameter
function getComment(user = 'Anony', msg = 'no comment'){
    let result = `${msg}, from ${user}`;
    console.log(result);
};

getComment('Han', 'Today is ...');
getComment('Adward');
getComment(undefined, 'Hello, World');
getComment();

// Rest Parameter -> 반드시 마지막에 위치할 것, 배열임, 함수의 매개변수를 정의할 때 사용
// 더하는 수의 제한이 없는 더하기 계산
function sum(x = 0, y = 0, ...args){
    let result = x + y;
    for(let num of args){
        result += num;
    }
    return result;
}

console.log(sum(1, 2));
console.log(sum(10, 20, 30, 40));

let ary = [1, 2, 3, 4, 5, 6, 7];
console.log(sum(...ary)); // 펼침연산자, 실행할 때 사용