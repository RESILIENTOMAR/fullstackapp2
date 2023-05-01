// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8005;
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.static(__dirname + '/public/img'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
  secret: 'rcbootcamp2021b', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);



//==============TEAMS=============================================================//

const team = {
  'arsenal': {
    'name': 'Mikel Arteta',
    'stars': ['Pierre-Emerick Aubameyang', 'Bukayo Saka', 'Gabriel Martinelli'],
    'trophies': 13,
    'logo': 'arsenal.jpeg'
  },
  'Aston Villa': {
    'name': 'Dean Smith',
    'stars': ['Jack Grealish', 'Emiliano Buendia', 'Tyrone Mings'],
    'trophies': 0,
    'logo': 'astonvilla.jpeg'
  },
  'Brentford': {
    'name': 'Thomas Frank',
    'stars': ['Ivan Toney', 'Rico Henry', 'Vitaly Janelt'],
    'trophies': 0,
    'logo': 'brentford.jpeg'
  },
  'Brighton & Hove Albion': {
    'name': 'Graham Potter',
    'stars': ['Neal Maupay', 'Leandro Trossard', 'Robert Sanchez'],
    'trophies': 0,
    'logo': 'brighton.jpeg'
  },
  'Burnley': {
    'name': 'Sean Dyche',
    'stars': ['Nick Pope', 'Dwight McNeil', 'Chris Wood'],
    'trophies': 0,
    'logo': 'burnley.jpeg'
  },
  'Chelsea': {
    'name': 'Thomas Tuchel',
    'stars': ['NGolo Kante', 'Mason Mount', 'Romelu Lukaku'],
    'trophies': 6,
    'logo': 'chelsea.jpeg'
  },
  'Crystal Palace': {
    'name': 'Patrick Vieira',
    'stars': ['Wilfried Zaha', 'Eberechi Eze', 'Vicente Guaita'],
    'trophies': 0,
    'logo': 'crystalpalace.jpeg'
  },
  'Everton': {
    'name': 'Rafael Benitez',
    'stars': ['Richarlison', 'Dominic Calvert-Lewin', 'Abdoulaye Doucoure'],
    'trophies': 9,
    'logo': 'everton.jpeg'
  },
  'Leeds United': {
    'name': 'Marcelo Bielsa',
    'stars': ['Kalvin Phillips', 'Raphinha', 'Patrick Bamford'],
    'trophies': 3,
    'logo': 'leeds.jpeg'
  },
  'Leicester City': {
    'name': 'Brendan Rodgers',
    'stars': ['Jamie Vardy', 'James Maddison', 'Wilfred Ndidi'],
    'trophies': 1,
    'logo': 'leicester.jpeg'
  },
  'Liverpool': {
    'name': 'Jurgen Klopp',
    'stars': ['Mohamed Salah', 'Sadio Mane', 'Virgil van Dijk'],
    'trophies': 19,
    'logo': 'liverpool.jpeg'
  },
  'Manchester City': {
    'name': 'Pep Guardiola',
    'stars': ['Kevin De Bruyne', 'Raheem Sterling', 'Phil Foden'],
    'trophies': 7,
    'logo': 'manchestercity.jpeg'
  },
  'Manchester United': {
    'name': 'Ralph Hasenhüttl',
    'stars': ['Bruno Fernandes', 'Cristiano Ronaldo', 'Jadon Sancho'],
    'trophies': 20,
    'logo': 'manchesterunited.jpeg'
  },
  'Newcastle': {
    'name': 'Eddie Howe',
    'stars': ['Allan Saint-Maximin', 'Callum Wilson', 'Miguel Almiron'],
    'trophies': 0,
    'logo': 'newcastle.jpeg'
  },
  'Norwich': {
    'name': 'Dean Smith',
    'stars': ['Teemu Pukki', 'Emiliano Buendia', 'Max Aarons'],
    'trophies': 0,
    'logo': 'norwichcity.jpeg'
  },
  'Norwich': {
    'name': 'Dean Smith',
    'stars': ['Teemu Pukki', 'Emiliano Buendia', 'Max Aarons'],
    'trophies': 0,
    'logo': 'norwichcity.jpeg'
  },
  'Southampton': {
    'name': 'Ralph Hasenhüttl',
    'stars': ['James Ward-Prowse', 'Che Adams', 'Adam Armstrong'],
    'trophies': 0,
    'logo': 'southhampton.jpeg'
  },
  'Tottenham': {
    'name': 'Antonio Conte',
    'stars': ['Harry Kane', 'Son Heung-min', 'Tanguy Ndombele'],
    'trophies': 2,
    'logo': 'tottenham.jpeg'
  },
  'Watford': {
    'name': 'Xisco Munoz',
    'stars': ['Ismaila Sarr', 'Emmanuel Dennis', 'Juraj Kucka'],
    'trophies': 0,
    'logo': 'watford.jpeg'
  },
  'West Ham': {
    'name': 'David Moyes',
    'stars': ['Michail Antonio', 'Declan Rice', 'Jarrod Bowen'],
    'trophies': 0,
    'logo': 'westham.jpeg'
  },
  'Wolves': {
    'name': 'Bruno Lage',
    'stars': ['Adama Traore', 'Pedro Neto', 'Raul Jimenez'],
    'trophies': 0,
    'logo': 'wolves.jpeg'
  }

};

