const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://buddy:buddy123@mernapp.uhi0i9o.mongodb.net/', )
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const voltageSchema = new mongoose.Schema({
  voltage: Number,
  
},{timestamps: true});

// Model for voltage data
const Voltage = mongoose.model('Voltage', voltageSchema);

// Route to receive voltage data from Arduino
app.post('/api/data', async (req, res) => {
  try {
    const  {voltage}  = req.body;
    await Voltage.create({ voltage }); // Store voltage data in MongoDB
    res.status(201).send('Voltage data stored successfully.'+{voltage});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error storing voltage data.');
  }
});
// Get all the recorded voltage data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Voltage.find().sort({ timestamp: 1 }).lean();
    res.json(data);
  } catch (error) {
    console.error('Error fetching voltage data:', error);
    res.status(500).send('Error fetching voltage data');
  }
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});