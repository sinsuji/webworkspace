// app.js
const express = require('express');
const app = express();
const mysql = require('./db.js');
// mysql.executeQuery(); 실제로 쿼리문을 실행하는 메소드
// 데이터를 받기위해 선언, json과 queryString을 전역으로 등록했기 때문에 둘다 사용 가능
// application/json
app.use(express.json()); // 미들웨어 등록명령어
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false})); // queryString을 제어

app.listen(3000, () => {
    console.log('Server Start, http://localhost:3000');
});

// 전체조회 처리
// customerSql.js에서 해당 쿼리문을 가져옴
app.get('/customers', async (req, res) => {
    // Promise는 카톡(보내놓고 본인 할일 하고 있으면 알람이 옴), await는 통화(응답이 올때가지 계속 기다림) -> 명확하게 응답이 와서 내가 무언가를 해야할 경우에 사용
    // 내부에 Promise가 있으면 지 갈길 가기 때문에 실행을 순차적으로 하지 않음
    // Promise 앞에 await를 붙이는 순간 순서대로 진행하는걸 보장함
    // 1
    let list = await mysql.executeQuery('customerList');
    // 2
    res.json(list);
})


// 단건조회
app.get('/customers/:id', async (req, res) => {
    let customerId = req.params.id;
    // let info = await mysql.executeQuery('customerInfo', customerId);
    // info = info[0];
    let info = (await mysql.executeQuery('customerInfo', customerId))[0]; // 위의 코드와 동일
    res.json(info);
})

// 등록
app.post('/customers', async (req, res) => {
    let data = req.body.param; // 객체, body안에 있는 param 이란 필드가 가지고 있는 대상만 등록하겠다, param이 가져야하는 대상이 값이 하나가 아니기 때문에 json으로 받음
    let result = await mysql.executeQuery('customerInsert', data);
    res.json(result);
})

// 1. queryString -> param =
// 2. JSON -> { "param" : { 필드명 : 값 } }

// == INSERT - AUTO_INCREMENT
// OkPacket {
//     fieldCount: 0,
//     affectedRows: 1, // 등록일 경우 수정된 값
//     insertId: 3, // AUTO_INCREMENT로 자동 부여된 id
//     serverStatus: 2,
//     warningCount: 0,
//     message: '',
//     protocol41: true,
//     changedRows: 0 // 수정일 경우
//   }

// 수정 : 전체컬럼의 값을 받을 수 있도록 처리 
// app.put('/customers/:id', async (req, res) => {
//     let result = await updateAll(req);
//     res.json(result);
    
// });

async function updateAll(request){
    let data = [selectedInfo(request.body.param) 
                , request.params.id]; // set절, id컬럼
    let result = await mysql.executeQuery('customerUpdateAll', data);
    return result;
}

// OkPacket {
//     "fieldCount": 0,
//     "affectedRows": 1,
//     "insertId": 0,
//     "serverStatus": 2,
//     "warningCount": 0,
//     "message": "(Rows matched: 1  Changed: 0  Warnings: 0",
//     "protocol41": true,
//     "changedRows": 1
// }

// 통신하기 전에 걸러내야 할 것들을 걸러냄
function selectedInfo(obj){
    // let obj = {};
    // obj.name = "h";
    let delData = ["id", "email"];
    let newObj = {};
    let isTargeted = null;
    for(let field in obj){ // field : id, name, email, phone, address
        isTargeted = false;
        for(let target of delData){
            if(field == target){ // 삭제대상일 경우
                isTargeted = true;
                break;
            }
        }
        if(!isTargeted){ // 삭제대상이 아닐 경우
            newObj[field] = obj[field];
        }
    }
    return newObj;
};

// 수정 : 지정된 컬럼만 값을 받을 수 있도록 처리 
async function updateInfo(request){
    let data = [...getInfo(request.body.param), request.params.id]; // 컬럼 : email, phone, address, id
    let result = await mysql.executeQuery('customerUpdateInfo', data);
    return result;
}

function getInfo(obj){
    let getData = ["email", "phone", "address"];
    let newAry = [];
    for(let target of getData){
        for(let field in obj){
            if(field == target){
                newAry.push(obj[field]);
                break;
            }
        }
    }
    return newAry; // ["hkhong@email.com", "010-1234-1234", null]
};

app.put('/customers/:id', async (req, res) => {
    let result = await updateInfo(req);
    res.json(result);
    
});