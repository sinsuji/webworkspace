// 2024-01-26 15:03:50 => 19자

function format(value){
    return ('0' + value).slice(-2); // 어떤 경우에도 2자리로 출력 
}

function getDateTime(){
    let today = new Date();
    let year = today.getFullYear();
    let month = format(today.getMonth() + 1);
    let day = format(today.getDate());
    
    let hour = format(today.getHours());
    let min = format(today.getMinutes());
    let sec = format(today.getSeconds());

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

console.log(getDateTime());

const timeout = setTimeout(()=>{
    console.log(getDateTime());
}, 3000);

// clearTimeout(timeout);

// interval -> 페이지가 바뀌지 않는 이상 계속 돔
// setInterval -> 동일한 코드를 주기적으로 반복함
// setInterval은 되도록 반복문 안에 넣지X -> 제어가 안됨 
let count = 0;
const interval = setInterval(()=>{
    console.log('count', ++count);
    if(count == 5){
        clearInterval(interval);
    }
    console.log(getDateTime());
}, 2000);

// 의미는 즉각실행(생각보다 그렇게 동작하지 않음)
setImmediate(()=>{
    console.log('setImmediate', getDateTime());
});

console.log('마지막 코드');