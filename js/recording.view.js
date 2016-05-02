
var RecordingView = Backbone.View.extend({
	constructor: function () {
		Backbone.View.prototype.constructor.apply(this, arguments);

		this.model.on('change', this.render.bind(this));
	},
	render: function () {
		console.log("Rendering...", this.model, this.model.get('programName'));
		this.$('.programName').text(this.model.get('programName'));
		this.$('.thumbnail').attr('src', this.model.get('imgFile') ? "file://" + this.model.get('imgFile') : placeholderImage);

		var duration_str, duration = (this.model.get('dateStop') - this.model.get('dateStart')) / 1000;
		if (duration < 3600) {
			duration_str = Math.floor(duration / 60) + "m " + (duration % 60) + "s";
		} else {
			duration_str = Math.floor(duration / 3600) + "h " + Math.floor(duration / 60 % 60) + "m";
		}

		this.$('.duration').text(duration_str);
	}
});
