var router = require('express').Router();
var Category = require('../models/category');
var Brand = require('../models/brand');


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

router.get('/add-brand', function(req, res, next){
	res.render('admin/add-brand', { message: req.flash('success') });
});

router.post('/add-brand', function(req, res, next){
	var brand = new Brand();
	brand.name = req.body.name;

	brand.save(function(err){
		if (err) return next(err);
		req.flash('success', 'Successfully added a brand');
		return res.redirect('/add-brand');
	});
});

module.exports = router;