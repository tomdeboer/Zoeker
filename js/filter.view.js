
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
		var string = event.currentTarget.value;

		// If string is empty, show all recordings
		if (string.length < 1) {
			this._views.forEach(function (recording_view) {
				recording_view.$el.show();
			});
			return;
		}
		// Match all recordings agains string
		this._views.forEach(function (recording_view) {
			if (fuzzy.test(string, recording_view.model.get('programName'))) {
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
		var $el = $(event.currentTarget);
		var rec = this.collection.get($el.data('recording_id'));
		this.trigger("selected", rec);
	}
});
