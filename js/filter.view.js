
var FilterView = Backbone.View.extend({
	_views: [],
	$recording_template: null,
	events: {
		"click .recording": "selectRecording"
	},
	constructor: function (options) {
		Backbone.View.prototype.constructor.apply(this, arguments);
		this.$recording_template = options.$recording_template;

		this.collection.on('add', this.addRecording.bind(this));
	},
	addRecording: function (recording) {
		console.log("Adding:", recording, recording.get('id'));
		var $rec = this.$recording_template.clone().data("recording_id", recording.get('id'));
		var view = new RecordingView({el: $rec, model: recording}).render();

		console.log(this.$el[0], $rec[0]);

		this.$el.append($rec);
		this._views.push(view);
	},
	selectRecording: function (event) {
		console.log(arguments)
		var $el = $(event.currentTarget);
		var rec = this.collection.get($el.data('recording_id'));
		this.trigger("selected", rec);
	}
});