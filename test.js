var fs = require('fs'),
    keys = require('./keys.json').keys,
    WebPageTest = require('webpagetest'),
    concurrency = 9,
    runsPerDay = 190 / concurrency,
    msPerDay = 24 * 60 * 60 * 1000,
    msPerRun = msPerDay / runsPerDay;

keys.forEach(function (key) {
    var wpt = new WebPageTest('www.webpagetest.org', key);
    global.setInterval(function () {
        wpt.runTest('http://www.atlantacmgsite.com', {
            runs: concurrency
        }, function (err, data) {
            if (err) {
                return console.log('>!!! WPT ERROR', err);
            }
            fs.writeFile('results.log', global.JSON.stringify(data), function (err) {
                if (err) {
                    return console.log('>!!! LOG ERROR', err);
                }
                console.log('> Started test:\n\t\t', data);
            });
        });
    }, msPerRun);
});
