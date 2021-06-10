require('dotenv').config();

const express = require('express');

const cors = require('cors');

const path = require('path');

const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.static('uploads'));

// this directory for images upload for my pc you should chnage it in own pc 👽
app.use('/uploads', express.static(path.join('E:/fullstack/mevnfullstack/uploads')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/post', require('../routes/routes'));

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => console.log('connect to database!')).catch(err => console.log(err));

app.listen(port, () => console.log(`App run in http://localhost:${port}`));