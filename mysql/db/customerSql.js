// customerSql.js

let customerList =
`SELECT id
        , name
        , email
        , phone
        , address
FROM customers`

// 값이 들어가야할 곳에 물음표를 사용
// 컬럼명은 무조건 소문자, 대문자를 사용X
let customerInfo =
`SELECT id
        , name
        , email
        , phone
        , address
FROM customers
WHERE id = ?`
// 1) 배열인지 아닌지 : 물음표 갯수 (왼쪽에서 오른쪽 순으로 값이 들어감)
// 2) ? 별로 객체타입인지 아닌지 : 어느 컬럼에 들어가는 값인지 구분 가능여부 (? 가 누구한테 들어가는지 쿼리문에 있느냐 없느냐)

// 등록 
// set을 쓰는 이유는 보다 확실해서
let customerInsert =
`INSERT INTO customers
SET ?` // 객체, 필드명 == 컬럼명

// 수정 : 전체컬럼의 값을 받을 수 있도록 처리
let customerUpdateAll =
`UPDATE customers
SET ?
WHERE id = ?` // 배열[ 객체 , 단일값 ] - 2개의 값

// 수정 : 지정된 컬럼만 값을 받을 수 있도록 처리 
let customerUpdateInfo =
`UPDATE customers
SET email = ?, phone =?, address =?
WHERE id = ?` // 배열[ 단일값, 단일값, 단일값, 단일값 ] - 4개의 값 (email부터 id 순으로 값이 들어감)

module.exports = {
    customerList,
    customerInfo,
    customerInsert,
    customerUpdateAll,
    customerUpdateInfo
}