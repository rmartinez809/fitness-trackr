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
        return data
    }
    catch (error) {
        throw error;
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

        // console.log("ALL ACTIVITIES: ", data);
        return data
    }
    catch (error) {
        throw error;
    }
}


/**
 * USER ENDPOINTS
 */
/**
 * This function attempts to log in a user and update the token state
 * on successful registration, stores a JWT in local storage
 */
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

/**
 * This function attempts to register a new user
 * on successful registration, stores a JWT in local storage
 */
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
    else return found;
}
