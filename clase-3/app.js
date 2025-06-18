const express = require('express');
const cors = require('cors');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemes/movies.js');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'https://example.com',
        'https://myapp.com',
      ];
    },
  }),
);
app.disable('x-powered-by'); // deshabilita el header x-powered-by: express

// GET
// Todos los recursos que sean MOVIES se indentifica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()),
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Movie not found' });
});

// POST
app.post('/movies', (req, res) => {
  // Validar el cuerpo de la peticion
  const result = validateMovie(req.body);

  // Si la validacion falla, devolver un error
  if (result.error) {
    // Podria usarse 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // en base datos, el id es generado por el servidor
  const newMovie = {
    id: crypto.randomUUID(), // crea un uuio v4
    ...result.data, // no es igual que req.body, porque puede que no tenga todos los campos
  };

  // Esto no sería REST porque estamos guardando el estado de la aplicacion en memoria.
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

// PATCH
app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data, // Actualiza los campos que se envían en el cuerpo de la petición
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

// DELETE
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1); // Elimina la película del array
  return res.json({ message: 'Movie deleted successfully xd' });
});

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin); // Permite el acceso desde el origen especificado
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS',
    ); // Permite los métodos especificados
  }

  res.send(200);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
