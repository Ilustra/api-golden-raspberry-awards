const express = require('express');
const Movie = require('../../models/movie');
const { findAll, findWinner } = require('../../service/movieService');




module.exports = () => {
    const router = express.Router();


    router.get('/intervals', async (req, res) => {
        const winner = await findWinner();
        return res.status(200).json(winner);
    });
    
    router.get('/', async (req, res) => {
        return res.status(200).json( await findAll());
    });
    
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            return res.status(200).json(movie);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });

    router.post('/', async (req, res) => {
        try {
            if(req.body == null){
                return res.status(400).json({ message: 'Request body cannot be empty' });
            }
            const movie = await Movie.create(req.body);
            return res.status(201).json(movie);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });

    router.put('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            const updatedMovie = await movie.update(req.body);
            return res.status(200).json(updatedMovie);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const movie = await Movie.findByPk(id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            await movie.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });

    return router;
}


