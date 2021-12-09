const path = require('path');

const createPath = (page) => {
    return path.resolve(__dirname, '../views', `${page}.ejs`);
};

module.exports = createPath;