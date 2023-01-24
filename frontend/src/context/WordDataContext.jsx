import { createContext, useReducer } from 'react';

export const WordDataContext = createContext();

export const wordDataContextReducer = (state, action) => {
    switch(action.type) {
        case 'GET_WORD_DATA':
            return {
                wordData: action.payload,
            }
        default:
            return state;
    }
}

export const WordDataContextProvider = ({ children }) => {
    const [state, dataDispatch] = useReducer(wordDataContextReducer, { wordData: [] });

    return (
        <WordDataContext.Provider value={{ ...state, dataDispatch }}>
            {children}
        </WordDataContext.Provider>
    )
}