import express from 'express';
import cors from 'cors';
import connectToMongoDb from './db/db.js';
import authRouter from './routes/auth.js';
import notesRouter from './routes/noteRoutes.js';  // <-- Import notes routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ This parses JSON from request bodies

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);  // <-- Use notes routes here

// Start server
app.listen(5000, () => {
  connectToMongoDb();
  console.log("Server is running");
});
