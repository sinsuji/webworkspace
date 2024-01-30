const multer = require('multer');
const express = require('express');
const app = express();

const storage = multer.diskStorage({
    destination : function(req, file, cb){ // destination -> 저장하는 경로, cb -> callback
        cb(null, 'files/');
    },
    filename : function(req, file, cb){ // file -> 넘어온 파일에 대한 정보를 가지고 있음
        let rename = (new Date()).getMilliseconds() + file.originalname; // 충돌을 방지하기 위해 유니크한 초단위의 값을 불러와서 파일명을 정해줌
        cb(null, rename);
    }
});

const upload = multer({ storage : storage });

const staticUrl = '/images';
app.use(staticUrl, express.static('files'));

app.post('/profile', upload.single('avatar'), (req, res) => {
    // <img src=""> -> src 속성이 가져야하는 경로 반환
    let imgUrl = `${staticUrl}\/${req.file.filename}`;
    res.send(imgUrl);
});

app.post('/photos', upload.array('list'), (req, res) => {
    // <img src=""> -> src 속성이 가져야하는 경로 반환
    let imgUrlList = [];
    for(let file of req.files){
        let imgUrl = `${staticUrl}\/${file.filename}`;
        imgUrlList.push(imgUrl);
    }
    res.send(imgUrlList);
});

app.listen(4000, () => {
    console.log('Server Start : multer');
});