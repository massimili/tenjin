var mongoose = require("mongoose");


var db = mongoose.connection

var A2Controller = {};

// Go to home student page
A2Controller.home = function (req, res) {
  res.render('A2/home', { nome: nome });
};

// Go to home-list student page
A2Controller.homelist = function (req, res) {
  res.render('A2/home-list', { nome: nome });
};

// Go to profile student page
A2Controller.profile = function (req, res) {
  res.render('A2/profile', { nome: nome });
};

module.exports = A2Controller;
