// userSql.js

let userList =
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , join_date
FROM t_users`

let userInfo =
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , join_date
FROM t_users
WHERE user_no = ?`

// 등록 
let userInsert =
`INSERT INTO t_users
SET ?`

// 수정
let userUpdateAll =
`UPDATE t_users
SET ?
WHERE user_no = ?` 

let userUpdateInfo =
`UPDATE t_users
SET user_age = ?
WHERE user_no = ?`

module.exports = {
        userList,
        userInfo,
        userInsert,
        userUpdateAll,
        userUpdateInfo
}