var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
const re = require('../render/render.core.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    .sendFile((path.join(__dirname , '../views/index.html')));
});

router.get('/render', function(req, res, next) {
    re.render(clips);
    res.status(200);
});


router.get('/video', function(req, res) {
    const path = './export/final.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': 'bytes ' + start-end/fileSize,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res)
    }
});


const clips = ['../database/merged.mp4','../database/merged1.mp4','../database/merged2.mp4','../database/merged3.mp4'];

module.exports = router;
