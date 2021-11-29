// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

//Import components
import {
  Home,
  Header,
  Workouts,
  SingleRoutine,
  Exercises,
  Login,
  MyRoutines,
  EditRoutine
} from './Components/index';

//import api and helper functions
import { fetchRoutines, isLoggedin, fetchUserObj } from './api';


const App = () => {
  //initialize state that may be shared between child Cmponents
  const [allRoutines, setAllRoutines] = useState([]);
  const [token, setToken] = useState('');
  const [userObj, setUserObj] = useState({});
  const [singleRoutine, setSingleRoutine] = useState({});

  //on page load, check if a login token exists
  useEffect( () => {
    isLoggedin(setToken);
  },[])

  //on page load, initialize the user object
  useEffect( () => {
    async function fetchData() {
      setUserObj(await fetchUserObj(token));
    }
    fetchData();
  }, [token])

  //load all workout routines and update the state
  useEffect( () => {
    async function fetchData() {
        setAllRoutines(await fetchRoutines());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Router>
      <div className="app">
        {/** Component: Header */}
        <Route
        exact path = {['/', '/workouts', '/workouts/:routineId',
          '/exercises', '/login', '/register', '/myroutines', '/workouts/:routineId/edit']}
        render = {routeProps => <Header token={token} {...routeProps} />}
        />

        {/** Component: Home */}
        <Route
        exact path = '/'
        render = {routeProps => <Home {...routeProps} />}
        />

        {/** Component: Workouts */}
        <Route
        exact path = '/workouts'
        render = {routeProps => <Workouts allRoutines={allRoutines}
        setAllRoutines={setAllRoutines} {...routeProps} />}
        />

        {/** Component: Single Routine */}
        <Route
        exact path = '/workouts/:routineId'
        render = {routeProps => <SingleRoutine  setSingleRoutine={setSingleRoutine} singleRoutine={singleRoutine} allRoutines={allRoutines}
        setAllRoutines={setAllRoutines} userObj={userObj} {...routeProps} />}
        />

        {/** Component: Exercises */}
        <Route
        exact path = '/exercises'
        render = {routeProps => <Exercises {...routeProps} />}
        />

        {/** Component: Login/Register */}
        <Route
        exact path = '/login'
        render = {routeProps => <Login setToken={setToken} {...routeProps} />}
        />
        <Route
        exact path = '/register'
        render = {routeProps => <Login setToken={setToken} {...routeProps} />}
        />

        {/** Component: MyRoutines */}
        <Route
        exact path = '/myroutines'
        render = {routeProps => <MyRoutines userObj={userObj} token={token} {...routeProps} />}
        />

        {/** Component: EditRoutine */}
        <Route
        exact path = '/workouts/:routineId/edit'
        render = {routeProps => <EditRoutine userObj={userObj} token={token} singleRoutine={singleRoutine} setSingleRoutine={setSingleRoutine} allRoutines={allRoutines} {...routeProps} />}
        />
      </div>
    </Router>
  )
}

export default App;