const request = require('request');
const fs = require('fs');
let requestP = (headers) => {
    return new Promise((reslove, reject) => {
        request(headers, (error, res, body) => {
            if (error) {
                reject({
                    error
                });
            } else if (res.statusCode !== 200) {
                reject({
                    res
                });
            } else {
                reslove(body);
            }
        });
    });
}
let requestPipe = (headers, fileName) => {
    return new Promise((reslove, reject) => {
        request(headers)
            .pipe(fs.createWriteStream(fileName))
            .on('close', () => {
                reslove();
            });
    });
}

module.exports = {
    requestP,
    requestPipe
};