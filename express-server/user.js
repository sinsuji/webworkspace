// 모듈을 만든다고 생각하면 됨(실제 모듈은 아님, 모듈로 인식시키기 위한 파일), 그래서 app.js에 require가 있지만 한번 더 선언
const express = require('express');
const router = express.Router();

// router 자체만 별도로 실행시킬 수 없고 express를 통해서 실행이 가능
// user/
router.get('/', (req, res) => {
    res.send('회원 정보 조회');
})

// user/insert
router.post('/insert', (req, res) => {
    res.send('회원 등록');
})

// user/update
router.put('/update', (req, res) => {
    res.send('회원 수정');
})

// user/delete
router.delete('/delete', (req, res) => {
    res.send('회원 삭제');
})

// 내보내기
// router -> 객체, 그래서 그대로 exports 시키면 됨
module.exports = router;