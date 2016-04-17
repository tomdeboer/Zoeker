
var RecordingView = Backbone.View.extend({
	constructor: function () {
		Backbone.View.prototype.constructor.apply(this, arguments);

		this.model.on('change', this.render.bind(this));
	},
	render: function () {
		console.log("Rendering...", this.model, this.model.get('programName'));
		this.$('.programName').text(this.model.get('programName'));
		this.$('.channelName').text(this.model.get('channelName'));
		this.$('.thumbnail').attr('src', this.model.get('imgFile') ? "file://" + this.model.get('imgFile') : placeholderImage);
	}
});
