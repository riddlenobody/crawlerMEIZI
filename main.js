var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var config = {
    url: 'http://jandan.net/ooxx/page-1973',
    Connection: 'keep-alive',
    UA: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36',
    DOM: '.text img',
    downloadurl: '/Users/admin/meizi/'
}

var options = {
    url: config.url,
    headers: {
        'Connection': config.Connection,
        'User-Agent': config.UA
    }
};

function make(data) {
    var $ = cheerio.load(data);
    var meizi = $(config.DOM).toArray();
    var len = meizi.length;
    for (var i = 0; i < len; i++) {
        var imgsrc = meizi[i].attribs.src;
        download(imgsrc, path.basename(imgsrc), function() {
            console.log('success:');
        })
    }
}

function download(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        if (err) {
            console.log('err: ' + err);
            return false;
        }
        request(uri).pipe(fs.createWriteStream(config.downloadurl + filename)).on('close', callback);
    });
}

request(options, function(error, res, body) {
    if (!error && res.statusCode === 200) {
        make(body);
    } else {
        console.error('请求url失败');
    }
})
