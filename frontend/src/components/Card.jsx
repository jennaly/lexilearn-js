import React, {useState, useEffect} from 'react';
import { useWordDataContext } from "../hooks/useWordDataContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { useFavoriteWordsContext } from "../hooks/useFavoriteWordsContext";
import CardBody from './CardBody';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {  v1 as uuidv1 } from 'uuid';

// this component renders data returned from the serer in response to the user's word search
const Card = ( ) => {
    
    // contains data returned by Owlbot and Twinword API (through Lexilearn server)
    const { wordData } = useWordDataContext();
    
    // contains all of the saved words in user's study set
    const { favoriteWords, dispatch } = useFavoriteWordsContext();

    // user's authentication state
    const { user } = useAuthContext();

    // whether the current word displayed already exists in user's study set
    const [isFavorite, setIsFavorite] = useState(false);

    // checks for whether the current word is saved and updates the local state accordingly
    // runs in these two cases following the intial render:
    // 1. when the user searches for a different word
    // 2. when there's changes to the study set (to make sure that state is updated if the user chooses to remove/unfavorite the current word)
    useEffect(() => {
        const checkIsFavorite = () => {  
            
            // base case: if the user's study set is empty
            if (!favoriteWords.length) {
                setIsFavorite(false);
            }

            // checks if the current word exists in the study set and updates the isFavorite state to true
            // both strings are always in lowercase so there's no need to format them before evaluating
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

    // handles changes to isFavorite state when the user clicks on the star icon to save/remove a word from the study set
    const handleFavorite = () => {
        
        if (isFavorite) {
            removeWordFromFavorites();

        } else {
            addWordToFavorites();
        }
    }

    // adds a word to the study set
    const addWordToFavorites = () => {

        // transforms definitions data from Owlbot before saving to database
        const definitions = wordData.definitions.map((e, index) => `${index + 1}. (${e.type}) ${e.definition}`);

        // favoriteWord document
        const entry = {
            "term": wordData.word,
            "definitions": [
                ...definitions
            ],
            "difficulty": wordData.difficulty,
        }

        // if the user is logged in, send a post request to the server to add the word to the database
        if (user) {
            const addWordToDB = async () => {
                const res = await fetch("https://lexilearn-server.cyclic.app/api/favoriteWords", {
                    method: "POST",
                    body: JSON.stringify(entry),
                    headers: {
                        // specifies that the request body is JSON
                        'Content-Type': 'application/json',

                        // sends the JSON web token to the server to make authorized requests
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                
                const data = await res.json();
                
                // if the word has been successfully added to the database,
                // the favoriteWords state will be updated to include the word
                // no need to use uuid here because MongoDB generates an object ID for every document created 
                if (res.ok) {
                    dispatch({ type: 'CREATE_FAVORITE_WORD', payload: data });
                }
            }

            addWordToDB();

        } else {
            // if the user is not logged in, the favoriteWords state will be updated to include the word, 
            // and in turn will be saved to localStorage (see line 38 of ../pages/Index.jsx)
            // uuid is used to generate an id for the word when it is saved locally, this is to facilitate the DELETE_FAVORITE_WORD action (see line 16 of ../context/FavoriteWordsContext) 
            entry['_id'] = uuidv1();
            dispatch({ type: 'CREATE_FAVORITE_WORD', payload: entry });
        }
    }

    // unfavorite/removes a word from the study set
    const removeWordFromFavorites = () => {
        const deletedWord = favoriteWords.find(favoriteWord => favoriteWord.term == wordData.word);

        // if the user is logged in, send a post request to the server to remove the word from the database
        if (user) {
            
            const removeWordFromDB = async () => {

                // removes the word from the database by its object ID
                const { _id } = deletedWord;

                const res = await fetch(`https://lexilearn-server.cyclic.app/api/favoriteWords/${_id}`, {
                    method: "DELETE",
                    headers: {
                        // sends the JSON web token to the server to make authorized requests
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                const data = await res.json();

                // if the word has been successfully removed from the database,
                // the favoriteWords state will be updated to remove the word
                if (res.ok) {
                    dispatch({ type: "DELETE_FAVORITE_WORD", payload: data });
               }
            }

            removeWordFromDB();

        } else {
            // if the user is not logged in: favoriteWords state and localStorage are updated
            dispatch({ type: "DELETE_FAVORITE_WORD", payload: deletedWord });
        }
    }

    return (
            <div className="max-w-sm mb-4 lg:max-w-xl mx-auto card bg-base-100 shadow-xl lg:h-[375px] p-5">
                
                <div className="flex flex-col lg:flex-row justify-between items-center">

                    {/* renders the data returned by owlbot, if the word exists in their database*/}
                    {wordData.definitions &&
                        <div className="card-title font-fredoka-one text-4xl lg:text-5xl underline-offset-14 w-full pb-1 lg:pb-4 lg:mr-6 border-b-2 border-yellow-700 text-yellow-700">

                            <div className="w-full flex gap-2 ">
                                <h2>{wordData.word}</h2>

                                {/* renders word's emoji if it's available*/}
                                {wordData.definitions && wordData.definitions[0].emoji && 
                                    <span>{wordData.definitions[0].emoji}</span>
                                }
                            </div>

                            {/* star icon (button to add or remove current word from study set)*/}
                            <button
                            onClick={handleFavorite}
                            className="flex items-center uppercase font-gaegu text-lg tooltip bg-base-100 outline-0 focus:outline-0 focus-visible:outline-0 hover:border-0"
                            data-tip="Save your favorite words to your study set"
                            >
                                {/* if word is already in the study set, display the star icon filled */}
                                {isFavorite && <AiFillStar style={{ width: '40px', height: '40px', color: '#EBD678'}} />}

                                {/* otherwise, display the star icon outline */}
                                {!isFavorite && <AiOutlineStar style={{ width: '40px', height: '40px', color: '#EBD678'}} />}
                            </button>

                        </div>
                    }   

                    {/* if the word doesn't exist in the owlbot database, render a picture that signals an error to the*/}
                    {!wordData.definitions && 
                        <figure className="mx-auto w-10/12">
                            <img 
                            src="../../wordNotFound.png"
                            alt="Error Message Picture"
                            />
                        </figure>
                    }
                    {/* renders the picture that owlbot returns, if available*/}
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

                {/* if the word exists in the owlbot data, this component will render the definitions and example sentence*/}
                {/* if the word doesn't exist in the owlbot data, this component will render an error message*/}
                <CardBody />

            </div>
    )
}

export default Card
