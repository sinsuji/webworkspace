// 객체형태, 비동기 작업시 성공과 실패를 하나로 묶은 형태
// 연달아 작업을 실행할 수 있는 장점
let test = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('비동기 작업 실행');
        resolve('작업 성공');
    }, 1000);
});

test
.then(data => console.log('then', data))
.catch(err => console.log('catch', err))
.finally(() => console.log('작업 끝!'));
