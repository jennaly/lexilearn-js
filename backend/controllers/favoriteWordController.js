const favoriteWord = require('../models/favoriteWordModel');

// get all favorite words
const getFavoriteWords = async (req, res) => {
    try {
        const favoriteWords = await favoriteWord.find({ user: req.user._id });

        res.status(200).json(favoriteWords);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// add a favorite word to db
const createFavoriteWord = async (req, res) => {
    const { term, definitions, difficulty } = req.body;
    try {
        const word = await favoriteWord.create({ term, definitions, difficulty, user: req.user._id, });
        res.status(200).json(word);
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete (unfavorite) a word 
const deleteFavoriteWord = async (req, res) => {

    const { id } = req.params;

    try {
        const word = await favoriteWord.findById(id);
        if (!word) {
            res.status(404);
            throw Error("Word not found");
        }
        const deletedWord = await favoriteWord.findByIdAndDelete(id);
        res.status(200).json(deletedWord);
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getFavoriteWords,
    createFavoriteWord,
    deleteFavoriteWord
}