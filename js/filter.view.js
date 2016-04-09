
var FilterView = Backbone.View.extend({
	_views: [],
	$recording_template: null,
	constructor: function (options) {
		Backbone.View.prototype.constructor.apply(this, arguments);
		this.$recording_template = options.$recording_template;

		this.collection.on('add', this.addRecording.bind(this));
	},
	addRecording: function (recording) {
		console.log("Adding:", recording);
		var $rec = this.$recording_template.clone();
		var view = new RecordingView({el: $rec, model: recording}).render();

		console.log(this.$el[0], $rec[0]);

		this.$el.append($rec);
		this._views.push(view);
	}
});