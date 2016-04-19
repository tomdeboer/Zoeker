var _fs = require('fs');
var _path = require('path');

let extension = /(\w)*$/;

var RecordingModel = Backbone.Model.extend({
	defaults: {
		tsFile: "",
		hmtFile: "",
		imgFile: "",
		dateStart: null,
		dateStop: null,
		programName: "?program?",
		channelName: "?channel?",
		description: "?description?"
	},
	constructor: function(filepath) {
		Backbone.Model.prototype.constructor.apply(this, arguments);


		this.set('hmtFile', filepath);
		this.set('tsFile' , filepath.replace(extension, 'ts'));
		this.set('id'     , _path.basename(filepath));

		this.set('programName', this.get('id'));

		this.tmp_imgFile = filepath.replace(extension, 'png');
		if (_fileexists(this.tmp_imgFile)) {
			this.set("imgFile", this.tmp_imgFile);
			delete this.tmp_imgFile;
		} else if (_fileexists(this.get('tsFile'))) {
			setTimeout(this.generateImage.bind(this), 0);
		}

		setTimeout(this.parse.bind(this), 0);
	},
	generateImage: function (generate_if_not_exists) {
		_child.execFile('ffmpeg', [
			'-i', this.get('tsFile'),
			'-ss', '00:00:05',
			'-vf', 'scale=640:-1',
			'-vframes' , 1,
			this.tmp_imgFile
		], function (err, stdout, stderr) {
			if (err) throw err;

			this.set('imgFile', this.tmp_imgFile);
			delete this.tmp_imgFile;
		}.bind(this));
	},
  	parse: function () {
  		// dir/filename-minus-extension.hmt
  		var hmt_filepath = this.get('hmtFile');

		if ( ! _fileexists(hmt_filepath)) {
			console.warn(".hmt file not found: ", hmt_filepath);
			return false;
		}

		var self = this;
		_fs.readFile(hmt_filepath, function (err, buf) {

			var start = new Date(buf.readUInt32LE(0x280) * 1000);
			var stop  = new Date(buf.readUInt32LE(0x284) * 1000);
			var channelName = buf.toString("utf-8", 913, 913+31);
			var programName = buf.toString("utf-8", 666, 666+49);
			var description = buf.toString("binary", 1343, 1343+255);

			self.set({
				'dateStart': start,
				'dateStop': stop,
				'channelName': channelName || self.channelName,
				'programName': programName || self.programName,
				'description': description || "Geen omschrijving"
			});
		});



		return true;
	}
});
