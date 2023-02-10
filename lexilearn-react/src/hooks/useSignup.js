import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, name) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch("https://lexilearn-server.cyclic.app/api/user/signup", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password, name }),
        })

        const data = await res.json();

        if (!res.ok) {
            setIsLoading(false);
            setError(data.error);
        }

        if (res.ok) {
            localStorage.setItem('user', JSON.stringify(data))

            // update auth context
            dispatch({ type: 'LOGIN', payload: data })

            setIsLoading(false);
        }

    }

    return { signup, isLoading, error }
}

