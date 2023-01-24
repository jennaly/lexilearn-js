const getDefinitions = async (word) => {
    const data = await fetch(`https://owlbot.info/api/v4/dictionary/${word}`, {
        headers: {
            'Authorization': `Token ${process.env.OWL_API_KEY}`,
        }
    }).then(r => r.json());

    return data;
};

const getWordDifficulty = async (word) => {
    const data = await fetch(`https://twinword-language-scoring.p.rapidapi.com/word/?entry=${word}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.TWINWORD_API_KEY}`,
		    'X-RapidAPI-Host':  `${process.env.TWINWORD_API_HOST}`
        }
    }).then(r => r.json());

    return data;
}

const getWordData = async (req, res) => {
    const wordData = await getDefinitions(req.params.word);
    const wordDifficulty = await getWordDifficulty(req.params.word);

    const responseData = {
        ...wordData,
        difficulty: wordDifficulty.ten_degree,
    }
    
    res.json(responseData);

}


module.exports = { getWordData }