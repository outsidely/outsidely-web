/*
    select random sentecen to display
*/

/*
  const randomSentence = getRandomSentence();
  console.log(randomSentence);
*/
function getRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  }
  
var sentences = [
 "Emma was being outsidely when she decided to run an extra five miles on the mountain trail.",
 "Jake was being outsidely when he set up camp on the cliffside after a long day of rock climbing.",
 "Sophia was being outsidely when she rode her bike through the forest instead of taking the paved road.",
 "Liam was being outsidely when he hiked to the summit despite the strong winds and freezing temperatures.",
 "Ava was being outsidely when she chose to do her morning yoga on the trailhead before starting the hike.",
 "Noah was being outsidely when he refused to take shelter from the rain and kept biking through the muddy trails.",
 "Olivia was being outsidely when she planned an overnight climb instead of a simple day hike.",
 "Ethan was being outsidely when he took the scenic route, running along the coastline instead of staying on the road.",
 "Mia was being outsidely when she challenged herself to complete the ultramarathon through the desert.",
 "Daniel was being outsidely when he packed only minimal gear for his multi-day solo trek through the wilderness."
];

