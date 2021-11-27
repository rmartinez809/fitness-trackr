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
  SingleRoutine
} from './Components/index';

//import api and helper functions
import { fetchRoutines } from './api';


const App = () => {
  //state to store all workout routines, initially set to an empty array
  const [allRoutines, setAllRoutines] = useState([]);

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
        exact path = {['/', '/workouts', '/workouts/:routineId','/exercises']}
        render = {routeProps => <Header {...routeProps} />}
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
        render = {routeProps => <SingleRoutine allRoutines={allRoutines}
        setAllRoutines={setAllRoutines} {...routeProps} />}
        />
      </div>
    </Router>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
