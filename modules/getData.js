const cheerio = require('cheerio');

const requestP = require('./request.js');
const {headers} = require('../config.js');

module.exports = {
    getPagesNum,
    getImgArr
}
async function getPagesNum() {
    let data = await requestP(headers);
    let $ = cheerio.load(data);
    return $('span.current-comment-page')[0].children[0].data.replace('[', '').replace(']', '');
}

async function getImgArr(page) {
    let packData = (data) => {
        const $ = cheerio.load(data);
        let imgsArr = $('.text img').toArray();
        return imgsArr.map(img => {
            return {
                src: `http:${img.attribs.src}`
            };
        });
    }
    let header = {};
    Object.assign(header, headers);
    header.url += `page-${page}`;
    // console.log(header.url)
    try {
        let data = await requestP(header);
        let imgsurlArr = packData(data);
        return imgsurlArr;
    } catch (e) {
        // console.log(`[error]: ${JSON.stringify(e)}`);
        return [];
    }
}