console.log('arrow.js');

// 함수 선언식 => var 선언자, 중복허용
function hello(name){
    console.log(name);
}

function hello(msg){
    console.log("출력 : " + msg);
}

// 함수 표현식(변수에 함수를 집어넣는 형식) => const 선언자, 함수를 중복 선언하는걸 방지하고 정확하게 다음부터 실행되도록 제어
// 호출 전에 존재할 수 있도록 작성
const hello2 = function(name){
    console.log("hello, " + name);
}

const hello3 = (name) => console.log('hello, ' + name);

hello3('Javascript');

// 화살표 함수 문법
let msg = msg => console.log("result, " + msg);
msg = () => console.log("Hello, World");
msg = (x, y) => console.log(x+y);

msg = (x, y) => {
    let result = x + y;
    console.log(result);
}

console.clear(); // 이전기록 잠시 삭제

// 화살표 함수와 this의 연관성
let array = [1, 3, 5, 7];

array.forEach(function(value, idx){
    console.log(value, this); // this -> node가 가지고 있는 내장객체
});

array.forEach((value, idx) => {
    console.log(value, this); // this -> 아무것도 안들어옴, 화살표 함수와 this는 X
})

// this가 메소드로 사용될 경우 객체를 가르키는 형태임
