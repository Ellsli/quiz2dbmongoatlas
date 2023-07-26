const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// MongoDB Atlas URI
const dbURI = 'mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/Exams23002';

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Create a schema for the "examrecords" collection
const examRecordSchema = new mongoose.Schema({
  name: String, // Corrected to use String data type
  sid: String // Corrected to use String data type
});

const ExamRecord = mongoose.model('ExamRecord', examRecordSchema);

// Root route to add a new document to the "examrecords" collection
app.get('/', async (req, res) => {
  try {
  
    const newExamRecord = new ExamRecord({
      name: 'Ellie Salahi',
      sid: '300367481' 
    });


    await newExamRecord.save();

    // Respond with a success message
    res.send('added to the examrecords');
  } catch (err) {
    console.error('Error creating exam record:', err);
    res.status(500).send('An error occurred while creating the exam record.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);});
