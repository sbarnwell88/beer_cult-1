var mongoose = require ('mongoose');
mongoose.connect(process.env.MONGODB_URI);


var Brewery = require('../models/brewery');
var User = require('../models/user');
var Beer = require('../models/beer');

mongoose.Promise = global.Promise;

Brewery.remove({}, function(error){
	console.log(error);
});

User.remove({}, function(error){
	console.log(error);
});

Beer.remove({}, function(error){
	console.log(error);
});

//save the data
var scoffLaw  = new Brewery({
	name: "scofflaw brewering company",
	beers: [],
	location: "Atlanta",
	email: "info@scofflawbeer.com",
	website: "scofflawbeer.com"
});

var doubleJeopardy = new Beer({
	name: "double Jeopardy",
	description: "hazy with golden orange hoppy, bittersweet. YUM!",
	reviews: "great beer",
	rating: 5,
	photo: "https://scofflawbeer.com/wp-content/uploads/2016/10/our-beers-double-jeopardy-1.jpg",
	locations: "Atlanta, Chicago, LA",
	breweryId: scoffLaw._id
});
scoffLaw.beers.push(doubleJeopardy);

var hooligan = new Beer({
	name: "hooligan",
	description: "hazy with golden orange hoppy, bittersweet. YUM!",
	reviews: "love the color",
	rating: 5,
	photo: "https://scofflawbeer.com/wp-content/uploads/2016/10/our-beers-double-jeopardy-1.jpg",
	locations: "Atlanta, Chicago, LA",
	breweryId: scoffLaw._id
});
scoffLaw.beers.push(hooligan);

var dirtyMike = new User({
	username: "dirtyMikester",
	password: 'password1',
	bio: "dirty mike is the name!",
	photo: "http://i.imgur.com/EykXDof.jpg",
	beers: [doubleJeopardy],
	fridge: []
});

var ct = new User({
	username: "Clarence",
	password: 'password1',
	bio: "I love web development!",
	photo: "http://i.imgur.com/EykXDof.jpg",
	beers: [hooligan],
	fridge: []
});

dirtyMike.save(function(error){
	if (error) console.log(error);
	console.log('dirty mike created!');
});

ct.save(function(error){
	if (error) console.log(error);
	console.log('ct created!');
});

hooligan.brewery = scoffLaw;
doubleJeopardy.brewery = scoffLaw;

doubleJeopardy.save(function(error){
	if (error) console.log(error);
	console.log('double Jeopardy created!');
});

hooligan.save(function(error){
	if (error) console.log(error);
	console.log('hooligan created!');
});

scoffLaw.save(function(error){
	if (error) console.log(error);
	console.log('scofflaw created!');
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beer_cult');

// Now that we're connected, let's save that connection to the database in a variable.
var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err){
  console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function() {
  console.log("database has been connected!");
});

module.exports = db;

mongoose.connection.close();
