require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const animalRoute = require('./routes/animalRoute');  
const errorMiddlewar = require('./middleware/errorMiddleware');
var cors = require('cors')

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;
//Configuring CORS this is when we want to allow only a IP adres or domane name/in this case allow only the "http://example.com" domane to acess the backend
var corsOptions = {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Use express middleware to parse JSON
app.use('/api/animals', animalRoute);
app.use(errorMiddlewar);



// Connect to MongoDB and start the server
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB.");

        app.listen(PORT, () => {
            console.log(`NODE APP is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });
