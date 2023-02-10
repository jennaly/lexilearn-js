const express = require('express');

const {
    getFavoriteWords,
    createFavoriteWord,
    deleteFavoriteWord
} = require('../controllers/favoriteWordController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// GET all favorite words
router.get('/', getFavoriteWords);

// POST a new favorite word 
router.post('/', createFavoriteWord);

// DELETE a favorite word
router.delete('/:id', deleteFavoriteWord);

module.exports = router