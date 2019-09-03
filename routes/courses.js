const express = require('express');
const router = express.Router();
const authenticateUser = require("../authenticationUser");
const {Course} = require("../models");
const auth = require('basic-auth');
//const { check, validationResult } = require('express-validator/check');

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}
// router.get('/courses',async ( req, res ) => {
//     const allCourses = await Course.findAll(options);
//     res.status(200).json(allCourses);
// });

// const courses = await Course.findAll();
//     res.status = 200;
//     res.json(courses);
//Add all routes here except listening
//Send a GET request to read a list of requests
router.get('/', async (req, res) => {
    Course.findAll().then(courses => {
        if (courses) {
            res.status(200).json(courses);
        } else {
            res.status(404).json({message: "Sorry, try again."});
        }
        }).catch(error => res.join({message: err.message}));
});

//Set POST route creating a course, sets the location header to "/", returns no content
router.post('/', authenticateUser, async ( req, res, next ) => {
    const { title, description, estimatedTime, materialsNeeded } = req.body;
    const userId = req.currentUser.id
    
    try{


        await Course.create({
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        });


        res.location(`${req.originalUrl}/${req.currentUser.id}`);
        res.status(201);
        res.end();
} catch (err) {
    err.message = err.errors.map(val => val.message);
    err.status = 400;

    next(err);

    }
 });

  //Set a PUT request to /courses/:id to UPDATE a course
  router.put('/courses:id', asyncHandler( async (req, res) => {
      if(req.body.author && req.body.course){
      const course = await courses.createCourse({
        course: req.body.course,
        quthor: req.body.author
      });
      res.status(204).json(course);
    } else {
      res.status(400).json({message: "Courses required"});
    }
}));

//Send a DELETE reuest to DELETE a course
router.delete('/:id', async (req, res) => {
    try {
        const course = await courses.getQuote(req.params.id);
        await courses.delete.Quote(course);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

// const user = await User.findAll({
//   where: {
//     id: currentUserId
//   },
//   attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
//   include: [
//     {
//       model: Course,
//       as: 'student',
//     },
//   ]
// },
// res.status(200).json(user)});

//Send a GET request to /courses/course/random to READ (view) a random course
//   F(alias) const export=: Router

module.exports = router;