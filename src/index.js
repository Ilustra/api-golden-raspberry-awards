const express = require('express');
const cors = require('cors');
const {  readMoviesFromCSV } = require('./app/utils/readMoviesFromCSV');
const app = express();
const sequelize = require('./app/config/database');
const Movie = require('./app/models/movie');
app.use(express.json());
readMoviesFromCSV('../../../movielist.csv')
  .then(async (movies)  => {
      try{
        await sequelize.sync({ force: true }); 
        Movie.bulkCreate(movies);
      }catch(error) {
        console.error('Erro ao inserir filme:', error.message);
      }
  });

app.use(cors());

require('./app/controllers/index')(app);
app.use('/movies', require('./app/controllers/movie/movieController')(Movie));


const PORT =  4000;
app.listen(PORT, () => {
  console.log(`-------------------------------------------------------`);
  console.log(`\n Servidor rodando em http://localhost:${PORT}`);
  console.log(`-------------------------------------------------------`);
});