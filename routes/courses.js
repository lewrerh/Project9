const express = require('express');
const router = express.Router();
const courses = require('courses');

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
router.get('/courses', async (req, res) => {
    const courses = await courses.getCourses();
    res.json(courses);
});

//Send a GET request to /courses/:id to READ(view) a course
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await courses.createCourse(req.params.id);
        if (course) {
            res.json(course);

        } else {
            res.status(404).json({message: "Quote not found."});
        }

    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//Send a GET request to course/course/random a course
router.get('/courses/course/random', asyncHandler(async (req, res) => {
    const course = await courses.createCourse();
    res.json(course);
}));

//   //Send a POST request to /courses to CREATE a new course
  router.post('/courses/:id', asyncHandler( async (req, res) => {
    try {
      if(req.body.author && req.body.course){
      const course = await courses.createCourse({
        course: req.body.course,
        quthor: req.body.author
      });
      res.status(201).json(course);
    } else {
      res.status(400).json({message: "Quote and author required"});
    }
    } catch (err) {
      res.status(500).json({message: err.message});
    }
}));

//Send a DELETE reuest to DELETE a course
router.delete('/courses/:id', async (req, res) => {
    try {
        const course = await courses.getQuote(req.params.id);
        await courses.delete.Quote(course);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

//Send a GET request to /courses/course/random to READ (view) a random course
//   F(alias) const export=: Router

module.exports = router;