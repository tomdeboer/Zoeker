var _fs = require('fs');
var _path = require('path');

var RecordingModel = Backbone.Model.extend({
	_filepath: "",
	defaults: {
		dateStart: null,
		dateStop: null,
		programName: "?program?",
		channelName: "?channel?",
		description: "?description?"
	},

	constructor: function(filepath) {
		Backbone.Model.prototype.constructor.apply(this, arguments);

		this._filepath = filepath;
		this.set('id', _path.basename(filepath));
		this.set('programName', this.get('id'));

		setTimeout(this.parse.bind(this), 0);
	},
  	parse: function () {
  		// dir/filename-minus-extension.hmt
  		var hmt_filepath = _path.dirname(this._filepath) + "/" + _path.basename(this._filepath, _path.extname(this._filepath)) + ".hmt";

		if ( ! _fileexists(hmt_filepath)) {
			console.warn(".htm file not found: ", hmt_filepath);
			return false;
		}

		var self = this;
		_fs.readFile(hmt_filepath, function (err, buf) {

			var start = new Date(buf.readUInt32LE(0x280) * 1000);
			var stop  = new Date(buf.readUInt32LE(0x284) * 1000);
			var channelName = buf.toString("utf-8", 913, 913+31);
			var programName = buf.toString("utf-8", 666, 666+49);
			var description = buf.toString("binary", 1343, 1343+255);

			self.set('dateStart', start);
			self.set('dateStop', stop);
			self.set('channelName', channelName || self.channelName);
			self.set('programName', programName || self.programName);
			self.set('description', description || "Geen omschrijving");
		});



		return true;
	}
});
