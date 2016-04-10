"use strict"

var _fs = require('fs');

var config = { dir: [] };

try {
    // Load user config and merge it App.config
    require('util')._extend(config, JSON.parse(require('fs').readFileSync('config.json')));
    console.log("config.json read...");
} catch (err) {
    console.log(("Warning: could not read/parse config.json!:\n" + err).yellow);
}

if (config.dirs.length < 1){
    console.warn("Nothing to do: no directories specified in config...".red);
}

function _fileexists(filepath) {
    try {
        return !!_fs.statSync(filepath);
    } catch (err) {
        console.error(err);
        return false;
    }
}

var RecordingsCollection = Backbone.Collection.extend({ model: RecordingModel, comperator: "programName" });

var ZoekerApp = function () {
    this.config = config;
    this.recordings = new RecordingsCollection();
}

ZoekerApp.prototype.init = function () {
    console.log("Init!");

    this.filterView = new FilterView({
        el: $("#recordings"),
        $recording_template: $("#recording_template").remove().attr('id','').clone(),
        collection: this.recordings
    });
    this.filterView.once('selected', function () {
        $("#info_message").remove();
    });
    this.filterView.on('selected', function (recording) {
        if (this.detailView) {
            this.detailView.destory();
        }
        this.detailView = new DetailView({
            model: recording,
            el: $("#recording")
        }).render();
    });


    // $("#recording").hide();

    this.scanDir();

    return 42;
}

ZoekerApp.prototype.scanDir = function () {
    var self = this;
    this.config.dirs.forEach(function (dir){
        if (!_fileexists(dir)) {
            console.error("Invalid dir: '" + dir + "'");
            return false;
        }

        dir = dir + "/";

        _fs.readdir(dir, function (err, files) {
            files.forEach(function (filename) {
                console.log(filename);
                if (!/\.ts$/.test(filename)) {
                    return;
                }
                var path = dir + filename;
                self.recordings.add(new RecordingModel(path));
            });
        });
    });
}

ZoekerApp.prototype.addRecordingsDOMElement = function (recording){
    this.$recordings.append($el);

    var view = RecordingView();
}
