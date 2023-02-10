import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password, name);
    }
    return (
        <div className="mb-4 mt-6 lg:max-w-xl mx-auto">
            <div className="card lg:w-96 bg-base-100 shadow-xl lg:h-[500px] flex flex-col">
                <form onSubmit={handleSubmit} className="card-body justify-between text-lg lg:text-xl">
                    <h2 className="card-title font-fredoka-one text-4xl lg:text-5xl underline-offset-14 w-full pb-1 lg:pb-4 mr-6 border-b-2 border-yellow-700 text-yellow-700">
                        Sign Up
                    </h2>

                    <div className="mt-4 font-gaegu uppercase flex flex-col text-yellow-700">
                        <label htmlFor="name" className="font-bold p-0.5">Name:</label>
                        <input
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Miles Morales"
                        value={name}
                        className="p-0.5 mb-2"
                        />

                        <label htmlFor="email" className="font-bold p-0.5">Email:</label>
                        <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        value={email}
                        className="p-0.5 mb-2"
                        />

                        <label htmlFor="password" className="p-0.5">Password:</label>
                        <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="your password"
                        value={password}
                        className="p-0.5"
                        />
                    </div>

                    <button disabled={isLoading} className="bg-yellow-700 font-gaegu m-1 rounded-md w-full tracking-widest hover:bg-yellow-800 text-base-100 text-lg lg:text-xl ">
                        Sign Up
                    </button>

                    { error && 
                        <div className="font-gaegu text-red-600 text-center">{error}</div>
                    }
                    
                    <span className="font-gaegu text-yellow-700 text-center">
                        Already have an account? 
                        <Link to="/login">
                            <span className="text-yellow-500"> Login!</span>
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup