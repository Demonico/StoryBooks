const express = require('express');
const mongoose =  require('mongoose');
const cookieParser =  require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Load User Model
require('./models/user');

//passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys')

// Map global promise
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI, {
  useMongoClient:true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
  res.send('It Works!');
});

// Ppassport middleware
app.use(passport.initialize());
app.use(passport.session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Use Routes
app.use('/auth', auth);

app.use(cookieParser());
app.use



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});