function printHighscores() {
  // Get scores from localstorage or set to an empty array if null
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Sort highscores by score property in descending order
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  for (var i = 0; i < highscores.length; i++) {
    // Create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = highscores[i].initials + " - " + highscores[i].score;

    // Display on page
    document.getElementById("highscores").appendChild(liTag);
  }
}

function clearHighscores() {
  // Clear the scores from local storage
  localStorage.removeItem("highscores");
  
  // Clear scores from the page
  document.getElementById("highscores").innerHTML = "";
}

document.getElementById("clear").onclick = clearHighscores;

// Run function when the page loads
printHighscores();
