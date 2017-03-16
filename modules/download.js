const path = require('path');

const {requestPipe} = require('./request.js');
const {downloadPath} = require('../config.js');
const mkdirs = require('./mkdirs.js');
const download = (url) => {
    return new Promise((reslove, reject) => {
        let fileName = downloadPath + path.basename(url);
        //创建文件夹
        requestPipe(`http:${url}`, fileName).then(() => {
            reslove(fileName);
        });
    });
};
module.exports = download;