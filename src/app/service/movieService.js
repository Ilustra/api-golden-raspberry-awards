const Movie = require("../models/movie");
const  ProducerAnalyzer  = require("../models/ProducerAnalyzer");



const findWinner = async () => {
    const moviesWinner =  await Movie.findAll({
        where: {
            winner: true
        },
        raw: true,
    });

    const producers = moviesWinner
    .flatMap(movie => (  moviesWithSplitListProducers(movie)) )
    .sort((a, b) => a.year - b.year);

    return new ProducerAnalyzer(producers)
    .groupProducers()
    .calculateIntervals()
    .minMaxWinner();
}

const findAll = async () => {
    return await Movie.findAll();
}

const findById = async (id) => {
    return await Movie.findByPk(id);
}

const create = async (data) => {
    return await Movie.create(data);
}

const update = async (id, data) => {
    const movie = await Movie.findByPk(id);
    if (!movie) {
        throw new Error('Movie not found');
    }
    return await movie.update(data);
}
const remove = async (id) => {
    const movie = await Movie.findByPk(id);
    if (!movie) {
        throw new Error('Movie not found');
    }
    return await movie.destroy();
}

const moviesWithSplitListProducers  =(movie)=>{
    return movie.producers
    .split(/\s*(?:,| and )\s*/i)
    .filter(p => p !== 'and' && p !== ',' && p.trim() !== '')
    .map(producer =>({year: movie.year, name: producer.trim()}))
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findWinner
};