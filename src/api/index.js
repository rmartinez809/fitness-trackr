/**
 * This file contains the functions used for all API calls
 * and helper functions
 */

const BASEURL = 'https://fitnesstrac-kr.herokuapp.com/api';

//Retrieve a list of all routines (workouts)
//returns a an array of objects
export const fetchRoutines = async () => {
    try {
        const response = await fetch (`${BASEURL}/routines`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        console.log("ALL ROUTINES: ", data);
        return data
    }
    catch (error) {
        throw error;
    }
}
