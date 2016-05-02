
var DetailView = Backbone.View.extend({
	constructor: function () {
		Backbone.View.prototype.constructor.apply(this, arguments);

		this.model.on('change', this.render.bind(this));
	},
	render: function () {
		console.log("Details:", this.model, this.model.get('programName'));
		this.$('.programName').text(this.model.get('programName'));
		this.$('.description').text(this.model.get('description'));
		this.$('.channelName').text(this.model.get('channelName'));
		this.$('.dateStart').text(moment(this.model.get('dateStart')).format("dddd d MMM YYYY HH:mm"));
		this.$('.thumbnail').attr('src', this.model.get('imgFile') ? "file://" + this.model.get('imgFile') : placeholderImage);

		// Nice timings
		var duration_str, duration = (this.model.get('dateStop') - this.model.get('dateStart')) / 1000;
		var minutes = Math.floor(duration / 60 % 60);
		if (duration < 3600) {
			var seconds = duration % 60;
			duration_str = minutes + (minutes > 1 ? " minuten" : " minuut") + " en " + seconds + (seconds > 1 ? " seconden" : " seconde");
		} else {
			duration_str = Math.floor(duration / 3600) + " uur en " + minutes + (minutes > 1 ? "minuten" : "minuut");
		}
		this.$('.duration').text(duration_str);


	}
});
