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


//returns the link for a random image
export const routineImage = () => {
    const imageArray = ['30day-abs-main-header-logo-1920x1080-latest-280x158.jpg', 'fyr2-main-header-logo-1920x1080-280x158.jpg', 'rewired-logo-header-280x158.jpg', 'total-fitness-header-1920x1080-280x158.jpg', 'home-body-sales-page-header-1920x1080-logo-280x158.jpg' ]

    //generate a random number accordingo the length of the array
    const randomInt = Math.floor(Math.random() * imageArray.length);

    return imageArray[randomInt];
}
