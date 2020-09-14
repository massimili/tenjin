var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var db = mongoose.connection

var userController = {};

var tabellaCorsi = []

var tabellaScuole = []

// Restrict access to root page
userController.home = function (req, res) {
  db.collection('school').find().toArray(function (err, result) {
    if (err) {
      throw err;
    }
    tabellaScuole = result.slice(0)
  })
  db.collection('courses').find().toArray(function (err, result) {
    if (err) {
      throw err;
    }
    tabellaCorsi = result.slice(0)
    tabellaCorsi.sort((a, b) => (a.start < b.start) ? 1 : ((b.start < a.start) ? -1 : 0))
    res.render('index', { scuola: tabellaScuole[0], corsi: tabellaCorsi });
  })
};

// Go to registration page
userController.register = function (req, res) {
  res.render('A1/signup');
};

// Post registration
userController.doRegister = function (req, res) {
  User.register(new User({ username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, website: req.body.website, publicinfo: req.body.publicinfo, role: req.body.role, active: '1' }), req.body.password, function (err, user) {
    if (err) {
      return res.render('A1/signup', { user: user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function (req, res) {
  res.render('A1/signin');
};

// Post login
userController.doLogin = function (req, res) {
  passport.authenticate('local')(req, res, function () {
    nomeUtente = req.user.username
    primoNome = req.user.firstname
    cognome = req.user.lastname
    email = req.user.email
    sitoInternet = req.user.website
    info = req.user.publicinfo
    var ruolo = req.user.role
    var attivo = req.user.active
    if (attivo != '1') res.redirect('/logout');
    db.collection('school').find().toArray(function (err, result) {
      if (err) {
        throw err;
      }
      tabellaScuole = result.slice(0)
    })
    var destinazione = 'index'
    if (ruolo == 'admin') {
      destinazione = 'A4/home'
      nome = req.user.firstname + ' ' + req.user.lastname + ' (admin)'
    }
    if (ruolo == 'student') {
      destinazione = 'A2/home'
      nome = req.user.firstname + ' ' + req.user.lastname
    }
    res.render(destinazione, { scuola: tabellaScuole[0], nome: nome, corsi: tabellaCorsi })
  });
};

// Go to course page
userController.course = function (req, res) {
  res.render('A1/course', { corso: tabellaCorsi[req.query.indice] })
};

// logout
userController.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
