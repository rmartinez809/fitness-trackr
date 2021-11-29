import React, {useState} from "react";
import './Exercises.css';

import { fetchAllActivities, createActivity } from "../api";

const Exercises = ({token, allActivities, setAllActivities}) => {

    //state for new activity fields
    const [activityName, setActivityName] = useState('');
    const [activityDesc, setActivityDesc] = useState('');

    return (
        /**map over the exercises and display each one */
        <div className="scroll-bar"  id="exercises-container">
            <div className="scroll-bar" id="exercises-cards-container">
                {
                    allActivities.map( (currentElement) => {
                        return (
                            <div className="card" id="card-exercise" key={currentElement.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{currentElement.name}</h5>
                                    <p className="card-text">{currentElement.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <hr id="horizontal-line"/>

            <div id="new-activity-container">
                <h4>Add a New Exercise</h4>
                <form id="new-activity-form"
                    onSubmit = { async (event) => {
                    //prevent the page from reloading by disabling default behavior
                    event.preventDefault();

                    //api call to create a new routine
                    createActivity(activityName, activityDesc, token);

                    //clear text fields
                    setActivityName('');
                    setActivityDesc('');


                    //make an api call and update state for activities
                    setAllActivities(await fetchAllActivities());

                    window.location.reload();
                    }} >


                    <div className="form-group form-spacing">
                            <label htmlFor="activityName">Title: </label>
                            <input
                                required
                                id="activityName"
                                type="text"
                                className="form-control"
                                placeholder='Push-Up'
                                value={activityName}
                                onChange={
                                (event) => {
                                    setActivityName(event.target.value);
                                }
                            }/>
                        </div>

                    <div className="form-group form-spacing">
                        <label htmlFor="activityDesc">Description: </label>
                        <input
                            required
                            id="activityDesc"
                            type="text"
                            className="form-control"
                            placeholder='Lower your body until your chest touches the floor...'
                            value={activityDesc}
                            onChange={
                            (event) => {
                                setActivityDesc(event.target.value);
                            }
                        }/>
                    </div>

                    <button type="submit" className="btn btn-secondary" id="create-button">Create</button>
                </form>
            </div>

        </div>
    )
}

export default Exercises;