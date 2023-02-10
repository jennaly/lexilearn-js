import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { AuthContextProvider } from './context/AuthContext';
import { FavoriteWordsContextProvider } from './context/FavoriteWordsContext';
import { WordDataContextProvider } from './context/WordDataContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavoriteWordsContextProvider>
        <WordDataContextProvider>
          <App />
        </WordDataContextProvider>
      </FavoriteWordsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
