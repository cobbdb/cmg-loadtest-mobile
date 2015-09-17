var fs = require('fs'),
    keys = require('./keys.json').keys,
    WebPageTest = require('webpagetest'),
    concurrency = 9,
    runsPerDay = 195 * keys.length / concurrency,
    msPerDay = 24 * 60 * 60 * 1000,
    msPerRun = msPerDay / runsPerDay,
    i = 0;

global.setInterval(function () {
    var wpt = new WebPageTest('www.webpagetest.org', keys[i]);
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

    i += 1;
    i %= keys.length;
}, msPerRun);
