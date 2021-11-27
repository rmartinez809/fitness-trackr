import React from "react";
import './Workouts.css';

//import api functions
import { routineImage } from "../api";

const Workouts = ({history, allRoutines}) => {
    return (
        <div id="workouts-container" className="scroll-bar">
            {/*map over the routines to display each one*/}
            {
                allRoutines.map( (currentElement, index) => {
                    //call routineImage() for a link to a random image for the card
                    const imgSrc = routineImage();

                    return (
                        //include a click handler on each card to go to the single routine page
                        <div className="card" id="cards-workouts" key={index}
                        onClick={ () => {
                            history.push(`/workouts/${currentElement.id}`)
                        }} >
                            <img src={window.location.origin + `/images/${imgSrc}`} className="card-img-top" alt="workout cover"/>
                            <div className="card-body">
                                <h5 className="card-title">{currentElement.name}</h5>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Workouts;