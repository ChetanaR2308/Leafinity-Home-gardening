const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route imports
app.use('/api/plants', require('./routes/plants'));
app.use('/api/calender', require('./routes/calender'));
app.use('/api/consultations', require('./routes/consultations'));
app.use('/api/database', require('./routes/database'));
app.use('/api/exchange', require('./routes/exchange'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/auth', require('./routes/auth')); // ✅ New Auth Route

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
