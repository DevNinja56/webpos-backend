const express = require('express');
const mongoose = require('mongoose');

const app = express();
const auth = require('./src/routers/auth');
const exceptionHandler = require('./src/middlewares/exceptionHandler');

app.use(express.json());
app.use('/auth', auth);
app.use(exceptionHandler);
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log(`Server Started at 3000`)
})