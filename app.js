const Joi = require("joi");
const express = require("express");
const movieDB = require("./moviesApiDummyDB");
const validator = require("./validator");
const app = express(); //web application server,

app.use(express.json());

//route
//Handling get request
app.get("/api", (req, res) => {
  res.send("Hello world from server");
  res.end();
});

app.get("/api/movies", (req, res) => {
  res.send(movieDB);
});

app.get("/api/movies/:title", (req, res) => {
  const movie = movieDB.find((title) => title.title === req.params.title);
  if (!movie)
    res.status(404).send("Movie with the given title cannot be found");
  res.send(movie);
  //query
});

//Handling post request

app.post("/api/movies", (req, res) => {
  const { error } = validator(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newMovie = {
    id: movieDB.length + 1,
    title: req.body.title,
    rating: req.body.rating,
    genre: req.body.genre,
  };

  movieDB.push(newMovie);
  res.send(newMovie);
});
//Handling update/put request

app.put("/api/movies/:id", (req, res) => {
  const updateMovie = movieDB.find(
    (token) => token.id === parseInt(req.params.id)
  );

  if (!updateMovie) res.status(400).send("Invalid movie id/id not found");

  const { error } = validator(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  updateMovie.title = req.body.title;
  res.send(updateMovie);
});
//Handling delete request

app.delete("/api/movies/:id", (req, res) => {
  let deleteMovie = movieDB.find(
    (token) => token.id === parseInt(req.params.id)
  );

  if (!deleteMovie) res.status(400).send("Invalid movie id/id not found");

  const index = movieDB.indexOf(deleteMovie);
  movieDB.splice(index, 1);

  res.send(deleteMovie);
});

//listening Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connection established at port ${port}`));
