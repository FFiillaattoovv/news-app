const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const createPath = (page) => {
    return path.resolve(__dirname, 'views', `${page}.html`);
};

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(createPath('index'));
});

app.get('/contacts', (req, res) => {
    res.sendFile(createPath('contacts'));
});

app.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath('error'));
});