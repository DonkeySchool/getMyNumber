const body = document.querySelector('body');
const frontElt = document.querySelector('.front');
const numberFlipper = document.querySelector('.flipper');
const donkeyImageElt = document.querySelector('.donkey-image');
const numberElt = document.querySelector('.number');
const secretNumb = document.querySelector('.secret-number');
const score = document.querySelector('.score');
const inputNumber  = document.querySelector('.guess');
const btnCheck = document.querySelector('.check');
const messageText = document.querySelector('.message');
const highScore = document.querySelector('.highscore');
const donkeyAudio = new Audio('assets/donkey.mp3');
const listNumbers = document.querySelector('.listnumbers');
const between = document.querySelector('.between');
const playAgain = document.querySelector('.play-again');
const btnEasy = document.querySelector('.play-easy');
const btnMedium = document.querySelector('.play-medium');
const btnHard = document.querySelector('.play-hard');
const divChoiseLevel = document.createElement('div');
divChoiseLevel.classList.add('divChoise');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
body.insertBefore(divChoiseLevel, main);
let levelSelect;
let arrayNumber = [];

const easy  = {
  "levelName" : "easy",
  "numberRandom" : 10,
  "scoreMax" : 30,
}

const medium = {
  "levelName" : "medium",
  "numberRandom" : 20,
  "scoreMax" : 20,
}

const hard = {
  "levelName" : "hard",
  "numberRandom" : 30,
  "scoreMax" : 10,
}




function reset(level) {
  main.style.visibility = 'visible';
  footer.style.visibility = 'visible';
  divChoiseLevel.style.visibility = 'hidden';
  secretNumber = secretNumberRandom(level['numberRandom']);
  numberFlipper.classList.remove('reveal')
  numberElt.classList.remove("hide");
  donkeyImageElt.classList.remove("show");
  between.textContent = `Choisissez un nombre enter 0 et ${level['numberRandom']}`;
  body.classList.remove('success');
  body.classList.remove('loss');
  inputNumber.value = '';
  messageText.textContent = "Commencez à deviner...";
  listNumbers.textContent = '';
  currentScore = level['scoreMax'];
  score.textContent =level['scoreMax'];
  numberElt.textContent = '😁';
  btnCheck.disabled = false;
  arrayNumber = [];
  levelSelect = level;
  playAgain.style.visibility = 'visible';
  main.style.visibility = 'visible';
  footer.style.visibility = 'visible';

}

playAgain.addEventListener('click', function() {
  reset(levelSelect);
});


highScore.textContent = '?';


btnEasy.addEventListener('click', function() {
  reset(easy);
});

btnMedium.addEventListener('click', function() {
  reset(medium);
});

btnHard.addEventListener('click', function() {
  reset(hard);
});

if(levelSelect === undefined) {
  playAgain.style.visibility = 'hidden';
  main.style.visibility = 'hidden';
  footer.style.visibility = 'hidden';
  divChoiseLevel.visibility = 'visible';
  divChoiseLevel.textContent = "Choisissez un niveau pour commencer !";
  divChoiseLevel.textContent += "👆";
  

}




function playErrorAnimation() {
  frontElt.classList.add('error-animation');
  setTimeout(() => {
    frontElt.classList.remove('error-animation');
  }, 400);
}

function egalAnimation() {
  frontElt.classList.add('egal');
  frontElt.classList.add('anime');
  numberElt.textContent = "😡"
  setTimeout(() => {
    frontElt.classList.remove('egal');
    frontElt.classList.remove('anime');
    numberElt.textContent = "😁"
  }, 500);
}

function playLostAnimation() {
  numberElt.classList.add("hide");
  donkeyImageElt.classList.add("show");
  donkeyAudio.play();
}

function revealSecretNumber() {
  numberFlipper.classList.add('reveal');
}

btnCheck.addEventListener('click', function() {
  secretNumb.textContent = secretNumber;
  inputNumber.classList.add('extend');
  if(arrayNumber.length > 0) {
    listNumbers.textContent = `Vous avez déjà essayé les nombres suivants : ${arrayNumber.join(', ')} !`;
  }
  if (inputNumber.value === '') {
    messageText.textContent = "Il faut préciser un nombre !";
    currentScore -= 1;
    score.textContent = currentScore;
    verifScore(currentScore);
    return;
  } 
  
  const guess = Number(inputNumber.value);
  if(arrayNumber.includes(guess)){
    egalAnimation();
    messageText.textContent = `Vous avez déjà choisi le nombre ${guess} !`;
    return;
  }
  switch (levelSelect.levelName) {
    case 'easy':
      if(guess > 10 || guess < 0){
        messageText.textContent = "Il faut choisir un nombre entre 0 et 10 !";
        currentScore -= 1;
        score.textContent = currentScore;
        verifScore(currentScore);
        arrayNumber.push(guess);
        return;
      }
      break;
    case 'medium':
      if(guess > 20 || guess < 0){
        messageText.textContent = "Il faut choisir un nombre entre 0 et 20 !";
        currentScore -= 1;
        score.textContent = currentScore;
        verifScore(currentScore);
        arrayNumber.push(guess);
        return;
      }
      break;
    case 'hard':
      if(guess > 30 || guess < 0){
        messageText.textContent = "Il faut choisir un nombre entre 0 et 30 !";
        currentScore -= 1;
        score.textContent = currentScore;
        verifScore(currentScore);
        arrayNumber.push(guess);
        return;
      }
      break;
  }
  if (guess === secretNumber){
    body.classList.add('success');
    if(currentScore > Number(highScore.textContent)) {
      currentScore = highScore.textContent;
    }
    highScore.textContent = currentScore;
    messageText.textContent = "Bravo !";
    revealSecretNumber();
    return;
  }

  if (guess > secretNumber) {
    messageText.textContent = "C'est moins !";
    currentScore -= 1;
  } else if (guess < secretNumber){
    messageText.textContent = "C'est plus !";
    currentScore -= 1;
  }
  arrayNumber.push(guess);
  playErrorAnimation();
  score.textContent = currentScore;
  verifScore(currentScore);
});




function verifScore(score){
  if (score === 0) {
    messageText.textContent = "Vous avez perdu !";
    playLostAnimation();
    body.classList.add('loss');
    btnCheck.disabled = true;
  }
}

function secretNumberRandom(nb){
  return Math.floor(Math.random() * (nb - 0) + 0)
}



