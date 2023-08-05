import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../features/auth/authSlice';

const Header = () => {

    const navigate = useNavigate(), dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const onLogout = () => {
        dispatch(logoutUser());
        dispatch(reset());
        navigate('/');
    }

    const logoRedirect = user ? '/dashboard' : '/';

    return (
        <header className='header'>    
            <div className='Logo'>
                <Link to={logoRedirect}><strong>GoalTracker</strong></Link>
            </div>
            <ul> 
            {user 
                ? <button className='btn' onClick={onLogout}><FaSignOutAlt /> Logout</button>
                : <>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt />Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser />Register
                        </Link>
                    </li>
                </>
            } </ul>
        </header>
    )
}

export default Header;