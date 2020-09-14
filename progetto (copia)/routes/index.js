var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var A2 = require("../controllers/A2Controller.js")
var A4 = require("../controllers/A4Controller.js")


// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

// route for course 
router.get('/course', auth.course)

//route for home A2
router.get('/A2home', A2.home)

//route for home-list A2
router.get('/A2home-list', A2.homelist)

//route for profile A2
router.get('/A2profile', A2.profile)


// route for edit home A4
router.get('/A4home', A4.home)

// route for profile A4
router.get('/A4profile', A4.profile)

// route for modify profile action
router.post('/A4profile', A4.doProfile)

// route for user management A4
router.get('/A4userManagement', A4.userManagement)

// route for modify user action
router.get('/A4doUserManagement', A4.doUserManagement)

// route for delete user action
router.get('/A4doDeleteUser', A4.doDeleteUser)

// route for management course A4
router.get('/A4course', A4.course)

// route for single course A4
router.get('/A4singleCourse', A4.singleCourse)

// route for adding course
router.get('/courseAdd', A4.courseAdd)

// route for adding course action
router.post('/courseAdd', A4.doCourseAdd)

// route for setting course action
router.get('/A4courseSettings', A4.courseSettings)

// route for modify course action
router.post('/A4courseSettings', A4.doCourseSettings)

// route for remove course action
router.get('/A4courseRemove', A4.courseRemove)

// route for school settings A4
router.get('/A4schoolSettings', A4.schoolSettings)

// route for POST school settings A4
router.post('/A4schoolSettings', A4.doSchoolSettings)

module.exports = router;
