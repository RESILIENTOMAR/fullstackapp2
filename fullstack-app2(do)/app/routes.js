module.exports = function (app, passport, db) {
  var express = require('express');
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('Fan').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        Fan: result
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================

  app.post('/Fan', (req, res) => {
    db.collection('Fan').save({ name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown: 0 }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/profile')
    })
  })


  app.delete('/Fan', (req, res) => {
    db.collection('Fan').findOneAndDelete({ name: req.body.name, msg: req.body.msg }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash Fan
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash Fan
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

  app.get('/team/:team', isLoggedIn, function (req, res) {
    db.collection('fan').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('team.ejs', {
        user: req.user,
        fan: result,
        team: team[req.params.team],
        teamName: req.params.team
      })
    })
  });
  // app.use(express.static(__dirname + '/public//img'))
  app.get('/api/:name', (request, response) => {
    const teamName = request.params.name.toLowerCase()

    if (team[teamName]) {
      response.json(team[teamName])
    } else {
      response.json(team['unknown'])
    }

  })
  app.get('/team', function (req, res) {
    res.render('team', { team: team });
  });

  app.use(express.static(__dirname + '/public//img'))
};


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

//====================TEAMS==================//
const team = {
  'Arsenal': {
    'name': 'Mikel Arteta',
    'stars': ['Pierre-Emerick Aubameyang', 'Bukayo Saka', 'Gabriel Martinelli'],
    'trophies': 13,
    'logo': '/img/arsenal.jpeg'
  },
  'Aston Villa': {
    'name': 'Dean Smith',
    'stars': ['Jack Grealish', 'Emiliano Buendia', 'Tyrone Mings'],
    'trophies': 0,
    'logo': '/img/astonvilla.jpeg'
  },
  'Brentford': {
    'name': 'Thomas Frank',
    'stars': ['Ivan Toney', 'Rico Henry', 'Vitaly Janelt'],
    'trophies': 0,
    'logo': '/img/brentford.jpeg'
  },
  'Brighton': {
    'name': 'Graham Potter',
    'stars': ['Neal Maupay', 'Leandro Trossard', 'Robert Sanchez'],
    'trophies': 0,
    'logo': '/img/brighton.jpeg'
  },
  'Burnley': {
    'name': 'Sean Dyche',
    'stars': ['Nick Pope', 'Dwight McNeil', 'Chris Wood'],
    'trophies': 0,
    'logo': '/img/burnley.jpeg'
  },
  'Chelsea': {
    'name': 'Thomas Tuchel',
    'stars': ['NGolo Kante', 'Mason Mount', 'Romelu Lukaku'],
    'trophies': 6,
    'logo': '/img/chelsea.jpeg'
  },
  'Crystal Palace': {
    'name': 'Patrick Vieira',
    'stars': ['Wilfried Zaha', 'Eberechi Eze', 'Vicente Guaita'],
    'trophies': 0,
    'logo': '/img/crystalpalace.jpeg'
  },
  'Everton': {
    'name': 'Rafael Benitez',
    'stars': ['Richarlison', 'Dominic Calvert-Lewin', 'Abdoulaye Doucoure'],
    'trophies': 9,
    'logo': '/img/everton.jpeg'
  },
  'Leeds United': {
    'name': 'Marcelo Bielsa',
    'stars': ['Kalvin Phillips', 'Raphinha', 'Patrick Bamford'],
    'trophies': 3,
    'logo': '/img/leeds.jpeg'
  },
  'Leicester City': {
    'name': 'Brendan Rodgers',
    'stars': ['Jamie Vardy', 'James Maddison', 'Wilfred Ndidi'],
    'trophies': 1,
    'logo': '/img/leicester.jpeg'
  },
  'Liverpool': {
    'name': 'Jurgen Klopp',
    'stars': ['Mohamed Salah', 'Sadio Mane', 'Virgil van Dijk'],
    'trophies': 19,
    'logo': '/img/liverpool.jpeg'
  },
  'Manchester City': {
    'name': 'Pep Guardiola',
    'stars': ['Kevin De Bruyne', 'Raheem Sterling', 'Phil Foden'],
    'trophies': 7,
    'logo': '/img/manchestercity.jpeg'
  },
  'Manchester United': {
    'name': 'Ralph Hasenhüttl',
    'stars': ['Bruno Fernandes', 'Cristiano Ronaldo', 'Jadon Sancho'],
    'trophies': 20,
    'logo': '/img/manchesterunited.jpeg'
  },
  'Newcastle': {
    'name': 'Eddie Howe',
    'stars': ['Allan Saint-Maximin', 'Callum Wilson', 'Miguel Almiron'],
    'trophies': 0,
    'logo': '/img/newcastle.jpeg'
  },
  'Norwich': {
    'name': 'Dean Smith',
    'stars': ['Teemu Pukki', 'Emiliano Buendia', 'Max Aarons'],
    'trophies': 0,
    'logo': '/img/norwichcity.jpeg'
  },
  'Southampton': {
    'name': 'Ralph Hasenhüttl',
    'stars': ['James Ward-Prowse', 'Che Adams', 'Adam Armstrong'],
    'trophies': 0,
    'logo': '/img/southhampton.jpeg'
  },
  'Tottenham': {
    'name': 'Antonio Conte',
    'stars': ['Harry Kane', 'Son Heung-min', 'Tanguy Ndombele'],
    'trophies': 2,
    'logo': '/img/tottenham.jpeg'
  },
  'Watford': {
    'name': 'Xisco Munoz',
    'stars': ['Ismaila Sarr', 'Emmanuel Dennis', 'Juraj Kucka'],
    'trophies': 0,
    'logo': '/img/watford.jpeg'
  },
  'WestHam': {
    'name': 'David Moyes',
    'stars': ['Michail Antonio', 'Declan Rice', 'Jarrod Bowen'],
    'trophies': 0,
    'logo': '/img/westham.jpeg'
  },
  'Wolves': {
    'name': 'Bruno Lage',
    'stars': ['Adama Traore', 'Pedro Neto', 'Raul Jimenez'],
    'trophies': 0,
    'logo': '/img/wolves.jpeg'
  }

};