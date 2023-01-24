const express = require('express');
require('isomorphic-fetch');

const {
    getWordData
} = require('../controllers/dictionaryController');

const router = express.Router();

router.get('/:word', getWordData);

module.exports = router