const Joi = require("joi");

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),

    rating: Joi.number(),

    genre: Joi.string().alphanum().min(3).max(30).required(),
  });

  return schema.validate(movie);
}

module.exports = validateMovie;
