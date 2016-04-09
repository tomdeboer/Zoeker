var _fs = require('fs');
var _path = require('path');

var RecordingModel = Backbone.Model.extend({
	_filepath: "",
	defaults: {
		dateStart: null,
		dateStop: null,
		programName: "?program?",
		channelName: "?channel?"
	},

	constructor: function(filepath) {
		Backbone.Model.prototype.constructor.apply(this, arguments);

		this._filepath = filepath;
		this.set('programName', _path.basename(filepath));
	},
  	parse: function () {
		if ( ! _fs.statSync(this._filename)) {
			console.warm(".html file not found for:", this._filename);
			return false;
		}
		return true;
	}
});