module.exports = {
	database: 'mongodb://localhost/e-commerce',
	port: 3000,
	secretKey: "cartocri",

	facebook: {
		clientID: process.env.FACEBOOK_ID || '205037839853153',
		clientSecret: process.env.FACEBOOK_SECRET || 'dc97bd3f844279b70631391ef3aad0cc',
		profileFields: ['emails', 'displayName'] ,
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	}
}