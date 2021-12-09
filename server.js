const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require("./helpers/create-path");

const errorMsg = chalk.bgKeyword('black').redBright;
const successMsg = chalk.bgKeyword('green').black;

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://Petrov:007Database@cluster0.bydz4.mongodb.net/news-app?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then(() => console.log(successMsg('Connected to DB')))
    .catch(err => console.log(errorMsg(err)));

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`Listening port ${PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';

    res.render(createPath('index'), {title});
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
    const title = 'Error page';

    res
        .status(404)
        .render(createPath('error'), {title});
});