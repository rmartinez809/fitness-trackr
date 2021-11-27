import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({token, history, match}) => {

    return (
        <div id="nav-container">
            <div id='logo'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16"
                onClick={ () => history.push('/')} >
                    <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                </svg>
            </div>
            {/**include conditional classname to change appearance based on route */}
            <ul id="nav">
                <li><Link to='/workouts'
                    className={(match.url === '/workouts') ? 'active' : ''}>WORKOUTS</Link></li>
                <li><Link to='/exercises'
                    className={(match.url === '/exercises') ? 'active' : ''}>EXERCISES</Link></li>
                {
                    //check if a valid token exists.
                    //if it does, display a log out option in the header
                    //it will remove the token from local storage and redirect to home page
                    token ?
                    <li><Link to='/'
                        onClick = { () => {
                            localStorage.removeItem('token');
                            window.location.assign('/');
                            return false;
                        } }
                    >LOG OUT</Link></li>
                    : <li><Link to='/login'
                    className={(match.url === '/login') ? 'active' : ''}>LOG IN</Link></li>
                }

            </ul>
        </div>
    )

}

export default Header;