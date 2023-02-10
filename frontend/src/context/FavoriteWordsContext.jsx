import { createContext, useReducer } from 'react'; 
import { useAuthContext } from '../hooks/useAuthContext';

export const FavoriteWordsContext = createContext();

export const favoriteWordsReducer = (state, action) => {
    switch(action.type) {
        case 'GET_FAVORITE_WORDS':
            return {
                favoriteWords: action.payload,
            };
        case 'CREATE_FAVORITE_WORD':
            return {
                favoriteWords: [action.payload, ...state.favoriteWords],
            };
        case 'DELETE_FAVORITE_WORD':
            return {
                favoriteWords: state.favoriteWords.filter(word => word._id !== action.payload._id)
            }
        default:
            return state;
    }
};

export const FavoriteWordsContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    
    const favoriteWordsFromLocalStorage = JSON.parse(localStorage.getItem('favoriteWords'));
    
    const initialState = user ? [] : favoriteWordsFromLocalStorage || [];

    const [state, dispatch] = useReducer(favoriteWordsReducer, { favoriteWords: initialState });

    return (
        <FavoriteWordsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FavoriteWordsContext.Provider>
    )
}