// userdb.js
const mysql = require('mysql');
const user = require('./db/userSql.js');

const connectionPool = mysql.createPool({
    host : '127.0.0.1',
    port : '3306',
    user : 'dev01',
    password : '1234',
    database : 'dev',
    connectionLimit : 10,
    debug : true
});

const executeQuery = async ( alias , values ) => {
    return new Promise((resolve, reject) => {
        let executeSql = user[alias];
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