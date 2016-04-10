
var DetailView = Backbone.View.extend({
	render: function () {
		console.log("Rendering...", this.model, this.model.get('programName'));
		this.$('.programName').text(this.model.get('programName'));
	}
});