// db.js - 거의 건들일이 없음
const mysql = require('mysql');
const sql = require('./db/customerSql.js');
// sql.customerList

// connectionPool -> DB와 서버 사이의 
// 기본적으로는 auto commit, 따로 설정하고 싶으면 Transactions을 사용해야함
const connectionPool = mysql.createPool({
    host : '127.0.0.1',
    port : '3306',
    user : 'dev01',
    password : '1234',
    database : 'dev',
    connectionLimit : 10,
    debug : true
});

// .query(queryString(쿼리문), values(쿼리문으로 절달할 데이터 배열, 실제값), callback) -> 실제 쿼리문을 보내고 값을 받아옴
// 기본 비동기로 처리해야 하기 때문에 Promise에 넣음, 함수로 생성
// Mysql은 단건조회인지 전체조회인지를 따로 구분하지 못함
// callback의 results의 경우 select 일 때는 배열, DML문일 경우 객체로 값이 넘어온다
// Promise -> 응답하기 전에 끝이 나지 않음
// 서버 안에서 가장 중요한 부분
// Promise가 return을 해야하기 때문에 async가 붙음
const executeQuery = async ( alias , values ) => {
    return new Promise((resolve, reject) => {
        let executeSql = sql[alias];
        connectionPool.query(executeSql, values, (err, results) => {
            if(err){
                console.log(err);
                reject({err});
            }else{
                console.log(results);
                resolve(results);
            }
        })
    })
}

module.exports = {
    executeQuery
}