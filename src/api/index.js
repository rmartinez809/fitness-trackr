/**
 * This file contains the functions used for all API calls
 * and helper functions
 */

const BASEURL = 'https://fitnesstrac-kr.herokuapp.com/api';

/**
 * ROUTINES ENDPOINTS
 */
//Retrieve a list of all routines (workouts)
//returns a an array of Objects
export const fetchRoutines = async () => {
    try {
        const response = await fetch (`${BASEURL}/routines`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        // console.log("ALL ROUTINES: ", data);
        console.log("all routines: ", data);
        return data
    }
    catch (error) {
        throw error;
    }
}

//create a new routine and return the new object.
//must include an authentication token
export const createRoutine = async (name, goal, isPublic, token) => {

    //if any fields are undefined, return early
    if (!name || !goal || !token) {
        return {};
    }

    try {
        const response = await fetch(`${BASEURL}/routines`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic
            })
        })
        const result = await response.json();

        //if call was successful...
        if (result.id) {
            alert("New Workout Created");
        }
        else {
            alert(`Error:  ${result.message}`);
        }

        console.log("NEW ROUTINE CREATED: ", result);
        return result;
    }
    catch (error) {

    }
}

//edits and returns a routine
//updats name, goal, and public/private status
export const editRoutine = async (routineId, name, goal, isPublic, token) => {

    //if any fields are undefined, return early
    if (!name || !goal || !token) {
        return {};
    }

    try {
        const response = await fetch(`${BASEURL}/routines/${routineId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic
            })
        })
        const result = await response.json();

        //if call was successful...
        if (result.id) {
            alert("Routine Successfully Updated");
        }
        else {
            alert(`Error:  ${result.message}`);
        }

        console.log("ROUTINE UPDATED: ", result);
        return result;
    }
    catch (error) {

    }
}

//deletes a routine and associated routine activities
export const deleteRoutine = async(routineId, token) => {
    //if any fields are undefined, return early
    if (!routineId || !token) {
        return {};
    }

    try {
        const response = await fetch(`${BASEURL}/routines/${routineId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();

        //if call was successful...
        if (result.success) {
            alert("Routine Deleted");
        }
        else {
            alert(`Error:  ${result.message}`);
        }

        return result;
    }
    catch (error) {
        throw error;
    }

}

//adds a single activity to a routine
//returns an object
export const addActivityToRoutine = async (routineId, activityId, count, duration, token) => {

    //if any fields are undefined, return early
    if (!activityId || !count || !duration || !routineId) {
        return {};
    }

    try {
        const response = await fetch(`${BASEURL}/routines/${routineId}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                activityId: activityId,
                count: count,
                duration: duration
            })
        })
        const result = await response.json();

        //if call was successful...
        if (result.id) {
            alert("Activity Successfully Added To Routine");
        }
        else {
            alert(`Error:  ${result.message}`);
        }

        console.log("Activity Successfully Added To Routine: ", result);
        return result;
    }
    catch (error) {

    }
}



/**
 * ACTIVITIES ENDPOINTS
 */
//Retrieve a list of all activities (exercises)
//returns an array of Objects
export const fetchAllActivities = async () => {
    try {
        const response = await fetch (`${BASEURL}/activities`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        console.log("ALL ACTIVITIES: ", data);

        if(data) {
            return data
        }
        else return [];

    }
    catch (error) {
        throw error;
    }
}

//creates a new activity
//returns an object
export const createActivity = async (name, description, token) => {

    //if any fields are undefined, return early
    if (!name || !description) {
        return {};
    }

    try {
        const response = await fetch(`${BASEURL}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description : description
            })
        })
        const result = await response.json();

        //if call was successful...
        if (result.id) {
            alert("New Exercise Created");
        }
        else {
            alert(`Error:  ${result.message}`);
        }

        return result;
    }
    catch (error) {

    }
}


/**
 * USER ENDPOINTS
 */
