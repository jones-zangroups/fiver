// backend/server.js
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');  // Add this import
const path = require('path');
const User = require('./models/User'); // Import the User model

const app = express();

// Session middleware
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve static files
// app.use(express.static(path.join(__dirname, '../frontend/pages')));

// Passport config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find user by Google ID
      let user = await User.findOne({ googleId: profile.id });

      // If the user doesn't exist, create a new user
      if (!user) {
        user = new User({
          googleId: profile.id,
          username: profile.displayName,  // Use Google profile's display name as the username
          email: profile.emails[0].value,  // Use the first email from the Google profile
          isSeller: false  // Set default as false, can be updated later
        });

        await user.save();  // Save the new user to the database
      }

      return done(null, user);  // Pass user to the next middleware
    } catch (err) {
      return done(err);  // Handle errors
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to OAuth Test</h1>
    ${req.user ? 
        `<h2>Hello ${req.user.username}</h2>
         <p>Email: ${req.user.email}</p>
         <a href="/logout">Logout</a>`
      : 
        '<a href="/auth/google">Login with Google</a>'
    }
  `);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('Authentication successful');
    res.redirect('/seller-profile.html'); // Redirect to the seller profile page
  }
);

app.get('/login', (req, res) => {
    res.send('Login failed <a href="/auth/google">Try again</a>');
});

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
