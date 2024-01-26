const defaultNum = 1;

function add(num1, num2){
    return num1 + num2;
}

function minus(num1, num2){
    return num1 - num2;
}

function multi(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

// 밖으로 내보내고자 하는 것들만 정의, 반드시 마지막에 위치
module.exports = {
// default -> 권한은 넘겨주되, 내가 특정이름을 정하지 않고 돌려주겠다
// export default {
    defNum : defaultNum, // 내부와 외부의 이름이 다를 경우
    add, // add : add
    minus, // "minus" : minus -> 이름 : 값(함수 그자체)
    multi,
    divide
}