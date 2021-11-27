import React, {useEffect, useState} from "react";
import './SingleRoutine.css';

//import helper functions
import { searchRoutines } from "../api";

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

    return (
        <div id="singleRoutine-container">
            <div className="card scroll-bar" id="card-single-view" key={singleRoutine.id}>
                    <img src="https://www.bodybuilding.com/images/2020/january/full-body-workout-for-beginners-comingsoon-h1-640xh.jpg" className="card-img-top" alt="workout cover"/>
                    <div className="card-body">
                        <h4 className="card-title">{singleRoutine.name}</h4>
                            <p id="creator-line"><span className="italics">created by:</span> <a href="">{singleRoutine.creatorName} </a></p>
                            <br />
                            <p className="card-text"><span className="bold">Goal:</span> {singleRoutine.goal}</p>
                        <br />
                        <h5>Exercises:</h5>
                        {/**map over the exercises array*/}
                        {
                            singleRoutine.activities ?
                                singleRoutine.activities.map( (currentElement) => {
                                    return (
                                        <div id="activities" key={currentElement.id}>
                                            <h6>{currentElement.name}</h6>
                                                <p>{currentElement.description}</p>
                                                <p>reps: {currentElement.duration}</p>
                                                <p>sets: {currentElement.count}</p>
                                                <hr />
                                        </div>
                                    )
                                })
                            : null
                        }

                    </div>
                </div>
        </div>

    )
}

export default SingleRoutine;