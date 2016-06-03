var game = {
  //questions
  questions: {
    0: {
      question: 'Which of these terms means to cook food in its own juices with a small amount of fat over low heat, just until softened?',
      answer: 'sweating',
      wrongAnswerArray: ['simmering','stewing','sauteeing'],
    },
    1: {
      question: "In molecular gastronomy, what is the primary purpose of using liquid nitrogen?",
      answer: 'freezing',
      wrongAnswerArray: ['heating','blanching','caramelizing'],
    },
    2: {
      question: 'Which of these classic cuts is the smallest?',
      answer: 'brunoise',
      wrongAnswerArray: ['julienne','cube','dice'],
    },
    3: {
      question: 'To keep foods moist during cooking by brushing, drizzling or spooning on a sauce, pan juices, or wine. What is the term for this?',
      answer: 'baste',
      wrongAnswerArray: ['dredge','soak','glaze'],
    },
    4: {
      question: 'To decorate food with fresh herbs, edible flowers, fresh vegetables, or fruit to enhance the look and taste of the dish. What is the term for this?',
      answer: 'garnish',
      wrongAnswerArray: ['refresh','plump','fix'],
    },
    5: {
      question: "What part of a cow does filet mignon come from?",
      answer: 'loin',
      wrongAnswerArray: ['belly', 'leg', 'neck'],
    },
    6: {
      question: "This term is normally used in baking. It means to combine butter, sugar, egg and flavoring until light and fluffy.",
      answer: 'cream',
      wrongAnswerArray: ['mix','whip','fold'],
    },
    7: {
      question: 'If you were julienning an onion, the resulting slices would be about the size of what?',
      answer: 'matchstick',
      wrongAnswerArray: ['fingernail','straight pin','english pea'],
    },
    8: {
      question: 'What is the technique for removing the browned bits from a pan to flavor sauces, soups and gravies?',
      answer: 'deglazing',
      wrongAnswerArray: ['making a roux','sauteeing','caramelizing'],
    },
    9: {
      question: 'The soaking of a fruit in a flavored liquid so it penetrates the fruit is called …',
      answer: 'macerate',
      wrongAnswerArray: ['reconstitute','smoothie','puree'],
    },
    10: {
      question: 'What is the most common used flour in pasta?',
      answer: 'semolina',
      wrongAnswerArray: ['ap','millet','chickpea'],
    },
    11: {
      question: 'A boning knife is most commonly used for:',
      answer: 'meat',
      wrongAnswerArray: ['onions','herbs','garlic'],
    },
    12: {
      question: 'A paring knife is most commonly used for:',
      answer: 'peeling vegetables',
      wrongAnswerArray: ['cutting salmon','cleaning meat','mincing garlic'],
    },
    13: {
      question: 'What is the preservation method called that cooks food and preserves it in its own fat?',
      answer: 'confit',
      wrongAnswerArray: ['salt cure','gelatin','braise'],
    }
  },
 
  currentAnswer: '',
  currentQuestionIndex: null,
  questionArray: [],
  noAnswers: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  quesTime: 15,
  timeLeft: 0,
  quesNum: 0,
  timer: undefined,


  // number of questions
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
  randomizeArray: function(array){
    let randomizedArray = [];
    let usedNum = [];
    do {
      let randomNum = this.getRandomNum(array.length);
      if (usedNum.indexOf(randomNum) === -1) {
        randomizedArray.push(array[randomNum]);
        usedNum.push(randomNum);
      }
    } while (randomizedArray.length < array.length)
   
    return randomizedArray;
  },

  // go to next question
  nextQuestion: function(){
    self = this;
    // update timer
    self.timeLeft = self.quesTime;
    $('.info').html($('<span>').text('time left: '+self.timeLeft));
    self.timer = setInterval(function() {
      self.timeLeft--;
      $('.info').html($('<span>').text('time left: '+self.timeLeft));
      // if out of time clear timer and move to next question
      if (self.timeLeft === 0) {
        clearInterval(self.timer);
        self.questionOver(true, false);
        return; 
      }
    }, 1000);

    // reset board
    $('.board').empty();
    // get next question
    $('.board').append(self.questionArray[self.quesNum]);

    // get answer
    let index = $('p.question-text').data('index');

    self.currentAnswer = self.questions[index].answer;
    self.quesNum++;
  },

  // show answer / display outcome
  questionOver: function(didTimeout, isCorrect){
    var self = this
    // check if timed-out or answer is correct
    if (didTimeout) {
        self.noAnswers++;
    } else if (isCorrect) {
        self.correctAnswers++;
    } else {
        self.wrongAnswers++;
    }

    // display answer
    let info = isCorrect ? 'CORRECT!' : 'the correct answer was: ' + self.currentAnswer
    $('div.info').html(info);
    $('div.board').empty();

    // next question or game over
    setTimeout(function() { 
      if (self.quesNum + 1 > self.questionArray.length) {
        self.gameOver()
        return;
      }             
        self.nextQuestion();
    }, 2000);
  },

  // check if answer is correct & send to questionOver()
  guessedAnswer: function(guess){
    clearInterval(self.timer);
    let isCorrect = guess === this.currentAnswer ? true : false;
    this.questionOver(false, isCorrect)
  },

  // display scores and ask to play again
  gameOver: function(){
    let $correctAnsScore = $('<div>').addClass().text('correct answers: ' + this.correctAnswers);
    let $wrongAnsScore = $('<div>').addClass().text('wrong answers: ' + this.wrongAnswers);
    let $noAnsScore = $('<div>').addClass().text('did not answer: ' + this.noAnswers);
    let $scorDiv = $('<div>').addClass('score-board').append($correctAnsScore,$wrongAnsScore,$noAnsScore);
    $('div.info').html('you answered ' + Math.floor((this.correctAnswers/this.getNumOfQues())*100)+'% correct!');
    $('div.board').append($scorDiv);
  }
}


// create all question nodes when document has finished
$( document ).ready(function() {
  // create all questions & answers nodes
  let numOfQuestions = game.getNumOfQues()
  for (i = 0; i < game.getNumOfQues(); i++) {
    let thisQuestion = game.questions[i];
 
    // create question node
    let $questionDiv = $('<div>').addClass('question')
    let $question = $('<p>').addClass('question-text').attr('data-index',i).text(thisQuestion.question);
    $questionDiv.append($question);

    // get possible answers + randomize answer order
    let possibleAnswersArray = thisQuestion.wrongAnswerArray;
    possibleAnswersArray.push(thisQuestion.answer);
    let randomAnswersArray = game.randomizeArray(possibleAnswersArray);

    // create possible answers
    let $thisAnswer1 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersArray[0]).text(randomAnswersArray[0]);
    let $thisAnswer2 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersArray[1]).text(randomAnswersArray[1]);
    let $thisAnswer3 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersArray[2]).text(randomAnswersArray[2]);
    let $thisAnswer4 = $('<button>').addClass('btn btn-custom')
      .attr('data-ans',randomAnswersArray[3]).text(randomAnswersArray[3]);
    let $answersDiv = $('<div>').addClass('answers');
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
    game.questionArray.push($outerDiv);
  }
  // randomize questions
  game.questionArray = game.randomizeArray(game.questionArray);
});


// game start
$(document).on('click', '.start', function() {
  game.nextQuestion();
});


// answer select
$(document).on('click', '.btn-custom', function() {
  let thisAnswer = $(this).data('ans');
  game.guessedAnswer(String(thisAnswer));
});