import React, {useEffect, useState} from "react";
import './EditRoutine.css';

//import helper functions
import { searchRoutines, deleteRoutine, editRoutine, fetchRoutines } from "../api";

const EditRoutine = ({singleRoutine, allRoutines, setAllRoutines,userObj, match, setSingleRoutine, token, history}) => {
    //state for edit fields
    //initially set to existing values for routine
    const [newWorkoutName, setNewWorkoutName] = useState(singleRoutine.name);
    const [newWorkoutGoal, setNewWorkoutGoal] = useState(singleRoutine.goal);
    const [newPublicStatus, setNewPublicStatus] = useState(singleRoutine.isPublic);

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

    return(
        <div id="edit-routine-container">
            <h4>Edit your Routine</h4>
                <form id="edit-routine-form"
                    onSubmit = { async (event) => {
                    //prevent the page from reloading by disabling default behavior
                    event.preventDefault();

                    //api call to edit routine
                    editRoutine(match.params.routineId, newWorkoutName, newWorkoutGoal, newPublicStatus, token)

                    //clear text fields
                    setNewWorkoutName('');
                    setNewWorkoutGoal('');
                    setNewPublicStatus(true);

                    //make an api call and update state for all routines
                    setAllRoutines(await fetchRoutines());

                    //go back to my routines page
                    window.location.assign('/myroutines');
                    }} >


                    <div className="form-group form-spacing">
                            <label htmlFor="newWorkoutName">Title: </label>
                            <input
                                required
                                id="newWorkoutName"
                                type="text"
                                className="form-control"
                                placeholder='Chest Day, Leg Day, etc.'
                                value={newWorkoutName}
                                onChange={
                                (event) => {
                                    setNewWorkoutName(event.target.value);
                                }
                            }/>
                        </div>

                    <div className="form-group form-spacing">
                        <label htmlFor="newWorkoutGoal">Goal: </label>
                        <input
                            required
                            id="newWorkoutGoal"
                            type="text"
                            className="form-control"
                            placeholder='Increase Strength, Lose 20lb, etc.'
                            value={newWorkoutGoal}
                            onChange={
                            (event) => {
                                setNewWorkoutGoal(event.target.value);
                            }
                        }/>
                    </div>

                    <div className="form-check form-spacing">
                        <label htmlFor="newPublicStatus"> Make routine public? </label>
                        <input
                            id="newPublicStatus"
                            type="checkbox"
                            className="form-check-input"
                            checked={newPublicStatus}
                            onChange={
                            (event) => {
                                setNewPublicStatus(event.target.checked);
                            }
                        }/>
                    </div>

                    <button type="submit" className="btn btn-secondary" id="update-button">Update</button>
                    <br />
                    <br />
                    <button type="button" className="btn btn-danger" id="delete-button"
                        onClick={ () => {
                            console.log("DELETING ROUTINE...");
                            deleteRoutine(match.params.routineId, token);

                            //after deleting, go back to myroutines page
                            history.push('/myroutines');
                            }
                        }
                    >Delete</button>

            </form>

        </div>

    )

}

export default EditRoutine;