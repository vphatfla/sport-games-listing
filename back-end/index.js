// index.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const authMiddleware = require('./middlewares/authMiddleware')

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// protected route
app.use('/api/games', authMiddleware, gameRoutes)

//test route
app.use('/api', gameRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

