const cheerio = require('cheerio');
let packData = (data) => {
    const $ = cheerio.load(data);
    let imgsArr = $('.text img').toArray();
    imgsArr = imgsArr.map(img => {
        return {
            src: img.attribs.src
        };
    });
}


module.exports = packData;