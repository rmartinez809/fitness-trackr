import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({history}) => {
    return (
        <div id="nav-container">
            <div id='logo'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16"
                onClick={ () => history.push('/')} >
                    <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
                </svg>
            </div>
            <ul id="nav">
                <li><Link to='/workouts'>WORKOUTS</Link></li>
                <li><Link to='/exercises'>EXERCISES</Link></li>
                <li><Link to='/login'>LOG IN</Link></li>
            </ul>
        </div>
    )

}

export default Header;