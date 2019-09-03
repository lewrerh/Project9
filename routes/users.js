const express = require('express');
const router = express.Router(); // Construct a router instance.
var sqlite3 = require('sqlite3');

const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const authenticateUser = require('../authenticationUser');
const { check } = require('express-validator');
const { validationResult } = require('express-validator');


//call to the Node.js require() method in order to import the check() 
//and validationResult() methods from the expressvalidator module
//const { check, validationResult } = require('express-validator');

  //Send GET for users to read a list of requests
    //router.get('/', User, (req, res, next)  => {
    //   res.send('respond with a resource');
    //});
// function asyncHandler(cb) {
//     return async (req, res, next) => {
//         try {
//             await cb(req, res, next);
//         } catch (err) {
//             next(err);
//         }
//     }
// }

// Route that returns the current authenticated user.
 router.get('/', authenticateUser, (req, res) => {
     const user = req.currentUser;
console.log(user);
    res.json({
        name: user.dataValues.firstName + " " + user.dataValues.lastName,
         username: user.dataValues.emailAddress,
     });
 });

// // Route that creates a new user.
router.post('/', [
    check('firstName')
    .exists({
        checkNull: true,
        checkFalsy: true
    })
    .withMessage('Please provide a value for "first name"'),
    check('lastName')
    .exists({
        checkNull: true,
        checkFalsy: true
    })
    .withMessage('Please provide a value for "lastName"'),
    check('emailAddress')
    .exists({
        checkNull: true,
        checkFalsy: true
    })
    .withMessage('Please provide a value for "email address"'),
    check('password1')
    .exists({
        checkNull: true,
        checkFalsy: true
    })
    .withMessage('Please provide a value for "password1"'),
], async(req, res) => {
    // Attempt to get the validation result from the Request object.
    const errors = validationResult(req);

    // If there are validation errors...
    if (!errors.isEmpty()) {
        // Use the Array `map()` method to get a list of error messages.
        const errorMessages = errors.array().map(error => error.msg);

        // Return the validation errors to the client.
        return res.status(400).json({
            errors: errorMessages
        });
    }

    // Set the firstName, lastName.
    const firstName = req.body.firstName;
    const lasttName = req.body.lastName;
    const emailAddress = req.body.emailAddress;
    const password = bcryptjs.hashSync(req.body.password);

    // Add the user to the database.
    await User.create({
      firstName,
      lastName,
      emailAddress,
      password

    });

    // Set the status to 201 Created and end the response.
    return res.location('/').status(201).end();
});

module.exports = router;

// const {
//     check,
//     validationResult
// } = require('express-validator/check');


// var Users = require("./models").User;

