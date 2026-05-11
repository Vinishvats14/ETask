import express from 'express';
import identityRoutes from './routes/identityRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import handleErrors from './middleware/errorHandler.js';
import initiativeRoutes from './routes/initiativeRoutes.js';
import dotenv from 'dotenv';
import establishDatabaseConnection from './config/db.js';

dotenv.config();
establishDatabaseConnection();
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


app.get('/', (req, res) => res.send("Server is running!"));

app.use('/api/identity', identityRoutes);

app.use('/api/assignments', assignmentRoutes);

app.use('/api/initiatives', initiativeRoutes);

app.use('/api/initiatives/:initiativeId/assignments', assignmentRoutes);

app.use(handleErrors);

const PORT = process.env.PORT || 5049;
// const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// server.on('error', (error) => {
//   if (error.code === 'EADDRINUSE' && PORT !== 5049) {
//     const fallbackPort = 5049;
//     console.warn(`Port ${PORT} in use, switching to ${fallbackPort}`);
//     app.listen(fallbackPort, () => console.log(`Server running on port ${fallbackPort}`));
//   } else {
//     console.error(error);
//     process.exit(1);
//   }
// });

export default app;
