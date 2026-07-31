const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config(); // Fixed execution
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Config
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Auth Routes
app.get('/', (req, res) => {
    res.send(req.isAuthenticated() ? `Logged in as ${req.user.displayName}` : "Logged out");
});

app.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/api-docs' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Main Application Routes
app.use('/', require('./routes/index.js'));

// Database & Server Startup
mongodb.initDb((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        app.listen(port, () => { 
            console.log(`Database ready. Running on http://localhost:${port}`);
        });
    }
});