import React, {useEffect, useState, Fragment} from "react";
import './EditRoutine.css';

//import helper functions
import { searchRoutines, deleteRoutine, editRoutine, fetchRoutines, addActivityToRoutine, editRoutineActivity, deleteRoutineActivity } from "../api";


const EditRoutine = ({singleRoutine, allRoutines, setAllRoutines, match, setSingleRoutine, token, history, allActivities}) => {

    const clearFields = () => {
        setActivityToRoutine(0);
        setDuration(1);
        setCount(1);
    }

    //grab the routine id from the url
    const routineId = Number(match.params.routineId);

    //when the page loads fetch the single routine to display
    useEffect( () => {
        //ensure allRoutines and allActivities are populated when loading the page
        // async function fetchData() {
        //     setAllRoutines(await fetchRoutines());
        // }

        // fetchData();

        //find the routine and update the singleRoutine state
        let foundRoutine = searchRoutines(allRoutines, routineId);

        setSingleRoutine(foundRoutine);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[routineId, singleRoutine]);

    //state for edit fields
    //initially set to existing values for routine
    const [newWorkoutName, setNewWorkoutName] = useState(singleRoutine.name);
    const [newWorkoutGoal, setNewWorkoutGoal] = useState(singleRoutine.goal);
    const [newPublicStatus, setNewPublicStatus] = useState(singleRoutine.isPublic);

    const [activityToRoutine, setActivityToRoutine] = useState(0);
    const [duration, setDuration] = useState(1);
    const [count, setCount] = useState(1);

    const [editDuration, setEditDuration] = useState();
    const [editCount, setEditCount] = useState();


    return(
        <div className="scroll-bar" id="edit-routine-container">
            <h4>Edit your Workout</h4>
                <form id="edit-routine-form"
                    onSubmit = { async (event) => {
                    //prevent the page from reloading by disabling default behavior
                    event.preventDefault();

                    //api call to edit routine
                    await editRoutine(match.params.routineId, newWorkoutName, newWorkoutGoal, newPublicStatus, token)

                    //clear text fields
                    setNewWorkoutName('');
                    setNewWorkoutGoal('');
                    setNewPublicStatus(true);

                    //make an api call and update state for all routines
                    await setAllRoutines(await fetchRoutines());

                    //go back to my routines page
                    history.push(`/workouts/${routineId}`);
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

            <br />
            <br />

            <div id="edit-activities-container">
                <h5>Edit/Remove Exercises</h5>
                {
                    singleRoutine.activities ?
                        singleRoutine.activities.map( (currentElement) => {
                            return (
                                <Fragment>
                                <form id="edit-routine-activity-form" key={currentElement.id}
                                    onSubmit = { async (event) => {
                                        //prevent the page from reloading by disabling default behavior
                                        event.preventDefault();

                                        //api call to edit routine
                                        await editRoutineActivity(currentElement.routineActivityId, editCount, editDuration, token);

                                        //clear text fields

                                        //make an api call and update state for all routines
                                        await setAllRoutines(await fetchRoutines());

                                        //go back to my single routine page
                                        history.push(`/workouts/${routineId}`);
                                        }}>
                                    <select className="form-select" id="current-routine-activity" disabled>
                                    <option value={currentElement.routineAcivityId}>{currentElement.name}</option>
                                </select>

                                <label htmlFor="reps" className="form-label">reps:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    list="numbers"
                                    id="reps"
                                    placeholder="10"
                                    min="0"
                                    defaultValue={currentElement.duration}
                                    onChange={(event) => {
                                        console.log("NEW DURATION IS: ", event.target.value);
                                        setEditDuration(event.target.value);
                                    }}
                                />

                                <label htmlFor="sets" className="form-label">sets:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    list="numbers"
                                    id="sets"
                                    placeholder="10"
                                    min="0"
                                    defaultValue={currentElement.count}
                                    onChange={(event) => {
                                        console.log("NEW COUNT IS: ", event.target.value);
                                        setEditCount(event.target.value);
                                    }}
                                />
                                <button type="submit" className="btn btn-secondary btn-sm" id="update-routine-activity-btn">update</button>

                                <button type="button" className="btn btn-danger btn-sm" id="delete-button"
                                onClick={ async () => {
                                    console.log("DELETING ROUTINE ACTIVITY...", currentElement.routineActivityId);

                                    //api call to remove routine activity
                                    await deleteRoutineActivity(currentElement.routineActivityId, token);

                                    //make an api call and update state for all routines
                                    await setAllRoutines(await fetchRoutines());

                                    //after deleting, go back to single workout page
                                    history.push(`/workouts/${routineId}`);
                                    }
                                }>remove</button>
                                </form>

                                <br />
                                </Fragment>
                            )
                        })
                    : null

                }
                <br />
                <h5>Add New Exercises</h5>
                <form id="add-activity-routine-form"
                    onSubmit = { async (event) => {
                    //prevent the page from reloading by disabling default behavior
                    event.preventDefault();

                    //api call to edit routine
                    await addActivityToRoutine(routineId, activityToRoutine, count, duration, token);

                    //clear text
                    clearFields();

                    //make an api call and update state for routines;
                    await setAllRoutines(await fetchRoutines());


                    //go back to my routines page
                    history.push(`/workouts/${routineId}`);

                    }} >

                    <select className="form-select"
                    id="activities-list"
                    onChange={ (event) => {
                        console.log("ACTIVITY IS: ", event.target.value)
                        setActivityToRoutine(event.target.value);
                    } }
                    >
                        <option defaultValue>Select an Exercise</option>
                        {
                            //map over activities array to display options in list

                            allActivities.map((currentElement) => {
                                return (
                                    <option value={currentElement.id} key={currentElement.id}>
                                        {currentElement.name}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="reps" className="form-label">reps:</label>
                    <input
                        type="number"
                        className="form-control"
                        list="numbers"
                        id="reps"
                        placeholder="10"
                        min="0"
                        value={duration}
                        onChange={(event) => {
                            console.log("DURATION IS: ", event.target.value);
                            setDuration(event.target.value);
                        }}
                    />
                    <label htmlFor="sets" className="form-label">sets:</label>
                    <input
                        type="number"
                        className="form-control"
                        list="numbers"
                        id="sets"
                        placeholder="10"
                        min="0"
                        value={count}
                        onChange={(event) => {
                            console.log("COUNT IS: ", event.target.value);
                            setCount(event.target.value);
                        }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm" id="add-activity-btn">Add</button>
                </form>
            </div>
        </div>
    )
}

export default EditRoutine;