import React, {useEffect, Fragment} from "react";
import { Link } from "react-router-dom";
import './SingleRoutine.css';

//import helper functions
import { searchRoutines } from "../api";

const SingleRoutine = ({match, allRoutines, setSingleRoutine, singleRoutine, userObj}) => {


    //when the page loads fetch the single routine to display
    //ensure allRoutines is populated when loading the page
    useEffect( () => {
        //grab the routine id from the url
        const routineId = Number(match.params.routineId);

        //find the routine and update the singleRoutine state
        const foundRoutine = searchRoutines(allRoutines, routineId);

        setSingleRoutine(foundRoutine);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allRoutines, userObj]);
    //adding userObj as dependency because we'll need to check user id to show edit button

    return (
        <div id="singleRoutine-container">
            <div className="card scroll-bar" id="card-single-view" key={singleRoutine.id}>
                    <img src="https://www.bodybuilding.com/images/2020/january/full-body-workout-for-beginners-comingsoon-h1-640xh.jpg" className="card-img-top" alt="workout cover"/>
                    <div className="card-body">
                        <h4 className="card-title">{singleRoutine.name}</h4>
                            <p id="creator-line"><span className="italics">created by:</span> <Link to="">{singleRoutine.creatorName} </Link></p>

                            {/**check if logged in user is the owner of the routine. if they are display an edit button*/}
                            {
                                (userObj.id === singleRoutine.creatorId) ?
                                    <Fragment>
                                    <Link id='edit-routine-link' to={`/workouts/${singleRoutine.id}/edit`}>edit routine</Link>

                                    {/* <button type="button" className="btn btn-danger btn-sm" id="btn-edit"
                                        onClick={ console.log("BUTTON CLICKED") }
                                    >Edit routine</button> */}
                                    <br />
                                    </Fragment>
                                : null
                            }

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