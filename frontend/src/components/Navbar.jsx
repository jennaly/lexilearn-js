import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFavoriteWordsContext } from '../hooks/useFavoriteWordsContext';
import Title from './Title';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const { dispatch } = useFavoriteWordsContext();

    const handleClick = () => {
        logout();
        dispatch({ type: 'GET_FAVORITE_WORDS', payload: [] });
    }

    return (
        <header>
            <div className="px-5 mt-5 font-fredoka-one uppercase">
                <nav className="flex justify-start">
                    <div className="dropdown md:hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {user &&
                            <li onClick={handleClick}><span className="text-yellow-700">Logout</span></li>
                            }

                            {!user &&
                                <>
                                <li><Link to="/login"><span className="text-yellow-700">Login</span></Link></li>
                                <li><Link to="/signup"><span className="text-yellow-700">Signup</span></Link></li>
                                </>
                            }
                            
                        </ul>
                    </div>
                </nav>

                <nav className="flex justify-end">
                    <div className="hidden md:block">
                        {user && 
                            <div>
                                <button onClick={handleClick} className="btn btn-ghost text-yellow-700 hover:bg-yellow-800 hover:text-base-100 outline outline-1 outline-yellow-700 hover:border hover:border-yellow-800">Log out</button>
                            </div>
                        }
                        
                        {!user && 
                            <div className="flex gap-2">
                                <Link to="/login">
                                    <span className="btn btn-ghost rounded-none text-yellow-700 hover:bg-yellow-800 hover:text-base-100 outline outline-1 outline-yellow-700">
                                    Login
                                    </span>
                                </Link>

                                <Link to="/signup">
                                    <span className="btn btn-ghost rounded-none text-yellow-700 hover:bg-yellow-800 hover:text-base-100 outline outline-1 outline-yellow-700">
                                    Signup
                                    </span>
                                </Link>
                            </div>   
                        }
                    </div>
                </nav>
                <Title />
             
            </div>


        </header>
    )
}

export default Navbar

// btn btn-ghost btn-square btn-outline