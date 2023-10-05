function printHighscores() {
  // either get scores from localstorage or set to empty array

  // sort highscores by score property in descending order

  for (var i = 0; i < highscores.length; i += 1) {
    // create li tag for each high score
    // display on page
  }
}

function clearHighscores() {}

document.getElementById("clear").onclick = clearHighscores;

// run function when page loads
printHighscores();
