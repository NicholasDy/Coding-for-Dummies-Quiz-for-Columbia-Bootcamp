// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

// declare all my variables 
var startBtn = document.querySelector(".start-btn");
var resetBtn = document.querySelector(".reset-btn");
var nextBtn = document.querySelector(".next-btn");
var answerBtn = document.querySelector(".questionoptions")

var firePitImg = document.querySelector(".firepit")

var questionEl = document.querySelector(".question");
var questionBox = document.querySelector(".questionbox");
var questionOptions = document.querySelector(".questionoptions");

var timerEl = document.querySelector(".timer");
var secondsEl = document.querySelector(".seconds");

var questionsLeftEL = document.querySelector(".questionsleft");
var correctEl = document.querySelector(".goodscore");
var incorrectEl = document.querySelector(".badscore");

var currQuest = document.querySelector(".currquest")
var totalQuest = document.querySelector(".totalquest")
var totalCorr = document.querySelector(".goodscore")
var totalInCorr = document.querySelector(".badscore")

var currentQuestionsIndex = 0
var timer; 
var timerCounter;
var isWin = false


// question bank
var questionBank = [
    {
        question: "question 1",
        answers: [
            { text:"answer 1.1", correct: true },
            { text:"answer 1.2", correct: false },
            { text:"answer 1.3", correct: false },
        ], 
    
        
    },

    {
        question: "question 2 ",
        answers: [
            { text:"answer 2.1", correct: true },
            { text:"answer 2.2", correct: false },
            { text:"asnwer 2.3", correct: false },
        ]
        
    },
    {
        question: "question 3 ",
        answers: [
            { text:"answer 2.1", correct: true },
            { text:"answer 2.2", correct: false },
            { text:"asnwer 2.3", correct: false },
        ]
        
    },
    {
        question: "question 4 ",
        answers: [
            { text:"answer 2.1", correct: true },
            { text:"answer 2.2", correct: false },
            { text:"asnwer 2.3", correct: false },
        ]
        
    },
]

// function init 
function init() {
    // sets the scores to 0 
    totalQuest.innerText = questionBank.length
    totalCorr.innerText = 0
    totalInCorr.innerText = 0 
  };

//   start the quiz
function startGame() {
    startBtn.disabled = true;
    isWin = false;
    timerCounter = 3;
    currentQuestionsIndex = 0;
    removeImg();
    startTimer(); 
    startBtn.classList.add("hide")
    nextQuestion();
    localStorage.removeItem("correct",)
    localStorage.removeItem("incorrect",)
};

function nextQuestion() {
    showQuestion(questionBank[currentQuestionsIndex]);
}

function showQuestion(question){
    questionEl.innerText = question.question
    question.answers.forEach(answer => { 
        var button = document.createElement("button")
        button.innerText = answer.text 
        button.classList.add("answer-btn")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }        
        button.addEventListener("click", selectAnswer)
        answerBtn.appendChild(button)
    });
}

function selectAnswer(event){
    const selectedBtn = event.target
    const correct = selectedBtn.dataset.correct
    var executed = false;
    if (correct && !executed) {
        answerCorrect()      
    } else if (!correct){
        answerIncorrect()
    }
    if (questionBank.length > currentQuestionsIndex + 2){
    nextBtn.classList.remove("hide")
    }

    //  else {
    //     startBtn.innerText = "Record Score"
    // }
}

function resetQuest(){
    // answerBtn.removeChild(button)
    nextBtn.classList.add("hide")
    while (answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }
}
       

function startTimer () {
    timer = setInterval(function(){
        timerCounter--;
        timerEl.textContent = timerCounter
        if (timerCounter === 1){
            secondsEl.textContent = "Second"
        }        
        if (timerCounter > 0) {
            if (isWin && timerCounter > 0){
                clearInterval(timer);
            }
        }
        if (timerCounter === 0){
            // youFailed();
            clearInterval(timer);
        }
    }, 1000);
}


function resetGame() {
    
};

// removes the image from the screen
function removeImg(){
    firePitImg.parentNode.removeChild(firePitImg);
};

function increaseQuestCount() {
    currQuest.textContent = currentQuestionsIndex + 1    
}
// question was correct 
function answerCorrect(){
    var correct = localStorage.getItem("correct")
    correct++ 
    totalCorr.textContent = correct
    localStorage.setItem("correct", correct)
}

// question was incorrect
function answerIncorrect() {
    var incorrect = localStorage.getItem("incorrect")
    incorrect++ 
    totalInCorr.textContent = incorrect
    localStorage.setItem("incorrect", incorrect)
}

// you passed function
function youPassed() {

}
// you failed function
function youFailed () {}
    // can have it so that it runs the no game function which is just an animated game over 

// calling the init function
init();

// listener function to start the quiz
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", ()=> {
    currentQuestionsIndex++
    currentQuestionsIndex.innerText = Number.currentQuestionsIndex
    resetQuest()
    nextQuestion()
    increaseQuestCount()
} )
// resetBtn.addEventListener("click", resetGame); Look up reset type for buttons
