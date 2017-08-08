var Curl = require('node-libcurl').Curl;
var fs = require('fs');

var urls = ['https://polis-api-proxy.herokuapp.com/api/v3/conversations/3phdex2kjf/comments?include_social=true']
var polis = ['uberx']

for (var i = 0; i < polis.length; i++) {
    var project = polis[i];
    var curl = new Curl();
    curl.setOpt('URL', urls[i]);
    curl.setOpt('HTTPHEADER', ['Authorization : pkey_84N12fk7d9kderRe9d3sdPm9']);
    curl.setOpt('SSL_VERIFYPEER', 0);
    curl.on('end', function (statusCode, body, headers) {
        var data = JSON.parse(body);
        var count = 1;
        for (var d of data) {
            var txt = d.txt
            var fileName = project + '\\' + count + '.html';
             var content = '<!DOCTYPE html>'
                + '<html><head></head><body><div style="width: 100%;text-align: center"><h1>' + txt + '</h1></div></body></html>';
            fs.writeFile(fileName, content, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            count++; 
        }
    });
    curl.on('error', function (err, curlErrCode) {
        console.error('Err: ', err);
        console.error('Code: ', curlErrCode);
        this.close();
    });
    curl.perform();
}