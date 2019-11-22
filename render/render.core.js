const ffmpeg = require('fluent-ffmpeg');
const path = require("path");
ffmpeg.setFfmpegPath(path.join(__dirname, '../ffmpeg/bin/ffmpeg.exe'));
ffmpeg.setFfprobePath(path.join(__dirname, '../ffmpeg/bin/ffprobe.exe'));


//VIDEO TRIMMER
module.exports.trimmer = function(filename, I, D) {
    ffmpeg('../database/' + filename)
        .setStartTime(I)
        .setDuration(D)
        .on('progress', function (progress) {
            console.log(+progress.percent);
        })
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Merging finished !');
        })
        .mergeToFile('../export/TRIM' + filename + '.mp4', '../scratch');
};


//VIDEO CONCATENATOR
module.exports.render = function(SortedFilePathArray) {
    ffmpeg(path.join(__dirname, SortedFilePathArray[0]))
        .input(path.join(__dirname, SortedFilePathArray[1]))
        .input(path.join(__dirname, SortedFilePathArray[2]))
        .input(path.join(__dirname, SortedFilePathArray[3]))
        .on('progress', function (progress) {
            console.log(+progress.percent);
        })
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Merging finished !');
        })
        .mergeToFile(path.join(__dirname, '../export/final.mp4'), '../scratch');
};

const clips = ['../database/merged.mp4','../database/merged1.mp4','../database/merged2.mp4','../database/merged3.mp4']

