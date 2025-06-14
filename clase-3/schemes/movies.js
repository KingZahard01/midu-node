const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "El titulo debe ser un string",
    required_error: "El titulo es requerido",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      required_error: "El genero de la pelicula es requerido",
      invalid_type_error:
        "El genero de la pelicula debe ser un array de generos enumerados",
    },
  ),
  year: z.number().int().positive().min(1900).max(2026),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: number().min(0).max(10),
  poster: z.string().url({
    message: "El poster deberia tener una URL válida",
  }),
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

module.exports = { validateMovie };
