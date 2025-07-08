const express = require("express");
const cors = require("cors");
const { readMoviesFromCSV } = require("./app/utils/readMoviesFromCSV");
const app = express();
const sequelize = require("./app/config/database");
const Movie = require("./app/models/movie");


const aboutRoute = require("./app/controllers/aboutController");

app.use(express.json());
app.use(cors());
app.use("/movies", require("./app/controllers/movie/movieController")(Movie));
app.use("/", aboutRoute);

const PORT = 4000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`-------------------------------------------------------`);
    console.log(`\n Servidor rodando em http://localhost:${PORT} `);
    console.log(`-------------------------------------------------------`);
    readMoviesFromCSV("../../../movielist.csv").then(async (movies) => {
      try {
        await sequelize.sync({ force: true });
        Movie.bulkCreate(movies);
      } catch (error) {
        console.error("Erro ao inserir filme:", error.message);
      }
    });
  });
}

module.exports = app;
