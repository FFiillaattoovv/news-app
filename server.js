const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://Petrov:007Database@cluster0.bydz4.mongodb.net/news-app?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const createPath = (page) => {
    return path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
};

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const title = 'Home';

    res.render(createPath('index'), {title});
});

app.get('/contacts', (req, res) => {
    const title = 'Contacts';

    const contacts = [
        {name: 'Telegram', link: 'https://t.me/FFiillaattoovv'},
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/FFiillaattoovv'},
        {name: 'GitHub', link: 'https://github.com/FFiillaattoovv'},
    ];

    res.render(createPath('contacts'), {contacts, title});
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';

    const post = {
        id: '1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
        title: 'Post title',
        date: '12.08.2021',
        author: 'Maksim',
    };

    res.render(createPath('post'), {title, post});
});

app.get('/posts', (req, res) => {
    const title = 'Posts';

    const posts = [
        {
            id: '1',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
            title: 'Post title',
            date: '12.08.2021',
            author: 'Maksim',
        },
    ];

    res.render(createPath('posts'), {title, posts});
});

app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body;

    const post = new Post({title, author, text});

    post
        .save()
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'});
        });
});

app.get('/add-post', (req, res) => {
    const title = 'Add post';

    res.render(createPath('add-post'), {title});
});

app.use((req, res) => {
    const title = 'Error page';

    res
        .status(404)
        .render(createPath('error'), {title});
});