// db.js
const mysql = require('mysql');
const sql = require('./db/userSql.js');

console.dir(process.env);
const connectionPool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PWD,
    database : process.env.MYSQL_DB,
    connectionLimit : process.env.MYSQL_CONNECT_LIMIT,
    debug : true // 필수설정은 아니고 쿼리문을 보기위해 설정함
});

const executeQuery = async ( alias, values) => {
    return new Promise((resolve, reject) =>{
        let executeSql = sql[alias];
        connectionPool.query(executeSql, values, (err, results)=>{
            if(err){
                reject({err});
            }else{
                resolve(results);
            }
        })
    })
}

module.exports = {
    executeQuery
}