/** @format */

const express = require('express');
const { Result } = require('express-validator');
passport = require('passport');
mongoose = require('mongoose');
alert = require('alert');
fileUpload = require('express-fileupload');
app = express();
passport = require('passport');
bodyParser = require('body-parser');
LocalStrategy = require('passport-local');
passportLocalMongoose = require('passport-local-mongoose');

app.use(
	require('express-session')({
		secret: 'Any normal Word', //decode or encode session
		resave: false,
		saveUninitialized: false,
	})
);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(fileUpload());

const routes = require('./routes/index');
app.use('/', routes);

mongoose.connect('mongodb://127.0.0.1/konnektmajor');

app.listen(process.env.PORT || 8080, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Server started at 8080');
	}
});
