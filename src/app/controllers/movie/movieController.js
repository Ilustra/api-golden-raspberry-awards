const express = require('express');
const Movie = require('../../models/movie');




module.exports = () => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        return res.status(200).json( await Movie.findAll());

    });
    return router;
}


