const Koa = require('koa');
const router = (require('koa-router'))();
const fs = require('fs');

const {headers} = require('./config.js');
const requestP = require('./modules/request.js');
const cheerio = require('cheerio');

const app = new Koa();

app.use(async (ctx, next) => {
    await next();
});

router.get('/:page', getImgRouter);
router.get('/', getImgRouter);

app.use(router.routes());

app.listen(3000);
console.log('http://localhost:3000');

async function getImgRouter(ctx, next) {
    let page = Number(ctx.params.page);
    let pagesNum = await getPagesNum();
    page = isNaN(page) ? pagesNum : page;
    if (page <= pagesNum) {
        let imgArr = await getImgArr(page);
        if (imgArr && imgArr.length) {
            ctx.body = {
                imgArr,
                pagesNum
            };
        } else {
            ctx.body = {
                error: 'no image'
            };
        }
    } else {
        ctx.body = {
            error: 'pagesNum is error'
        };
    }
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