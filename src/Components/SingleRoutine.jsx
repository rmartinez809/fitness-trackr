import React, {useEffect, useState} from "react";
import './SingleRoutine.css';

//import helper functions
import { searchRoutines } from "../api";

const SingleRoutine = ({match, allRoutines}) => {
     //state for single routine Initialized to an empty Object
     const [singleRoutine, setSingleRoutine] = useState({});

    //ensure allRoutines is populated when loading the page


    //when the page loads fetch the single routine to display
    useEffect( () => {
        //grab the routine id from the url
        const routineId = Number(match.params.routineId);

        //find the routine and update the singleRoutine state
        const foundRoutine = searchRoutines(allRoutines, routineId);

        setSingleRoutine(foundRoutine);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[allRoutines]);

    console.log("SINGLE ROUTINE: ", singleRoutine);

    return (
        <div id="singleRoutine-container"></div>
    )
}

export default SingleRoutine;