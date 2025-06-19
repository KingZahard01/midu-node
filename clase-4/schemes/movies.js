import z from 'zod';

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo debe ser un string',
    required_error: 'El titulo es requerido',
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
    ]),
    {
      required_error: 'El genero de la pelicula es requerido',
      invalid_type_error:
        'El genero de la pelicula debe ser un array de generos enumerados',
    },
  ),
  year: z.number().int().positive().min(1900).max(2026),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'El poster deberia tener una URL válida',
  }),
});

export function validateMovie(object) {
  return movieSchema.safeParse(object);
}

export function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object);
}
