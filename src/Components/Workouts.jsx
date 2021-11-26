import React, {useEffect, useState} from "react";
import './Workouts.css';

//import api functions
import { fetchRoutines, routineImage } from "../api";

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
        <div id="workouts-container" className="scroll-bar">
            {/*map over the routines to display each one*/}
            {
                allRoutines.map( (currentElement, index) => {
                    //call routineImage() for a link to a random image for the card
                    const imgSrc = routineImage();

                    return (
                        <div className="card" key={index}>
                            <img src={window.location.origin + `/images/${imgSrc}`} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Routine</h5>
                                <p className="card-text">description</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Workouts;