const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => {
    return path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
};

app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

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

    res.render(createPath('post'), {title});
});

app.get('/posts', (req, res) => {
    const title = 'Posts';

    res.render(createPath('posts'), {title});
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