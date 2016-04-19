var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
	name: { type: String, unique: true, lowercase: true}
});

module.exports = mongoose.model('Brand', BrandSchema);

