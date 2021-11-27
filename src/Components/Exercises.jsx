import React, {useState, useEffect} from "react";
import './Exercises.css';

import { fetchAllActivities } from "../api";

const Exercises = () => {
    //state for allActivities. Initialized to an empty array
    const [allActivities, setAllActivities] = useState([]);

    //when the page loads, fetch all activities and update the state
    useEffect( () => {
        async function fetchData() {
            setAllActivities(await fetchAllActivities());
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log("EXERCISES COMPONENT: ", allActivities);

    return (
        /**map over the exercises and display each one */
        <div id="exercises-container">Under Construction...</div>
    )
}

export default Exercises;