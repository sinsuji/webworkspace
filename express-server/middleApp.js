const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();

// application/x-www-form-urlencoded
const defaultParser = express.urlencoded({extended : false});

// application/json
const jsonParser = express.json();

// 모든 router에 대해서 적용할거다
// app.use(defaultParser);
app.use(jsonParser);

// 특정한 기능에 대해서만 querystring을 사용하겠다, 필요한 기능을 직접 등록해주면 됨
// get 방식은 query
app.get('/search', defaultParser, (req, res) => {
    let data = req.query.keyword;
    res.send(data + ', 검색결과');
})
// /search?keyword=${value}

// post 방식은 body
app.post('/info', defaultParser, (req, res) => {
    let data = req.body.name;
    res.send('welcome, ' + data);
});
// /info => method:post, body:name=${value}

app.post('/message', (req, res) => {
    let data = req.body.param;
    res.send(data.title + ', ' + data.content);
});
// /message => method:post, body: {"param" : {"title" : "", "content" : ""}}



app.listen(5000, () => {
    console.log('Server Start');
})

let sessionSetting = session({
    secret : 'Have$A!@Nice_day', // 하드코딩 X 
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true, // 통신을 이용할 때만 해당 쿠키에 접근해서 정보를 가지고 올 수 있도록
        secure : false, // secure : 보안이 강화된 곳에서만 사용할 수 있도록?
        maxAge : 60000 // 밀리세컨드
    }
});

app.use(sessionSetting);

app.post('/login', (req, res) => {
    const { id, pwd } = req.body;
    if(!req.session.isLogin){
        // 로그인 되어있지 않을 때
        req.session.user = id;
        req.session.isLogin = true; 
    }
    req.session.save((err)=> {
        if(err) throw err;
        res.redirect('/');
    })
});

app.get('/logout', (req, res) => {
    // 세션 정보를 파기하겠다 
    req.session.destroy();
    res.redirect('/');
})

const corsOptions = {
    origin : 'http://127.0.0.1:5500', // *는 쓰지말아야함, 모두에게 오픈한다는 의미이기 때문
    optionsSuccessStatus : 200
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json(req.session);
});

// multer : 파일 업로드