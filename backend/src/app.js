import express from 'express';
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
//import colors from 'colors';
import connectDB from './config/db.js';

// Connect to database
connectDB();

const app = express();
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.status(200).send('Hello from the API!');
});
app.use(errorHandler);

export default app;
