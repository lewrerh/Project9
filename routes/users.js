const express = require('express');
const router = express.Router();
const users = require('users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
router.get('/users', async (req, res) => {
    const users = await users.getUsers();
    res.json(users);
});

//Send a GET request to /users/:id to READ(view) a user
router.get('/users/:id', async (req, res) => {
    try {
        const user = await users.createUser(req.params.id);
        if (user) {
            res.json(user);

        } else {
            res.status(404).json({message: "Quote not found."});
        }

    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

//   //Send a POST request to /users to CREATE a new user
  router.post('/users/:id', asyncHandler( async (req, res) => {
    try {
      if(req.body.author && req.body.user){
      const user = await users.createUser({
        user: req.body.user,
        author: req.body.author
      });
      res.status(201).json(user);
    } else {
      res.status(400).json({message: "Quote and author required"});
    }
    } catch (err) {
      res.status(500).json({message: err.message});
    }
}));
//Send a PUT request to UPDATE (edit) a user
router.get('/users/:id', asyncHandler(async (req, res) => {
    try {
        const user = await users.createUser(req.params.id);
        if (user) {
            user.req.body.user;
            author.req.body.author;

            await users.updateUser(user);
            res.status(204).end();
        } else {
            res.status(404).json({
                message: "Quote not found"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}));

//Send a DELETE reuest to DELETE a user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await users.getQuote(req.params.id);
        await users.delete.Quote(user);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

//Send a GET request to /users/user/random to READ (view) a random user
//   F(alias) const export=: Router

module.exports = router;
