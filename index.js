const fs = require('fs');

const {headers, downloadPath} = require('./config.js');
const {requestP} = require('./modules/request.js');
const packData = require('./modules/packData.js');
const download = require('./modules/download.js');
(async () => {
    let mkdir = new Promise((reslove, rejecet) => {
        fs.exists(downloadPath, exists => {
            reslove(exists);
        })
    });
    let exists = await mkdir;
    if (!exists) {
        fs.mkdir(downloadPath);
    }
})();

let main = async () => {
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