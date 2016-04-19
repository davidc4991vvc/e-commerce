var router = require('express').Router();
var async = require('async');
var faker = require('faker');
var Category = require('../models/category');
var Brand = require('../models/brand');
var Product = require('../models/product');


router.post('/search', function(req, res, next){
	console.log(req.body.search_term)
	Product.search({
		query_string: { query: req.body.search_term }
	}, function(err,results){
		if (err) return next(err);
		res.json(results);
	}); 
});

router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


router.post('/:name', function(req, res, next){
	async.waterfall([
		function(callback){
			Category.findOne({ name: req.params.name }, function(err, category){
				if (err) return next(err);
				callback(null, category);
			});
		},

		function(callback){
			Brand.findOne({ name: req.body.name }, function(err, brand){
				if (err) return next(err);
				callback(null, brand);
			});
		},

		function(category, brand, callback){
				var product = new Product();
				product.category  = category._id;
				product.name = req.body.name;
				product.brand = brand._id;
				product.price = req.body.price;
				product.description = req.body.description;
				product.save();
		}
	]);
	res.json({ message: 'Success'});
});

// router.get('/:name', function(req, res, next){
// 	async.waterfall([
// 		function(callback){
// 			Category.findOne({ name: req.params.name }, function(err, category){
// 				if (err) return next(err);
// 				callback(null, category);
// 			});
// 		},

// 		function(category, callback){
// 			for (var i=0; i<10; i++){
// 				var product = new Product();
// 				product.category  = category._id;
// 				product.name = faker.commerce.productName();
// 				product.description = faker.lorem.paragraph();
// 				product.price = faker.commerce.price();
// 				product.image = faker.image.image();

// 				product.save();
// 			}
// 		}
// 	]);
// 	res.json({ message: 'Success'});
// });

module.exports = router;