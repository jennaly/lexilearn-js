import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import { useFavoriteWordsContext } from '../hooks/useFavoriteWordsContext';

import Searchbar from '../components/Searchbar';
import Card from '../components/Card';
import Favorites from '../components/Favorites';
import DownloadButtons from '../components/DownloadButtons';
import Loading from '../components/Loading';

const Index = () => {
    const { user } = useAuthContext();
    const { favoriteWords, dispatch } = useFavoriteWordsContext();
    const [loading, setLoading] = useState(false);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const fetchWords = async () => {
          const res = await fetch( `https://lexilearn-server.up.railway.app/api/favoriteWords`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
    
          const data = await res.json();

          if (res.ok) {
            dispatch({ type: 'GET_FAVORITE_WORDS', payload: data });
          }
        };
        
        if (user) {
            fetchWords();
        }
    }, [user]);
    
    useEffect(() => {
        if (!user) {
          localStorage.setItem('favoriteWords', JSON.stringify(favoriteWords));
        }
    }, [favoriteWords]);

    return (
        <div>
            <Searchbar setLoading={ setLoading } setShowCard={ setShowCard }/>

            { loading && 
                <Loading />
            }
            
            <Card showCard={ showCard }/>
            <Favorites setLoading={ setLoading } setShowCard={ setShowCard }/>
            <DownloadButtons />
        </div>
    )
}

export default Index
