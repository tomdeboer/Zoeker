
var RecordingView = Backbone.View.extend({
	render: function () {
		console.log("Rendering...", this.model, this.model.get('programName'));
		this.$('.header').text(this.model.get('programName'));
	}
});