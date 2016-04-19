var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	category: { type: Schema.Types.ObjectId, ref: 'Category'},
	brand: String,
	Supermarket: String,
	name: String,
	description: String,
	price: Number,
	image: String
});

ProductSchema.plugin(mongoosastic, {
	hosts: [
	'localhost:9200'
	]
});

module.exports = mongoose.model('Product', ProductSchema);