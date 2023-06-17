const express = require("express");
const movieDB = require("./moviesApiDummyDB");
const app = express(); //web application

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
  const newMovie = {
    id: movieDB.length + 1,
    title: req.body.title,
    rating: req.body.rating,
    genre: req.body.genre,
  };

  movieDB.push(newMovie);
  res.send(newMovie);
});

//listening Port

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`connection established at port ${port}`));
