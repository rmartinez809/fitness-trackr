import React, {useEffect, useState} from "react";
import './Workouts.css';

//import api functions
import { fetchRoutines } from "../api";

const Workouts = () => {
    //state for all routines, initially set to an empty array
    const [allRoutines, setAllRoutines] = useState([]);

    //when the page loads, call fetchRoutines
    //note effect callbacks are synchronous. The async call needs to placed inside another function
    useEffect( () => {
        async function fetchData() {
            setAllRoutines(await fetchRoutines());
        }
        fetchData();
    }, [])

    return (
        <div id="workouts-container">
            <span>Under Construction...</span>
            {/*map over the routines to display each one*/}
            {
                allRoutines.map( (currentElement, index) => {
                    return (
                        <div className="card" key={index}>
                            <img src="..." className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Workouts;