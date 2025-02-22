/***********************************
 outsidely helper
 ***********************************/

/*  
  const totalSeconds = 7500; // Example: 7500 seconds
  const formattedTime = formatTime(totalSeconds);
  console.log(formattedTime); // Output: 02:05:00
*/
function formatTime(seconds) {
    var rtn = "";
    if(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
    
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
      rtn = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;  
    } 
    return rtn;
  }

/* Example usage:
  const isoDate = '2025-02-20T10:30:45.000Z';
  const formattedDate = formatDate(isoDate);
  console.log(formattedDate); // Output: 20-02-2025 10:30:45
*/
function formatDate(isoDateString, format) {
  var fmtDate = "";
  if(isoDateString) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    fmtDate = format || `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  
  }

  return fmtDate;
}
  
/*
  let meters = 10;
  let feet = metersToFeet(meters);
  console.log(meters + " meters is equal to " + feet + " feet");
 */ 
function metersToFeet(meters) {
  var rtn = "";
  if(meters) {
  rtn = Math.ceil(meters * 3.28084).toString()+ " feet";
  } 
  return rtn;
}

function metersToMiles(meters, noLabel) {
  var rtn = "";
  if(meters) {
    rtn = meters*0.000621371192;
    rtn = rtn*10;
    rtn = Math.round(rtn);
    rtn = rtn/10;
    if(noLabel==true) {
      rtn = rtn;
    } else {
      rtn = rtn.toString() + " miles";
    }
  }
  return rtn;
}
  
function metersToKilometers(meters, noLabel) {
  var rtn = "";
  if (meters) {
    if(noLabel===true) {
      rtn = Math.round(meters / 1000);
    } else {
      rtn = Math.round(meters / 1000).toString() + " km";
    }    
  } 
  return rtn;
}

function computePace(time, length, unit) { 
  var rtn = "";
  var unt = "";
  var distance = 0;

  if(time && length) {
    unt = unit || "mi";
    var totalSeconds = time;

    if(unt==="mi") {
      distance = metersToMiles(length,true);
    } else {
      distance = metersToKilometers(length,true);
    }
    const secondsPerDistance = totalSeconds / distance;
  
    const minutes = Math.floor(secondsPerDistance / 60);
    const seconds = Math.round(secondsPerDistance % 60);
  
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    rtn = minutes + ":" + formattedSeconds + "/mi"; 
  }
  return rtn
}

function setTextArea(value) {
  var rtn = value || "";;
  rtn = value;
}

function selectActivity(value) {
  var rtn = value;
  var actTypes = [
    {name:"run",value:"Run"},
    {name:"ride",value:"Ride"},
    {name:"other",value:"Other"}
  ]
  for(var t in actTypes) {
    if(value==actTypes[t].name) {
      rtn = actTypes[t].value;
    }
  }
  return rtn;
}