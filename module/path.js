// path 모듈
// delimiter -> 운영체제별 환경 변수 구분자를 반환
// sep -> 운영체제별 경로 구분자 반환

const path = require('path');

console.log('==절대경로');
console.log(__filename);
console.log(__dirname);
console.log('실제 파일명 : ', path.basename(__filename)); // basename -> 경로에서 마지막에 해당되는 파일명을 불러옴
console.log('확장자 ', path.extname(__filename)); // ext -> 마지막

let pathList = process.env.PATH.split(path.delimiter);
console.log(path.delimiter);
console.table(pathList);
console.log(path.sep);
console.table(pathList[2].split(path.sep));

// API 종류
// WHATWG API (사용을 권장하지 않음)
// WHATWG(웹 표준을 정하는 단체)에서 정한 URL 구분 방식 기반
// URL 클래스를 이용하여 new 연산자로 URL 객체를 생성해서 사용
// QueryString을 조작하기 위해 URLSearchParams 클래스를 이용

fetch('url', {
    method: 'post',
    body : new URLSearchParams({key : value, key : value})
})