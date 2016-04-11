
var RecordingView = Backbone.View.extend({
	constructor: function () {
		Backbone.View.prototype.constructor.apply(this, arguments);

		this.model.on('change', this.render.bind(this));
	},
	render: function () {
		console.log("Rendering...", this.model, this.model.get('programName'));
		this.$('.header').text(this.model.get('programName'));
	}
});
