import express from 'express';
import path from 'path';
import goalRoutes from './routes/goalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
//import colors from 'colors';
import connectDB from './config/db.js';

// Connect to database
connectDB();

// Initialize Express app
const app = express();
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.status(200).send('Hello from the API!');
});

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    // eslint-disable-next-line comma-dangle
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('*', (req, res) => {
    res.status(404).send('Please set to production');
  });
}
app.use(errorHandler);

export default app;
