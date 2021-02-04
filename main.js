const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const expressValidator = require('express-validator');
const router = require('./routes/index');
const passport = require("passport"),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  User = require('./models/user');
const connectFlash = require('connect-flash');

app.use(cookieParser('secretCuisine123'));
app.use(expressSession({
  secret: "secretCuisine123",
  cookie: {
    maxAge: 4000000
  },
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(expressValidator());

app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

mongoose.connect('mongodb://localhost:27017/confetti_cuisine', { useNewUrlParser: true });
const db = mongoose.connection;

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.set('view engine', 'ejs');
app.use(layouts);
app.use('/', router);
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
app.use(express.static('public'));

app.listen(3000);