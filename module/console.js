// fs -> 파일시스템
const fs = require('fs');
const { Console } = require('console');

const output = fs.createWriteStream('./stdout.log'); // ./ -> 같은경로
const errorOutput = fs.createWriteStream('./stderr.log');

// logger -> log를 남기는 객체
const logger = new Console({ stdout : output, stderr : errorOutput });

const msg = 'Log Writing';

logger.log('Result : %s', msg); // stdout
logger.error(`Result : ${msg}`); // stderr