var output = document.getElementById('output');
var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');
var newButton = document.getElementById('new');
//var rounds;
//var playerWins;
//var computerWins;

var params = {
   rounds: 0,
   playerWins: 0,
   computerWins: 0,
   progress: [],
};

function checkButton(state) {
   rock.disabled = state;
   scissors.disabled = state;
   paper.disabled = state;
}



newButton.addEventListener('click', function () {


   resetGame();

   params.rounds = window.prompt('Ile rund?');
   output2.innerHTML = 'Round number: ' + params.rounds;

});

//rock.addEventListener('click', function () {
//   playerMove("rock");
//});
//
//scissors.addEventListener('click', function () {
//   playerMove("scissors");
//});
//
//paper.addEventListener('click', function () {
//   playerMove("paper");
//});

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

   var winner;

   if (userChoice === computerChoice) {
      output.innerHTML = 'The result is tie!';
      winner = 'tie';
   } else if (
      (userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'scissors' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'rock')
   ) {
      params.playerWins++;
      output.innerHTML = 'YOU WON: you played ' + userChoice + ', computer played ' + computerChoice;
      winner = 'player';

   } else {
      params.computerWins++;
      output.innerHTML = 'YOU LOSE: you played ' + userChoice + ', computer played ' + computerChoice;
      winner = 'computer';
   }

   var score = {
      comChoice: computerChoice,
      plChoice: userChoice,
      winner: winner,
      points: params.playerWins + ':' + params.computerWins,
   }

   params.progress.push(score);

   //   console.log(score);
   console.log(params.progress);

   checkEnd();
   setScore();
}

function resetGame() {
   params.rounds = 0;
   params.playerWins = 0;
   params.computerWins = 0;

   checkButton(false);

}

function checkEnd() {

   if (params.playerWins == params.rounds) {
      document.getElementById('modal-overlay').classList.add('show');
      document.getElementById('modal-one').classList.add('show');
      output.innerHTML = 'YOU WON THE ENTIRE GAME!!!';

   } else if (params.computerWins == params.rounds) {
      document.getElementById('modal-overlay').classList.add('show');
      document.getElementById('modal-one').classList.add('show');
      output.innerHTML = 'YOU LOSE THE ENTIRE GAME!!!';

   }

   if (params.playerWins == params.rounds || params.computerWins == params.rounds) {
      for (var i = 0; i < params.progress.length; i++) {
         document.getElementById('tbody').innerHTML += '<tr><td>' + (i + 1) + '</td><td>' + params.progress[i].plChoice + '</td><td>' + params.progress[i].comChoice + '</td><td>' + params.progress[i].winner + '</td><td>' + params.progress[i].points + '</td></tr>';
      }
      checkButton(true);
   }

}

var hideModal = function (event) {
   event.preventDefault();
   document.querySelector('#modal-overlay').classList.remove('show');
   document.querySelector('#modal-one').classList.remove('show');
};

var hideOverlay = function (event) {
   event.preventDefault();
   document.querySelector('#modal-overlay').classList.remove('show');
   document.querySelector('#modal-one').classList.remove('show');
};

document.getElementById('modal-overlay').addEventListener('click', hideOverlay);

var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++) {
   closeButtons[i].addEventListener('click', hideModal);
}


function setScore() {
   document.getElementById('result').innerHTML = 'Player score: ' + params.playerWins + ' vs ' +
      'Computer score: ' + params.computerWins;
}

document.querySelectorAll('.player-move').forEach(function (element, index) {
   element.addEventListener('click', function () {
      this.addEventListener('click', playerMove(this.getAttribute('data-move')));
   });
})