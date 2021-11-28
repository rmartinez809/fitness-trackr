import React, { useState, useEffect } from "react";
import './MyRoutines.css';

//import helper functions
import { fetchUserRoutines, routineImage } from "../api";

const MyRoutines = ({userObj, token, history}) => {
    //state for user routines
    const [userRoutines, setUserRoutines] = useState([]);

    //when the page loads, find routines by the specific user
    useEffect(() => {
        async function fetchData() {
            setUserRoutines(await fetchUserRoutines(userObj.username, token))
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        //map over and display routines
        <div className="scroll-bar" id="myroutines-container">
            {
                userRoutines.map((currentElement, index) => {
                    //call routineImage() for a link to a random image for the card
                    const imgSrc = routineImage();

                    return (
                        /* {include a click handler on each card to go to the single routine page} */
                        <div className="card card-height" id="cards-workouts" key={index}
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

export default MyRoutines;