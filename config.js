const config = {
    downloadurl: './imgs/',
    headers: {
        url: 'http://jandan.net/ooxx/page-1973',
        gzip: true, //解决编码为乱码
        headers: {
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cache-Control': 'max-age=0',
            'Host': 'jandan.net',
            'Upgrade-Insecure-Requests': '1',
            'accept-charset': 'gb2312'
        }
    }
}
module.exports = config;