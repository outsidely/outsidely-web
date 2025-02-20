/***********************************
 outsidely helper
 ***********************************/

/*  
  const totalSeconds = 7500; // Example: 7500 seconds
  const formattedTime = formatTime(totalSeconds);
  console.log(formattedTime); // Output: 02:05:00
*/
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

/*
  let meters = 10;
  let feet = metersToFeet(meters);
  console.log(meters + " meters is equal to " + feet + " feet");
 */ 
function metersToFeet(meters) {
  return Math.ceil(meters * 3.28084);
}

function metersToMiles(meters) {
    return Math.ceil(meters*0.000621371192);
}
  
