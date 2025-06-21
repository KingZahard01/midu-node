// /models/movie.js
import { readJSON } from '../utils.js';
import { randomUUID } from 'node:crypto';

const movies = readJSON('./movies.json');

export class MovieModel {
  // GET ALL
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()),
      );
    }
    return movies;
  }

  // GET by ID
  static async getById({ id }) {
    const movie = movies.find(movie => movie.id === id);
    if (movie) return movie;
    throw new Error('Movie not found');
  }

  // POST CREATE
  static async create({ input }) {
    const result = validateMovie(input);
    if (!result.success) {
      return false;
    }
    // en base de datos
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input,
    };

    // Esto no sería REST
    movies.push(newMovie);

    return newMovie;
  }

  // DELETE
  static async delete({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  // PATCH UPDATE
  static async update({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return false;

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };
    const updatedMovie = movies[movieIndex];

    return updatedMovie;
  }
}
