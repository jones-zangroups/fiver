// backend/routes/auth.js
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   callbackURL: 'http://localhost:5000/auth/google/callback',
    callbackURL: 'http://localhost:5000/auth/google/callback',

    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };
      done(null, user); // Replace with database logic if needed
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // res.redirect('http://localhost:3000/success'); // Redirect to frontend success page
    res.redirect('http://localhost:3000/seller-profile.html');
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('http://localhost:3000/login'));
});

module.exports = router;
