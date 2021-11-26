// import logo from './logo.svg';
import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

//Import components
import {
  Home, Header, Workouts
} from './Components/index';


const App = () => {
  return (
    <Router>
      <div className="app">
        {/** Component: Header */}
        <Route
        exact path = {['/', '/workouts', '/exercises']}
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
        render = {routeProps => <Workouts {...routeProps} />}
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
