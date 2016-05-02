
var FilterView = Backbone.View.extend({
	_views: [],
	$recordings: null,
	$recording_template: null,
	events: {
		"keyup #filter_input": "filter",
		"click .recording": "selectRecording"
	},
	constructor: function (options) {
		// Run super's constructor
		Backbone.View.prototype.constructor.apply(this, arguments);
		
		// Set non-default options
		this.$recording_template = options.$recording_template;
		this.$recordings = options.$recordings;

		// React to new recordings being added
		this.collection.on('add', this.addRecording.bind(this));
		// Select the first added recording
		this.collection.once('add', function () {
			this._views[0].$el.click();
		}.bind(this))
	},
	filter: function (event) {
		// #filter_input's value
		var searchString = event.currentTarget.value;

		// Create regular expressions
		var terms = searchString.split(',').map(function (str) {
			return str.trim();
		}).filter(function(str) {
			return str.length;
		}).map(function (str) {
			var x = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			// return new RegExp("(?:[\W]|^)" + x + "(?:[\W]|$)", "i");
			return new RegExp(x, "i");
		});

		console.log(terms);

		// Filter callback
		function filter(string) {
			var i;
			for(i = 0; i < terms.length; ++i)
				if (!string.match(terms[i]))
					return false;

			return true;
		}

		// If string is empty, show all recordings
		if (searchString.length < 1) {
			this._views.forEach(function (recording_view) {
				recording_view.$el.show();
			});
			return;
		}
		// Match all recordings via filter()
		this._views.forEach(function (recording_view) {
			if (filter(recording_view.model.get('programName'))) {
				recording_view.$el.show();
			} else {
				recording_view.$el.hide();
			}
		});

	},
	addRecording: function (recording) {
		console.log("Adding:", recording, recording.get('id'));

		var $rec = this.$recording_template.clone().data("recording_id", recording.get('id'));
		var view = new RecordingView({el: $rec, model: recording});
		view.render();

		this.$recordings.append($rec);
		this._views.push(view);
	},
	selectRecording: function (event) {
		// Remove old .selected class
		var old_el = this.$recordings[0].querySelector('.selected');
		if (old_el) old_el.classList.remove('selected')
		// Find new selected recording
		var new_el = event.currentTarget;
		new_el.classList.add('selected');

		var $el = $(event.currentTarget);
		var rec = this.collection.get($el.data('recording_id'));
		this.trigger("selected", rec);
	}
});
