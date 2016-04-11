
var DetailView = Backbone.View.extend({
	constructor: function () {
		Backbone.View.prototype.constructor.apply(this, arguments);

		this.model.on('change', this.render.bind(this));
	},
	render: function () {
		this.$('.programName').text(this.model.get('programName'));
		this.$('.description').text(this.model.get('description'));
		this.$('.channelName').text(this.model.get('channelName'));
	}
});
