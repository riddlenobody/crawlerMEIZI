const Koa = require('koa');
const router = (require('koa-router'))();
const fs = require('fs');


const {getPagesNum, getImgArr} = require('./modules/getData.js');

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

