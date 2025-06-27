const csv = require ('csv-parser');
const fs = require('fs');
const path = require('path');

const readMoviesFromCSV = (urlFile) => {
    return new Promise((resolve, reject) => {
        const movies = [];
        const csvPath = path.join(__dirname, urlFile);
        
        fs.createReadStream(csvPath)
            .pipe(csv({ separator: ';' }))
            .on('data', (data) => {
                movies.push({
                    year: parseInt(data.year),
                    title: data.title,
                    studios: data.studios,
                    producers: data.producers,
                    winner: data.winner === 'yes'
                });
            })
            .on('end', () => {
                resolve(movies);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};
module.exports = { readMoviesFromCSV };