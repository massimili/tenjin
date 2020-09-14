var mongoose = require("mongoose");


var db = mongoose.connection


var A4Controller = {};

var tabellaCorsi = []

var tabellaUtenti = []

var id = '0'

var tabellaScuole = []

// Go to home 
A4Controller.home = function (req, res) {
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
    res.render('A4/home', { scuola: tabellaScuole[0], nome: nome, corsi: tabellaCorsi });
  })
};

// Go to profile
A4Controller.profile = function (req, res) {
  res.render('A4/profile', { nome: nome, nomeUtente: nomeUtente, primoNome: primoNome, cognome: cognome, email: email, sitoInternet: sitoInternet, info: info });
};

// Post modify user 
A4Controller.doProfile = function (req, res) {

  var myquery = { username: req.body.username };
  var newvalues = { $set: { firstname: req.body.name, lastname: req.body.lastname, email: req.body.email, publicinfo: req.body.publicinfo, website: req.body.website } };
  db.collection("users").updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.redirect('/A4home');
  });
}

// Go to user management
A4Controller.userManagement = function (req, res) {
  db.collection('users').find().toArray(function (err, result) {
    if (err) {
      throw err;
    }
    tabellaUtenti = result
    res.render('A4/user-management', { nome: nome, utenti: result });
  })
};

// User active toggle
A4Controller.doUserManagement = function (req, res) {
  if (req.query.attivo == '0') attivo = '1';
  else attivo = '0';
  var myquery = { username: tabellaUtenti[req.query.indice].username };
  var newvalues = { $set: { active: attivo } };
  db.collection("users").updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.redirect('/A4userManagement');
  });

}
// Delete User
A4Controller.doDeleteUser = function (req, res) {
  var myquery = { username: tabellaUtenti[req.query.indice].username };
  db.collection("users").deleteOne(myquery, function (err) {
    if (err) throw err;
    console.log("1 document deleted");
    res.redirect('/A4userManagement');
  });

}

// Go to school settings
A4Controller.schoolSettings = function (req, res) {
  db.collection('school').find().toArray(function (err, tabellaScuole) {
    if (err) {
      throw err;
    }
    res.render('A4/school-settings', { nome: nome, scuola: tabellaScuole[0] });
  })
};

// Post school settings 
A4Controller.doSchoolSettings = function (req, res) {
  var myquery = { name: req.body.name };
  var newvalues = { $set: { image: req.body.image, title: req.body.title, short: req.body.short, title2: req.body.title2, short2: req.body.short2 } };
  db.collection("school").updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.redirect('/A4home');
  });
}

// Go to management course page
A4Controller.course = function (req, res) {
  db.collection('courses').find().toArray(function (err, tabellaCorsi) {
    if (err) {
      throw err;
    }
    tabellaCorsi.sort((a, b) => (a.start < b.start) ? 1 : ((b.start < a.start) ? -1 : 0))
    var anno = (new Date()).getFullYear()
    var appmese = ((new Date()).getMonth() + 1)
    var mese = ("0" + appmese).slice(-2)
    var giorno = (new Date()).getDate()
    var oggi = anno + '-' + mese + '-' + giorno
    for (i = 0; i < tabellaCorsi.length; i++) {
      if (oggi > tabellaCorsi[i].end) tabellaCorsi[i].active = '0';
      else tabellaCorsi[i].active = '1';
    }
    res.render('A4/course-management', { nome: nome, corsi: tabellaCorsi });
  })
}

// Go to single course page
A4Controller.singleCourse = function (req, res) {
  db.collection('courses').find().toArray(function (err, tabellaCorsi) {
    if (err) {
      throw err;
    }
    tabellaCorsi.sort((a, b) => (a.start < b.start) ? 1 : ((b.start < a.start) ? -1 : 0))
    res.render('A4/course', { nome: nome, corso: tabellaCorsi[req.query.indice] })
  })
};


// Go to course add
A4Controller.courseAdd = function (req, res) {
  res.render('A4/course-new', { nome: nome });
};


// Post adding course 
A4Controller.doCourseAdd = function (req, res) {
  var data = {
    "title": req.body.title,
    "image": req.body.image,
    "short": req.body.short,
    "start": req.body.start,
    "end": req.body.end,
    "language": req.body.language,
    "description": req.body.description,
    "teacher": req.body.teacher,
    "active": '1',
    "students": []
  }
  db.collection('courses').insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");


  });

  db.collection('courses').find().toArray(function (err, tabellaCorsi) {
    if (err) {
      throw err;
    }
    tabellaCorsi.sort((a, b) => (a.start < b.start) ? 1 : ((b.start < a.start) ? -1 : 0))
    var anno = (new Date()).getFullYear()
    var appmese = ((new Date()).getMonth() + 1)
    var mese = ("0" + appmese).slice(-2)
    var giorno = (new Date()).getDate()
    var oggi = anno + '-' + mese + '-' + giorno
    for (i = 0; i < tabellaCorsi.length; i++) {
      if (oggi > tabellaCorsi[i].end) tabellaCorsi[i].active = '0';
      else tabellaCorsi[i].active = '1';
    }
    return res.render("A4/course-management", { nome: nome, corsi: tabellaCorsi });
  })
}

// Go to course settings
A4Controller.courseSettings = function (req, res) {
  db.collection('courses').find().toArray(function (err, tabellaCorsi) {
    if (err) {
      throw err;
    }
    tabellaCorsi.sort((a, b) => (a.start < b.start) ? 1 : ((b.start < a.start) ? -1 : 0))
    id = tabellaCorsi[req.query.indice]._id
    res.render('A4/course-settings', { nome: nome, corso: tabellaCorsi[req.query.indice] });
  })
}

// Post modify user 
A4Controller.doCourseSettings = function (req, res) {
  var myquery = { _id: id };
  var newvalues = { $set: { title: req.body.title, image: req.body.image, short: req.body.short, start: req.body.start, end: req.body.end, language: req.body.language, description: req.body.description, teacher: req.body.teacher } };
  db.collection("courses").updateOne(myquery, newvalues, function (err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.redirect('/A4course');
  });
}

// Delete Course
A4Controller.courseRemove = function (req, res) {
  db.collection('courses').find().toArray(function (err, tabellaCorsi) {
    if (err) {
      throw err;
    }
    tabellaCorsi.sort((a, b) => (a.start < b.start) ? 1 : ((b.start < a.start) ? -1 : 0))
    id = tabellaCorsi[req.query.indice]._id
    var myquery = { _id: id }
    db.collection("courses").deleteOne(myquery, function (err) {
      if (err) throw err;
      console.log("1 document deleted");
      res.redirect('/A4course');
    });
  })
}
module.exports = A4Controller;
