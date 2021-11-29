import React, { useState, useEffect } from "react";
import './MyRoutines.css';

//import helper functions
import { fetchUserRoutines, routineImage, createRoutine } from "../api";

const MyRoutines = ({userObj, token, history, allRoutines}) => {
    //state for user routines
    const [userRoutines, setUserRoutines] = useState([]);
    //state for creating a new workout
    const [workoutName, setWorkoutName] = useState('');
    const [workoutGoal, setWorkoutGoal] = useState('');
    const [publicStatus, setPublicStatus] = useState(true);

    //when the page loads, find routines by the specific user
    useEffect(() => {
        async function fetchData() {
            setUserRoutines(await fetchUserRoutines(userObj.username, token))
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userObj.username, allRoutines])

    return (
        <div className="scroll-bar" id="myroutines-container">

            <div className="scroll-bar" id="cards-container-flex">
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
            <hr id="horizontal-line"/>
            <div id="newRoutine-container">
                <h4>Create a New Workout</h4>
                <form id="new-workout-form"
                    onSubmit = { async (event) => {
                    //prevent the page from reloading by disabling default behavior
                    event.preventDefault();

                    //api call to create a new routine
                    await createRoutine(workoutName, workoutGoal, token);

                    //clear text fields
                    setWorkoutName('');
                    setWorkoutGoal('');

                    //make an api call and update state for my routines
                    setUserRoutines(await fetchUserRoutines(userObj.username, token));

                    window.location.reload();
                    }} >


                    <div className="form-group form-spacing">
                            <label htmlFor="workoutName">Title: </label>
                            <input
                                required
                                id="workoutName"
                                type="text"
                                className="form-control"
                                placeholder='Chest Day, Leg Day, etc.'
                                value={workoutName}
                                onChange={
                                (event) => {
                                    setWorkoutName(event.target.value);
                                }
                            }/>
                        </div>

                    <div className="form-group form-spacing">
                        <label htmlFor="workoutGoal">Goal: </label>
                        <input
                            required
                            id="workoutGoal"
                            type="text"
                            className="form-control"
                            placeholder='Increase Strength, Lose 20lb, etc.'
                            value={workoutGoal}
                            onChange={
                            (event) => {
                                setWorkoutGoal(event.target.value);
                            }
                        }/>
                    </div>

                    <div className="form-check form-spacing">
                        <label htmlFor="publicStatus"> Make routine public? </label>
                        <input
                            id="publicStatus"
                            type="checkbox"
                            className="form-check-input"
                            checked={publicStatus}
                            onChange={
                            (event) => {
                                setPublicStatus(event.target.checked);
                            }
                        }/>
                    </div>

                    <button type="submit" className="btn btn-secondary" id="register-button">Create</button>
            </form>
            </div>

        </div>


    )
}

export default MyRoutines;