var game = {
  //questions
  questions: {
    0: {
      question: 'Which of these terms means to cook food in its own juices with a small amount of fat over low heat, just until softened?',
      answer: 'sweating',
      wrongAnswerAry: ['simmering','stewing','sauteeing'],
      img: '../../1.jpg'
    },
    1: {
      question: "What's the difference between a convection oven and a conventional oven?",
      answer: 'A convection oven uses a fan.',
      wrongAnswerAry: ['A convection oven uses radioactivity.','A convection oven lacks the broiler setting.','convention oven only goes up to 300 degrees.'],
      img: '../../1.jpg'
    },
    2: {
      question: 'Which of these classic cuts is the smallest?',
      answer: 'brunoise',
      wrongAnswerAry: ['julienne','cube','dice'],
      img: '../../1.jpg'
    },
    3: {
      question: 'To keep foods moist during cooking by brushing, drizzling or spooning on a sauce, pan juices, or wine. What is the term for this?',
      answer: 'baste',
      wrongAnswerAry: ['dredge','soak','glaze'],
      img: '../../1.jpg'
    },
    4: {
      question: 'To decorate food with fresh herbs, edible flowers, fresh vegetables, or fruit to enhance the look and taste of the dish. What is the term for this?',
      answer: 'garnish',
      wrongAnswerAry: ['refresh','plump','fix'],
      img: '../../1.jpg'
    },
    5: {
      question: "To add an ingredient such as eggs, which hold together the other ingredients, as in meatloaf. What is the term for this?",
      answer: 'bind',
      wrongAnswerAry: ['blend', 'curdle', 'combine'],
      img: '../../1.jpg'
    },
    6: {
      question: "This term is normally used in baking. It means to combine butter, sugar, egg and flavoring until light and fluffy.",
      answer: 'fold',
      wrongAnswerAry: ['mix','whip','cream'],
      img: '../../1.jpg'
    },
    7: {
      question: 'question',
      answer: '6',
      wrongAnswerAry: ['1','1','1'],
      img: '../../1.jpg'
    },
    8: {
      question: 'question',
      answer: '7',
      wrongAnswerAry: ['1','1','1'],
      img: '../../1.jpg'
    },
    9: {
      question: 'question',
      answer: '8',
      wrongAnswerAry: ['1','1','1'],
      img: '../../1.jpg'
    },
    10: {
      question: 'question',
      answer: '9',
      wrongAnswerAry: ['1','1','1'],
      img: '../../1.jpg'
    }
  },
  // in-game variables
  currentAnswer: '',
  currentQuestionIndex: null,
  $questionNodeAry: [],
  questionInxAry: [],
  animating: false,
  noAnswers: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  quesTime: 15,
  timeLeft: 0,
  quesNum: 0,
  timer: undefined,


  // get number of questions

  getNumOfQues: function ObjectLength() {
    var length = 0;
    for(var key in game.questions) {
        if( this.questions.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
  },


  //get random number
  getRandomNum: function(max){
    return Math.floor(Math.random() * (max));
  },


  // randomize an array
  randomizeAry: function(ary){
    let randomizedAry = [];
    let usedNum = [];
    do {
      let randomNum = this.getRandomNum(ary.length);
      if (usedNum.indexOf(randomNum) === -1) {
        randomizedAry.push(ary[randomNum]);
        usedNum.push(randomNum);
      }
    } while (randomizedAry.length < ary.length)
    console.log(`randomized---> ${randomizedAry}`);
    console.log(`usedNum---> ${usedNum}`);
    return randomizedAry;
  },
  // go to next question
  nextQuestion: function(){
    self = this;
    // update timer
    self.timeLeft = self.quesTime;
    $('.info').html($('<span>').text('Time Left: '+self.timeLeft));
    self.timer = setInterval(function() {
      self.timeLeft--;
      $('.info').html($('<span>').text('Time Left: '+self.timeLeft));
      // if out of time clear timer and move to next question
      if (self.timeLeft === 0) {
        console.log("time is up!");
        clearInterval(self.timer);
        self.questionOver(true, false);
        return; 
      }
    }, 1000);
    // reset board
    $('.board').empty();
    // get next question
    $('.board').append(self.$questionNodeAry[self.quesNum]);

    // get answer
    let index = $('p.question-text').data('index');

    self.currentAnswer = self.questions[index].answer;
    self.quesNum++;
  },

  // show answer & display outcome
  questionOver: function(didTimeout, isCorrect){
    var self = this
    // check if timed-out or answer is correct
    if (didTimeout) {
      self.noAnswers++;
      console.log('noAnswers:',self.noAnswers);
    } else if (isCorrect) {
      self.correctAnswers++;
      console.log('correctAnswers:',self.correctAnswers);
    } else {
      self.wrongAnswers++;
      console.log('wrongAnswers:',self.wrongAnswers);
    }
    // display answer
    let info = isCorrect ? 'Correct!' : 'the correct answer was: '+self.currentAnswer
    $('div.info').html(info);
    $('div.board').empty();
    // next question or game over
    setTimeout(function() { 
      if (self.quesNum+1 > self.$questionNodeAry.length) {
        console.log("Out of questions:", self.quesNum);
        self.gameOver()
        return;
      }             
        self.nextQuestion();
    }, 3000);
  },
  // check if answer is correct & send to questionOver()
  guessedAnswer: function(guess){
    clearInterval(self.timer);
    console.log('Guess:',guess);
    let isCorrect = guess === this.currentAnswer ? true : false;
    this.questionOver(false, isCorrect)
  },
  // out of questions display scores and ask to play again
  gameOver: function(){
    console.log('gameOver')
    let $correctAnsScore = $('<div>').addClass().text('correct Answers: '+this.correctAnswers);
    let $wrongAnsScore = $('<div>').addClass().text('wrong Answers: '+this.wrongAnswers);
    let $noAnsScore = $('<div>').addClass().text('did not answer: '+this.noAnswers);
    let $scorDiv = $('<div>').addClass('score-board').append($correctAnsScore,$wrongAnsScore,$noAnsScore);
    let $restartDiv = $('<div>').addClass('restart').text('Play Again')
    $('div.info').html('you answered '+Math.floor((this.correctAnswers/this.getNumOfQues())*100)+'% Correct!');
    $('div.board').append($scorDiv);
  }
}


// create all question nodes when document has finished
$( document ).ready(function() {
  // create all questions & answers nodes
  let numOfQuestions = game.getNumOfQues()
  for (i = 0; i < game.getNumOfQues(); i++) {
    let thisQuestion = game.questions[i];
    console.log(`------question:${i}------`);
    // create question node
    let $questionDiv = $('<div>').addClass('question row')
    let $question = $('<p>').addClass('question-text').attr('data-index',i).text(thisQuestion.question);
    $questionDiv.append($question);
    // get possible answers + randomize answer order
    let possibleAnswersAry = thisQuestion.wrongAnswerAry;
    possibleAnswersAry.push(thisQuestion.answer);
    console.log(`This Answer--> ${thisQuestion.answer}`);
    console.log(`possibleAnswersAry--> ${possibleAnswersAry}`)
    let randomAnswersAry = game.randomizeAry(possibleAnswersAry);
    // create possible answers node
    let $thisAnswer1 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersAry[0]).text(randomAnswersAry[0]);
    let $thisAnswer2 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersAry[1]).text(randomAnswersAry[1]);
    let $thisAnswer3 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersAry[2]).text(randomAnswersAry[2]);
    let $thisAnswer4 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersAry[3]).text(randomAnswersAry[3]);
    let $answersDiv = $('<div>').addClass('answers row top-buffer');
    let $answerBtnDiv1 = $('<div>').addClass('btn-group-lg').append($thisAnswer1);
    $answersDiv.append($answerBtnDiv1);
    let $answerBtnDiv2 = $('<div>').addClass('btn-group-lg').append($thisAnswer2);
    $answersDiv.append($answerBtnDiv2);
    let $answerBtnDiv3 = $('<div>').addClass('btn-group-lg').append($thisAnswer3);
    $answersDiv.append($answerBtnDiv3);
    let $answerBtnDiv4 = $('<div>').addClass('btn-group-lg').append($thisAnswer4);
    $answersDiv.append($answerBtnDiv4);
    // create container div
    let $outerDiv = $('<div>').append($questionDiv,$answersDiv);
    // add question node to array
    game.$questionNodeAry.push($outerDiv);
  }
  // randomize questions
  game.$questionNodeAry = game.randomizeAry(game.$questionNodeAry);
});


// game started
$(document).on('click', '.start', function() {
  game.nextQuestion();
});


// answer selected
$(document).on('click', '.btn-custom', function() {
  let thisAnswer = $(this).data('ans');
  game.guessedAnswer(String(thisAnswer));
});