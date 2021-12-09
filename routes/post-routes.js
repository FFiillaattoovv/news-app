const express = require('express');
const {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost
} = require("../controllers/post-controllers");
const router = express.Router();

router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.put('/edit/:id', editPost);
router.get('/edit/:id', getEditPost);
router.get('/posts', getPosts);
router.post('/add-post', addPost);
router.get('/add-post', getAddPost);

module.exports = router;