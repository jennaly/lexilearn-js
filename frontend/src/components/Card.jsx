import React, {useState, useEffect} from 'react';
import { useWordDataContext } from "../hooks/useWordDataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { useFavoriteWordsContext } from "../hooks/useFavoriteWordsContext";
import CardBody from './CardBody';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {  v1 as uuidv1 } from 'uuid';

const Card = ({ showCard }) => {
    const { wordData } = useWordDataContext();
    const { favoriteWords, dispatch } = useFavoriteWordsContext();
    const { user } = useAuthContext();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkIsFavorite = () => {  
            if (!favoriteWords.length) {
                setIsFavorite(false);
            }

            for (const favoriteWord of favoriteWords) {
                if (favoriteWord.term === wordData.word) {
                    setIsFavorite(true);
                    return;
                } 
            }
            setIsFavorite(false);
        }
        
        checkIsFavorite();

    }, [wordData, favoriteWords]);

    const handleFavorite = () => {
        if (isFavorite) {
            removeWordFromFavorites();
            return;
        } else {
            addWordToFavorites();
        }
    }

    const addWordToFavorites = () => {
        const definitions = wordData.definitions.map((e, index) => `${index + 1}. (${e.type}) ${e.definition}`);
        const entry = {
            "term": wordData.word,
            "definitions": [
                ...definitions
            ],
            "difficulty": wordData.difficulty,
        }

        if (user) {
            const addWordToDB = async () => {
                const res = await fetch("https://lexilearn-server.up.railway.app/api/favoriteWords", {
                    method: "POST",
                    body: JSON.stringify(entry),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                
                const data = await res.json();
    
                if (res.ok) {
                    dispatch({ type: 'CREATE_FAVORITE_WORD', payload: data });
                }
            }

            addWordToDB();

        } else {
            entry['_id'] = uuidv1();
            dispatch({ type: 'CREATE_FAVORITE_WORD', payload: entry });
        }
    }

    const removeWordFromFavorites = () => {
        const deletedWord = favoriteWords.find(favoriteWord => favoriteWord.term == wordData.word);

        if (user) {
            
            const removeWordFromDB = async () => {
                const { _id } = deletedWord;

                const res = await fetch(`https://lexilearn-server.up.railway.app/api/favoriteWords/${_id}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const data = await res.json();
                
                if (res.ok) {
                    dispatch({ type: "DELETE_FAVORITE_WORD", payload: data });
               }
            }

            removeWordFromDB();

        } else {
            dispatch({ type: "DELETE_FAVORITE_WORD", payload: deletedWord });
        }
    }

    return (
        <div>
        {showCard &&
            <div className="max-w-sm mb-4 mx-8 lg:max-w-xl mx-auto">
                
                <div className="card bg-base-100 shadow-xl lg:h-[375px]">

                    <div className="p-5">

                        <div className="flex flex-col lg:flex-row justify-between items-center">
                            {wordData.definitions &&
                                <div className="card-title font-fredoka-one text-4xl lg:text-5xl underline-offset-14 w-full pb-1 lg:pb-4 lg:mr-6 border-b-2 border-yellow-700 text-yellow-700">

                                    <div className="w-full flex gap-2 ">
                                        <h2>{wordData.word}</h2>

                                        {wordData.definitions && wordData.definitions[0].emoji && 
                                            <span>{wordData.definitions[0].emoji}</span>
                                        }
                                    </div>

                                    {wordData.definitions && 
                                        <button
                                        onClick={handleFavorite}
                                        className="flex items-center uppercase font-gaegu text-lg tooltip bg-base-100 outline-0 focus:outline-0 focus-visible:outline-0 hover:border-0"
                                        data-tip="Save your favorite words to your study set"
                                        >
                                            {isFavorite && <AiFillStar style={{ width: '40px', height: '40px', color: '#EBD678'}} />}
                                            {!isFavorite && <AiOutlineStar style={{ width: '40px', height: '40px', color: '#EBD678'}} />}
                                        </button>
                                    }

                                </div>
                            }   

                            {!wordData.definitions && 
                                <figure className="mx-auto w-10/12">
                                    <img 
                                    src="../../wordNotFound.png"
                                    alt="Error Message Picture"
                                    />
                                </figure>
                            }

                            {wordData.definitions && wordData.definitions[0].image_url &&
                            <figure className="mt-4 w-1/2 lg:w-2/5 lg:mt-0">
                                <img 
                                src={`${wordData.definitions[0].image_url}`} 
                                alt={`Illustration of ${wordData.word}`}
                                className="rounded-full border-dotted border-2 border-yellow-800 p-1"
                                />
                            </figure>
                            }
                        </div>

                        <CardBody wordData={wordData} />

                    </div>
                </div>
                
            </div>
                
        }
        </div>
    )
}

export default Card
