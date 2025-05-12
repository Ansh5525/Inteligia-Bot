const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

//const path = require('path');

//app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));


const chatRoute = require('./routes/chat');
app.use('/api', chatRoute);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(HTTP_PORT, () => {
    console.log(`server listening on: ${HTTP_PORT}`);
});