var output = document.getElementById('output');
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var newButton = document.getElementById('new');
var rounds;
var playerWins;
var computerWins;

function checkButton(state) {
   rock.disabled = state;
   scissors.disabled = state;
   paper.disabled = state;
}



newButton.addEventListener('click', function () {
   

   resetGame();

   rounds = window.prompt('Ile rund?');
   output2.innerHTML = 'Round number: ' + rounds;

});

rock.addEventListener('click', function () {
   playerMove("rock");
});

scissors.addEventListener('click', function () {
   playerMove("scissors");
});

paper.addEventListener('click', function () {
   playerMove("paper");
});

function playerMove(userChoice) {
   var computerChoice = Math.floor((Math.random() * 3) + 1);

   if (computerChoice == 1) {
      computerChoice = 'rock';
   } else if (computerChoice == 2) {
      computerChoice = 'paper';
   } else {
      computerChoice = 'scissors';
   }

   compare(userChoice, computerChoice);
}

function compare(userChoice, computerChoice) {

   if (userChoice === computerChoice) {
      output.innerHTML = 'The result is tie!';
   } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'scissors' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'rock')
   ) {
      playerWins++;
      output.innerHTML = 'YOU WON: you played ' + userChoice + ', computer played ' + computerChoice;
   } else {
      computerWins++;
      output.innerHTML = 'YOU LOSE: you played ' + userChoice + ', computer played ' + computerChoice;
   }

   checkEnd();
   setScore();
}

function resetGame() {
   rounds = 0;
   playerWins = 0;
   computerWins = 0;

  checkButton(false);

}

function checkEnd() {
  
   if (playerWins == rounds) {
      output.innerHTML = 'YOU WON THE ENTIRE GAME!!!';
     checkButton(true);
   } else if (computerWins == rounds) {
      output.innerHTML = 'YOU LOSE THE ENTIRE GAME!!!';
     checkButton(true);
  }  
}


function setScore() {
   document.getElementById('result').innerHTML = 'Player score: ' + playerWins + ' vs ' +
      'Computer score: ' + computerWins;
}