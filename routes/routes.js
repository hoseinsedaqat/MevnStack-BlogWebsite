const express = require('express');

const API = require('../controllers/api');

const router = express.Router();

const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') // Appending to (.jpg)
    },
});

let upload = multer({
    storage: storage,
}).single('image');

router.get('/', API.fetchAllPost);

router.get('/:id', API.fetchPostByID);

router.post('/', upload, API.createPost);

router.put('/:id', upload, API.updatePost);

router.delete('/:id', API.deletePost);

module.exports = router;
