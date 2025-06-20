import express, { json } from 'express'; // require -> commonJS
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.use(json());

app.use(corsMiddleware);

app.disable('x-powered-by'); // deshabilitar el header X-Powered-By: Express

// Los recursos que sean MOVIES se identifica con /movies
app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
