var fs = require('fs'),
    WebPageTest = require('webpagetest'),
    wpt = new WebPageTest('www.webpagetest.org', 'A.8ac6121d4e564cada1a270cd7a5d1de1'),
    concurrency = 9,
    runsPerDay = 190 / concurrency,
    msPerDay = 24 * 60 * 60 * 1000,
    msPerRun = msPerDay / runsPerDay;

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
