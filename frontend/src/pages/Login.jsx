import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }
    return (
            <div className="mb-4 mt-6 lg:max-w-xl mx-auto">
                
                <div className="card lg:w-96 bg-base-100 shadow-xl lg:h-[420px] flex flex-col">
                    <form onSubmit={handleSubmit} className="card-body justify-between text-lg lg:text-xl">
                        <h2 className="card-title font-fredoka-one text-4xl lg:text-5xl underline-offset-14 w-full pb-1 lg:pb-4 mr-6 border-b-2 border-yellow-700 text-yellow-700">
                            Login
                        </h2>

                        <div className="mt-4 font-gaegu uppercase flex flex-col text-yellow-700">
                            <label htmlFor="email" className="font-bold p-0.5">Email:</label>
                            <input
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            value={email}
                            className="p-0.5 mb-1"
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
                            Login
                        </button>

                        { error && 
                            <div className="font-gaegu text-red-600 text-center">{error}</div>
                        }
                    
                        <span className="font-gaegu text-yellow-700 text-center">
                            Don't have an account? 
                            <Link to="/signup">
                                <span className="text-yellow-500"> Sign Up!</span>
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
    )
}

export default Login