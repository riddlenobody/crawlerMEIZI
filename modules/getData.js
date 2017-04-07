const cheerio = require('cheerio');

const requestP = require('./request.js');
const {headers} = require('../config.js');

let pagesNum,
    data;
module.exports = {
    getPagesNum,
    getImgArr
}
async function getPagesNum() {
    data = await requestP(headers);
    let $ = cheerio.load(data);
    pagesNum = $('span.current-comment-page')[0].children[0].data.replace('[', '').replace(']', '');
    return pagesNum;
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
    let imgsurlArr;
    try {
        if (pagesNum === page) {
            imgsurlArr = packData(data);
        } else {
            data = await requestP(header);
            imgsurlArr = packData(data);
        }
        return imgsurlArr;
    } catch (e) {
        // console.log(`[error]: ${JSON.stringify(e)}`);
        return [];
    }
}