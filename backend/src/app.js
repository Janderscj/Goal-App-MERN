import express from 'express';
import goalRoutes from './routes/goalRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/goals', goalRoutes);
app.use(errorHandler);
app.get('/', (req, res) => {
  res.status(200).send('Hello from the API!');
});


export default app;
