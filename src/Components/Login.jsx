import React, {useState, Fragment} from "react";
import { Link } from "react-router-dom";
import './Login.css';

//import api functions
import {logIn, registerUser} from '../api';

const Login = ({setToken, match, history}) => {
    //set state for username, password, and confirm password fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const clearFields = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div id="login-container">
            <form id="login"
            onSubmit = { async (event) => {
                //prevent the page from reloading by disabling default behavior
                event.preventDefault();

                //if we're at the login page make an api call to login
                if (match.url === '/login'){
                    console.log('Logging In...');
                    if (await logIn(username, password, setToken)) {
                        //clear text fields
                        clearFields();

                        //go back to workouts page after successful log in
                        history.push('/workouts')
                    }
                    //clear text fields
                    clearFields();


                }
                //if we're at the register page make an api call to register a new user
                else {
                    console.log('Creating new user...');
                    if(await registerUser(username, password,setToken)) {
                        //clear text fields
                        clearFields();

                        //go back to workouts page after successful log in
                        history.push('/workouts')
                    }
                    //clear text fields
                    clearFields();
                }

            }} >
                <div className="form-group form-spacing">
                    <label htmlFor="username">Username: </label>
                    <input
                        required
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder="enter your username"
                        value={username}
                        onChange={
                        (event) => {
                            setUsername(event.target.value);
                        }
                    }/>
                </div>
                <div className="form-group form-spacing">
                    <label htmlFor="password">Password: </label>
                    <input
                        required
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="enter a password"
                        value={password}
                        onChange={
                        (event) => {
                            setPassword(event.target.value);
                        }
                    }/>
                    </div>
                {/**
                 * Change the button based on whether the user is at the login or register page
                 * At the register page add an additional field to confirm password
                 */}
                {
                    match.url === '/login' ?
                    <button type="submit" className="btn btn-secondary" id="login-button">Log in</button>
                :
                <Fragment>
                    <div className="form-group form-spacing">
                        <label htmlFor="confirmPassword">Confirm Password: </label>
                        <input
                        required
                        id="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={
                        (event) => {
                            setConfirmPassword(event.target.value);
                        }
                        }/>
                    </div>
                <button type="submit" className="btn btn-secondary" id="register-button">Register</button>
                </Fragment> }
                {/**
             * If the user is at login, ask if they need to register for an account
             * At the register page, ask if they already have an account and would like to log in
             */}
            { match.url === '/login' ?
                <Link to='/register'>Create Account</Link>
                : <Link to='/login'>Already have an account? Log In</Link> }
            </form>


        </div>
    )

}

export default Login;