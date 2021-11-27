import React, {useEffect, useState} from "react";
import './SingleRoutine.css';

//import helper functions
import { searchRoutines, routineImage } from "../api";

const SingleRoutine = ({match, allRoutines}) => {
     //state for single routine Initialized to an empty Object
     const [singleRoutine, setSingleRoutine] = useState({});

    //when the page loads fetch the single routine to display
    //ensure allRoutines is populated when loading the page
    useEffect( () => {
        //grab the routine id from the url
        const routineId = Number(match.params.routineId);

        //find the routine and update the singleRoutine state
        const foundRoutine = searchRoutines(allRoutines, routineId);

        setSingleRoutine(foundRoutine);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allRoutines]);

    console.log("SINGLE ROUTINE: ", singleRoutine);
    //call routineImage() for a link to a random image for the card
    const imgSrc = routineImage();

    return (
        <div id="singleRoutine-container">
            <div className="card" id="card-single-view" key={singleRoutine.id}>
                    <img src="https://www.bodybuilding.com/images/2020/january/full-body-workout-for-beginners-comingsoon-h1-640xh.jpg" className="card-img-top" alt="workout cover"/>
                    <div className="card-body">
                        <h4 className="card-title">{singleRoutine.name}</h4>
                            <p className="card-text"><span className="bold">Goal:</span> {singleRoutine.goal}</p>
                        <br />
                        <h6>Exercises:</h6>
                    </div>
                </div>
        </div>

    )
}

export default SingleRoutine;