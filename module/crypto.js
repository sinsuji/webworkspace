const { rejects } = require('assert');
const crypto = require('crypto');
const data = 'pw1234';

let encData = crypto.createHash('sha512')
                    .update(data)
                    .digest('hex'); // base64 -> hex 보다 길이가 짧음

console.log(data, encData);

// salting 암호화
const createSalt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => { // 몇번이나 돌릴거냐
            if(err) reject(err);
            resolve(buf.toString('base64')); // buf에서 값을 가지고 있음(몇자리로 표현할 것인가)
        })
    })
}

const createCryptoPassword = 
async(plainPassword) => {
    const salt = await createSalt(); // 암호화 하기 전에 salt가 발생해야 하기 때문에 기다려라

    return new Promise((resolve, reject) => {
        // 넘어오는 원데이터, 앞에서 생성한 salt, 반복횟수, 길이, 암호화 할 때 사용할 알고리즘
        crypto.pbkdf2(plainPassword,
                      salt,
                      9999,
                      64,
                      'sha512',
                      (err, key) => {
            if(err) reject(err);
            resolve({
                      password : key.toString('base64'),
                      salt
                    })
            })
                     
    })
};



const cryptoPassword = async() => {
    encData = await createCryptoPassword(data);
    console.log(encData);
}

cryptoPassword();

// 위의 방식과 동일함
createCryptoPassword(data)
.then(result => console.log(result))
.catch(err => console.log(err));

