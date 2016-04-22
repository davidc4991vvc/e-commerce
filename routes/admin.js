var router = require('express').Router();
var Category = require('../models/category');
var QRCode = require('qrcode');






router.get('/add-category', function(req, res, next){
	res.render('admin/add-category', { message: req.flash('success') });
});

router.post('/add-category', function(req, res, next){
	var category = new Category();
	category.name = req.body.name;

	category.save(function(err){
		if (err) return next(err);
		req.flash('success', 'Successfully added a category');
		return res.redirect('/add-category');
	});
});


router.get('/qr', function(req, res, next){
	res.render('admin/qr', { message: req.flash('success') });
});


router.post('/qr', function(req, res, next){
	// var category = new Category();
	var product = {
			name: String,
			category: String,
			brand: String,
			supermarket: String,
			description: String,
			price: Number
	};

	product.name = req.body.name;
	product.category = req.body.category;
	product.brand = req.body.brand;
	product.supermarket = req.body.supermarket;
	product.description = req.body.description;
	product.price = req.body.price;


	res.writeHead(200, { 'Content-Type': 'text/html' });

	QRCode.toDataURL(JSON.stringify(product),function(err,url){
		if(err) console.log('error: '+err);
		res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><div style='margin: auto; width: 60%; border: 3px solid #73AD21; padding: 10px;'><p>The following QR code contains the data below, please double check the data before printing this image!</p><img src='"+url+"'/><br>"+JSON.stringify(product)+"</div></body></html>");
	});



});


module.exports = router;