import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id="nav-container">
            <ul id="nav">
                <li><Link to='/routines'>WORKOUTS</Link></li>
                <li><Link to='/activities'>EXERCISES</Link></li>
                <li><Link to='/login'>LOG IN</Link></li>
            </ul>
        </div>
    )

}

export default Header;