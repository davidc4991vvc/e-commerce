var router = require('express').Router();  
var User = require('../models/user');
var Product = require('../models/product');
var Cart = require('../models/cart');

var async = require('async');

var stripe = require('stripe') ('sk_test_KOqGXCWtI5fVAq3jgLF93rJF');


function paginate(req, res, next) {

	var perPage = 9;
	var page = req.params.page - 1;
	Product
		.find()
		.skip( perPage * page)
		.limit( perPage )
		.populate('category')
		.exec(function(err, products){
			if(err) return next(err);
			Product.count().exec(function(err,count){
				if (err) return next(err);
				res.render('main/product-main', {
					products: products,
					pages: count / perPage
				});
			});
		});
}

Product.createMapping(function(err, mapping){
	if (err) {
		console.log("error creating mapping");
		console.log(err);
	} else {
		console.log("Mapping created");
		console.log(mapping);
	}
})

var stream = Product.synchronize();
var count = 0;

stream.on('data', function(){
	count++;
});

stream.on('close', function(){
	console.log("Indexed "+ count + " documents");
});

stream.on('error', function(){
	console.log(err);
});

router.get('/cart', function(req, res, next){
	Cart
		.findOne({ owner: req.user._id })
		.populate('items.item')
		.exec(function(err, foundCart){
			if (err) return next(err);
			res.render('main/cart',{
				foundCart: foundCart,
				message: req.flash('remove')
			});
		});
});

router.post('/product/:product_id', function(req, res, next){
	Cart.findOne({ owner: req.user._id }, function(err, cart){
		cart.items.push({
			item: req.body.product_id,
			price: parseFloat(req.body.priceValue),
			quantity: parseInt(req.body.quantity)
		});
		cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);
		cart.save(function(err){
			if(err) return next(err);
			return res.redirect('/cart');
		});
	});
});

router.get('/cart_ios', function(req, res, next){
	Cart
		.findOne({ owner: req.user._id })
		.populate('items.item')
		.exec(function(err, foundCart){
			if (err) return next(err);
			res.setHeader('Content-Type', 'application/json');
    		res.send(JSON.stringify(foundCart));
		});
});

router.post('/cart_ios', function(req, res, next){
	Cart.findOne({ owner: req.user._id }, function(err, cart){
		cart.items.push({
			item: req.body.product_id,
			price: parseFloat(req.body.priceValue),
			quantity: parseInt(req.body.quantity)
		});
		cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);
		cart.save(function(err){
			if(err) return next(err);
			return 						
			res.setHeader('Content-Type', 'application/json');
    		res.send("Success");
		});
	});
});

router.post('/remove', function(req, res, next) {
	Cart.findOne({ owner: req.user._id },  function(err, foundCart){
		foundCart.items.pull(String(req.body.item));

		foundCart.total = (foundCart.total - parseFloat(req.body.price)).toFixed(2);
		foundCart.save(function(err, found){
			if (err) return (err);
			req.flash('remove', 'Successfully removed');
			res.redirect('/cart');
		});
		// console.log(req.body)
	});
});

router.post('/search', function(req, res, next){
	res.redirect('/search?q=' + req.body.q);
});

router.get('/search', function(req, res, next){
	if (req.query.q){
		Product.search({
			query_string: { query: req.query.q}
		}, function(err, results){ 
			if (err) return next(err);
			var data = results.hits.hits.map(function(hit){
				return hit;
			});
			res.render('main/search-result',{
				query: req.query.q,
				data: data
			});
		});
	}
});
	
router.get("/", function(req, res, next){

	if(req.user){
		paginate(req, res, next);
	} else {
		res.render('main/home');	
	}
});

router.get('/page/:page', function (req, res, next){
	paginate(req,res,next);
});

router.get('/about', function(req, res){
	res.render('main/about');
});

//for web application (returns a page rendered)
router.get('/products/:id', function(req, res, next){
	Product
	.find({ category: req.params.id })
	.populate('category')
	.exec(function(err, products){
		if(err) return next(err);
		res.render('main/category', {
			products: products
		});
	});
}); 
  
//for ios application (returns a json object)
router.get('/products_ios/:id', function(req, res, next){
	Product
	.find({ category: req.params.id })
	.populate('category')
	.exec(function(err, products){
		if(err) return next(err);
		res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify(products));
	});
}); 

router.get('/product/:id', function(req, res, next){
	Product.findById({ _id: req.params.id }, function(err, product){
		if (err) return next(err);
		res.render('main/product', {
			product: product
		});
	});
});

//for ios application (returns a json object)
router.get('/product_ios/:id', function(req, res, next){
	Product.findById({ _id: req.params.id }, function(err, product){
		if (err) return next(err);
		res.setHeader('Content-Type', 'application/json');
    	res.send(product);
	});
});

router.post('/payment', function(req,res,next){
	console.log(req.body);
	console.log(req.user);
	var stripeToken = req.body.stripeToken;
	var currentCharges = Math.round(req.body.stripeMoney * 100);
	stripe.customers.create({
		source: stripeToken,
	}).then(function(customer) {
		return stripe.charges.create({
		  amount: currentCharges,
		  currency: 'usd',
		  customer: customer.id
		});
	}).then(function(charge){
		async.waterfall([
			function(callback){
				Cart.findOne({ owner: req.user._id }, function(err, cart){
					callback(err, cart);
				});
			},
			function(cart, callback){
				User.findOne({ _id: req.user._id}, function(err, user){
					if(user) {
						for (var i = 0; i < cart.items.length; i++){
							user.history.push({
								item: cart.items[i].item,
								paid: cart.items[i].price
							});
						}
						user.save(function(err, user){
							if (err) return next(err);
							callback(err, user);
						});
					}
				});
			},
			function(user){
				Cart.update({ owner: user._id }, { $set: { items: [], total: 0 }}, function(err, updated){
					if(updated) {
						res.redirect('/profile');
					}
				});
			}
		]);
	})
});

router.post('/payment_ios', function(req,res,next){
	console.log(req.body);
	console.log(req.user);
	var stripeToken = req.body.stripeToken;
	var currentCharges = Math.round(req.body.stripeMoney * 100);
	stripe.customers.create({
		source: stripeToken,
	}).then(function(customer) {
		return stripe.charges.create({
		  amount: currentCharges,
		  currency: 'usd',
		  customer: customer.id
		});
	}).then(function(charge){
		async.waterfall([
			function(callback){
				Cart.findOne({ owner: req.user._id}, function(err, cart){
					callback(err, cart);
				});
			},
			function(cart, callback){
				User.findOne({ _id: req.user._id}, function(err, user){
					if(user) {
						for (var i = 0; i < cart.items.length; i++){
							user.history.push({
								item: cart.items[i].item,
								paid: cart.items[i].price
							});
						}
						user.save(function(err, user){
							if (err) return next(err);
							callback(err, user);
						});
					}
				});
			},
			function(user){
				Cart.update({ owner: req.body.description }, { $set: { items: [], total: 0 }}, function(err, updated){
					if(updated) {
						res.setHeader('Content-Type', 'application/json');
    					res.send("Success");
					}
				});
			}
		]);
	})
});

module.exports = router;