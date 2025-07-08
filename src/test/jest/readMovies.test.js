const path = require("path");
const { readMoviesFromCSV } = require("../../app/utils/readMoviesFromCSV");
const sequelize = require("../../app/config/database");
const request = require("supertest");
const app = require("../../index");
const Movie = require("../../app/models/movie");

let server;

beforeAll(async () => {
  const movies = await readMoviesFromCSV("../../../movielist.csv");
  await sequelize.sync({ force: true });
  await Movie.bulkCreate(movies);

  server = app.listen(0);
});

afterAll((done) => {
  server.close(done);
});

describe("readMoviesFromCSV", () => {
  it("should read movies from CSV file", async () => {
    const filePath = "../../../movielist.csv";
    const movies = await readMoviesFromCSV(filePath);
    expect(Array.isArray(movies)).toBe(true);
  });
  it("should match the data in the CSV file", async () => {
    const expectedMovies = await readMoviesFromCSV("../../../movielist.csv");

    const response = await request(app).get("/movies");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(expectedMovies.length);
    const filterByTemplate = expect.arrayContaining(
      expectedMovies.map((movie) => expect.objectContaining(movie))
    );

    expect(response.body).toEqual(filterByTemplate);
  });

    it("should no match the data in the CSV file Test", async () => {
    const expectedMoviesTest = await readMoviesFromCSV("../../../movielistTest.csv");
    const response = await request(app).get("/movies");

    const filterByTemplate = expect.arrayContaining(
      expectedMoviesTest.map((movie) => expect.objectContaining(movie))
    );

    expect(response.body).not.toEqual(filterByTemplate);
  });
});
