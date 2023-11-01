const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Jithendra:7s9aVyqJWpmICrzm@cluster0.xt578ta.mongodb.net/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  mobile: Number,
  password: String,
});

const Registration = mongoose.model('Registration', userSchema);

// Route for user registration
app.post('/api/register', async (req, res) => {
  const { name, email, country, mobile, password } = req.body;

  try {
    // Find the user in the MongoDB database
    const user = await Registration.create({ name, email, country, mobile, password });

    if (user) {
      // Success
      res.json({ message: "Registered Successfully" });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Registration failed' });
    }
  } catch (error) {
    // Handle any errors that occur during the database create
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the MongoDB database
    const user = await Registration.findOne({ email: username, password });

    if (user) {
      // Success
      res.json({ message: "Login Successfully" });
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    // Handle any errors that occur during the database create
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});