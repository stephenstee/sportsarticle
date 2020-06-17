var mongoose = require("mongoose");

var sportSchema = new mongoose.Schema({
	title: String,
	image: String,
	description: String,
	time: {type:Date, default:Date.now}
	
});

var Sport = mongoose.model("Sport", sportSchema);

module.exports = Sport;