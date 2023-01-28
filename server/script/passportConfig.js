const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');

function authLocalStrategy(passport) {

	passport.use(new LocalStrategy({
		usernameField: 'email'},
		async function (email, password, done) {
			try {
				let user = await User.findOne({ email: email });
				if (!user) return done(null, false);
				let checkPswd = await bcrypt.compare(password, user.password);
				if (checkPswd) {
					return done(null, user);
				} else {
					return done(null, false);
				}

			} catch (err) {
				return done(err, false);
			}
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	})

	passport.deserializeUser(async function (id, done) {
		try {
			let user = await User.findById(id);
			done(null, user)
		} catch (error) {
			done(error, false);
		}

	});


}

module.exports = {
	authLocalStrategy: authLocalStrategy
}


