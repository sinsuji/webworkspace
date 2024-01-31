// userApp.js
const express = require('express');
const userApp = express();
const mysql = require('./userdb.js');
userApp.use(express.json());
userApp.use(express.urlencoded({extended : false}));

userApp.listen(3000, () => {
    console.log('Server Start, http://localhost:3000');
});

// 전체조회 처리
userApp.get('/t_users', async (req, res) => {
    let list = await mysql.executeQuery('userList');
    res.json(list);
})


// 단건조회
userApp.get('/t_users/:user_no', async (req, res) => {
    let userNo = req.params.user_no;
    let info = (await mysql.executeQuery('userInfo', userNo))[0];
    res.json(info);
})

// 등록
userApp.post('/t_users', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.executeQuery('userInsert', data);
    res.json(result);
})


// 수정
userApp.put('/t_users/:user_no', async (req, res) => {
    let result = await updateAll(req);
    res.json(result);
    
});

async function updateAll(request){
    let data = [selectedInfo(request.body.param) 
                , request.params.user_no]
    let result = await mysql.executeQuery('userUpdateAll', data);
    return result;
}

function selectedInfo(obj){
    let delData = ["user_id", "user_pwd"];
    let newObj = {};
    let isTargeted = null;
    for(let field in obj){
        isTargeted = false;
        for(let target of delData){
            if(field == target){
                isTargeted = true;
                break;
            }
        }
        if(!isTargeted){
            newObj[field] = obj[field];
        }
    }
    return newObj;
};

// 수정
async function updateInfo(request){
    let data = [...getInfo(request.body.param), request.params.user_no]; 
    let result = await mysql.executeQuery('userUpdateInfo', data);
    return result;
}

function getInfo(obj){
    let getData = ["user_age"];
    let newAry = [];
    for(let target of getData){
        for(let field in obj){
            if(field == target){
                newAry.push(obj[field]);
                break;
            }
        }
    }
    return newAry;
};

// userApp.put('/t_users/:user_no', async (req, res) => {
//     let result = await updateInfo(req);
//     res.json(result);
// });