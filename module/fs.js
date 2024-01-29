const fs = require('fs');
const data = 'Hello, Node.js World';

// 해당 파일에 지정된 데이터를 작성하겠다
// fs.writeFile('./sample.txt', data, 'utf-8', (err) => {
//     if(err) throw err;
//     console.log('job completed');
// }) 

fs.readFile('./sample.txt', 'utf-8', (err, datas) => {
    if(err) throw err;
    console.log(datas);
})