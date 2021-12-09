const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Contact = require('./models/contact');

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

    Contact
        .find()
        .then((contacts) => res.render(createPath('contacts'), {contacts, title}))
        .catch((err) => {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'});
        });
});

app.get('/posts/:id', (req, res) => {
    const title = 'Post';

    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), {post, title}))
        .catch((err) => {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'});
        });
});

app.get('/posts', (req, res) => {
    const title = 'Posts';

    Post
        .find()
        .sort({createdAt: -1})
        .then((posts) => res.render(createPath('posts'), {posts, title}))
        .catch((err) => {
            console.log(err);
            res.render(createPath('error'), {title: 'Error'});
        });
});

app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body;

    const post = new Post({title, author, text});

    post
        .save()
        .then(() => res.redirect('/posts'))
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