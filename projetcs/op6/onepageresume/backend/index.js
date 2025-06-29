// Load .env variables like OPENAI_API_KEY
require('dotenv').config();

// Dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create app
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const generateResume = require('./routes/generateResume');
app.use('/api/generate', generateResume);
const exportPDF = require('./routes/exportPDF');
app.use('/api/export-pdf', exportPDF);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Resume Generator API is live');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});



