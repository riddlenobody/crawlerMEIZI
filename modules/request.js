const request = require('request');

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
module.exports = requestP;