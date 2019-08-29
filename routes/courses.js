const express = require('express');
const router = express.Router();

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

//Add all routes here except listening
//Send a GET request to read a list of requests
router.get('/', async (req, res) => {
    const courses = await Course.findAll();
    res.json(course);
});

//   //Send returns /courses to CREATE a new course
  router.get('/:id', asyncHandler( async (req, res) => {
      if(req.body.author && req.body.course){
      const course = await courses.createCourse({
        course: req.body.course,
        quthor: req.body.author
      });
      res.status(200).json(course);
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

//Send a GET request to course/course/random a course
router.get('/course/random', asyncHandler(async (req, res) => {
    const course = await courses.createCourse();
    res.json(course);
}));

//Send a GET request to /courses/course/random to READ (view) a random course
//   F(alias) const export=: Router

module.exports = router;