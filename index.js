const fs = require('fs');

const {headers, downloadPath} = require('./config.js');
const {requestP} = require('./modules/request.js');
const packData = require('./modules/packData.js');
const download = require('./modules/download.js');

let main = async () => {
    fs.exists(downloadPath, exists => {
        if (!exists) {
            fs.mkdir(downloadPath);
        }
    })
    try {
        let data = await requestP(headers);
        let imgsurlArr = packData(data);
        imgsurlArr.map(img => {
            download(img.src).then((fileName) => {
                console.log(`success: ${fileName}`);
            });
        });
    } catch (e) {
        console.log(`[error]: ${JSON.stringify(e)}`);
    }
};

main();