//This function attempts to log in a user and update the token state
//on successful registration, stores a JWT in local storage
 export const logIn = async (username, password,setToken) => {
    try {
        const response = await fetch(`${BASEURL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const result = await response.json();

        //if login was successful...
        if (result.token) {
            alert("Log in successful");
            //update token state
            setToken(result.token);
            //store token in local storage
            localStorage.setItem("token", result.token);

            return true;
        }
        else {
            alert(`Error:  ${result.message}`);
        }

    }
    catch(error) {
        throw error;
    }
}

//This function attempts to register a new user
//on successful registration, stores a JWT in local storage
export const registerUser = async (username, password, setToken) => {
    try {
        const response = await fetch(`${BASEURL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const result = await response.json();

        //if registration was successful...
        if (result.token) {
            alert("Registration successful");
            //update token state
            setToken(result.token);
            //store token in local storage
            localStorage.setItem("token", result.token);

            return true;
        }
        else {
            alert(`Error:  ${result.message}`);
        }

    }
    catch(error) {
        throw error;
    }
}

//This function will retrieve a user object with their id and username
export const fetchUserObj = async (token) => {
    try {
        const response = await fetch(`${BASEURL}/users/me`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
        })
        const result = await response.json();

        return result;
    }
    catch (error) {
        throw error;
    }
}

//This function will return an array of routines for a particular user
//note, if no authorization token is passed, only public routines will be returned
export const fetchUserRoutines = async (username, token) => {
    //if username is undefined return early with an empty array
    if(!username) return [];

    try {
        const response = await fetch(`${BASEURL}/users/${username}/routines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const result = await response.json();

        console.log("RETURNED ROUTINES: ", result);
        return result;
    }
    catch (error) {
        throw error;
    }
}


/**
 * ROUTINE_ACTIVITIES ENDPOINTS
 */
//this function updates the count or count on a routine activity
 export const editRoutineActivity = async (routineActivityId, count, duration, token) => {

    try {
        const response = await fetch(`${BASEURL}/routine_activities/${routineActivityId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                count: count,
                duration: duration
            })
        })
        const result = await response.json();

        //if call was successful...
        if (result.id) {
            alert("Routine Activity Successfully Updated");
        }
        else {
            alert(`Error:  ${result.message}`);
        }

        console.log("UPDATE SUCCESSFUL: ", result);
        return result;
    }
    catch (error) {

    }
}

//this function deletes a routine activity
export const deleteRoutineActivity = async (routineActivityId, token) => {

    try {
        const response = await fetch(`${BASEURL}/routine_activities/${routineActivityId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await response.json();

        //if call was successful...
        if (result.success) {
            alert("Routine Activity Deleted");
        }
        else {
            alert(`Error:  ${result.message}`);
        }

        console.log("DELETE SUCCESSFUL: ", result);
        return result;
    }
    catch (error) {

    }
}


/**
 * HELPER FUNCTIONS
 */
//returns the link for a random image
export const routineImage = () => {
    const imageArray = ['30day-abs-main-header-logo-1920x1080-latest-280x158.jpg', 'fyr2-main-header-logo-1920x1080-280x158.jpg', 'rewired-logo-header-280x158.jpg', 'total-fitness-header-1920x1080-280x158.jpg', 'home-body-sales-page-header-1920x1080-logo-280x158.jpg' ]

    //generate a random number accordingo the length of the array
    const randomInt = Math.floor(Math.random() * imageArray.length);

    return imageArray[randomInt];
}

//this function searches the array of routines for a single routine
//returns an object
export const searchRoutines = (routinesArray, routineId) => {
    const found = routinesArray.find((currentElement) => {
        return currentElement.id === routineId;
    });

    //if no routine was found return an empty object
    if (!found) return {}
    else {
        console.log("SINGLE ROUTINE: ", found);
        return found;
    }
}

//This function checks for the presence of an authentication token in the browser's local storage
export const isLoggedin = (setToken) => {
    //read data from local storage
    const token = localStorage.getItem("token");

    //set the state for token
    if (token) {
        setToken(token);

        return true;
    }
    else return false;
}