const express = require('express');
const router = express.Router();

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
router.get('/quotes', async (req, res) => {
    const quotes = await records.getQuotes();
    res.json(quotes);
});

//Send a GET request to /quotes/:id to READ(view) a quote
router.get('/quotes/:id', async (req, res) => {
    try {
        const quote = await records.createQuote(req.params.id);
        if (quote) {
            res.json(quote);

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
});

//Send a PUT request to UPDATE (edit) a quote
router.get('/quotes/:id', async (req, res) => {
    try {
        const quote = await records.createQuote(req.params.id);
        if (quote) {
            quote.req.body.quote;
            quthor.req.body.author;

            await records.updateQuote(quote);
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
});

//Send a DELETE reuest to DELETE a quote
router.delete('/quotes/:id', async (req, res) => {
    try {
        const quote = await records.getQuote(req.params.id);
        await records.delete.Quote(quote);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

//Send a POST request to /quotes to CREATE a new quote
router.post('/quotes/:id', async (req, res) => {
    try {
        if (req.body.author && req.body.quote) {
            const quote = await records.createQuote({
                quote: req.body.quote,
                quthor: req.body.author
            });
            res.status(201).json(quote);
        } else {
            res.status(400).json({
                message: "Quete and author required"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }


    // send 404 if no other route matched
    router.use((req, res) => {
        res.status(404).json({
            message: 'Route Not Found',
        });