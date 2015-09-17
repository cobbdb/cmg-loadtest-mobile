var fs = require('fs'),
    keys = require('./keys.json').keys,
    WebPageTest = require('webpagetest'),
    concurrency = 1,
    runsPerDay = 195 * keys.length / concurrency,
    msPerDay = 24 * 60 * 60 * 1000,
    msPerRun = msPerDay / runsPerDay,
    i = 0;

global.setInterval(function () {
    var wpt = new WebPageTest('www.webpagetest.org', keys[i]);
    wpt.runTest('http://www.atlantacmgsite.com', {
        runs: concurrency
    }, function (err, data) {
        var msg = global.JSON.stringify(err || data) + '\n\n';
        if (i === 0) {
            fs.writeFile('results.log', msg, function (err) {});
        } else {
            fs.appendFile('results.log', msg, function (err) {});
        }
    });

    i += 1;
    i %= keys.length;
}, msPerRun);
