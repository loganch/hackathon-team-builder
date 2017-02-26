var express = require('express');
var router = express.Router();

var GoogleSpreadsheet = require('google-spreadsheet');
var Async = require('async');
var doc = new GoogleSpreadsheet('1VaSkPxcKhNXHhFoMMs5OGyXjB-gZQZamTL9ue6YRKiw');
var sheet;

/* GET home page. */
router.get('/', function(req, res, next) {
    doc.getInfo(function(err, info) {
        console.log(info.title);
        info.worksheets[0].getRows(function(err, rows) {
            res.send(rows);
        });
    });
});


module.exports = router;