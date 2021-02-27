var startBtn = document.querySelector(".start-btn");
var resetBtn = document.querySelector(".reset-btn");
var nextBtn = document.querySelector(".next-btn");
var answerBtn = document.querySelector(".questionoptions")
var doneBtn = document.querySelector(".done-btn")
var saveBtn = document.querySelector(".save-btn")
var restartBtn = document.querySelector(".restart-btn")
var inputName = document.querySelector("#inputname")

var firePitImg = document.querySelector(".firepit")

var questionEl = document.querySelector(".question");
var questionBox = document.querySelector(".questionbox");
var questionOptions = document.querySelector(".questionoptions");
var saveBox = document.querySelector(".savebox");
var nameBoard = document.querySelector(".nameboard");
var restartBox = document.querySelector(".restartbox");


var timerEl = document.querySelector(".timer");
var secondsEl = document.querySelector(".seconds");

var questionsLeftEL = document.querySelector(".questionsleft");
var correctEl = document.querySelector(".goodscore");
var incorrectEl = document.querySelector(".badscore");

var currQuest = document.querySelector(".currquest")
var totalQuest = document.querySelector(".totalquest")
var totalCorr = document.querySelector(".goodscore")

var currentQuestionsIndex = 0
var timer; 
var timerCounter;
var startingTime = 90
var savedReco = [];


// question bank
var questionBank = [
    {
        question: "When was the First Crusade?",
        answers: [
            { text:"1095 BCE", correct: false },
            { text:"1095 CE", correct: true },
            { text:"2020 #theworstyear", correct: false },
            { text:"What are the Crusades?", correct: false },
        ], 
    },

    {
        question: "Which Crusade was successful in retaking the Holy Land?",
        answers: [
            { text:"The Children's Crusade", correct: false },
            { text:"The Third Crusade", correct: false },
            { text:"The First Crusade", correct: true },
            { text:"That one with Orlando Bloom", correct: false },
        ] 
    },
    {
        question: "Which of the following did Richard III of Enlgand do that no one had done to take his army to the Holy Land?",
        answers: [
            { text:"He walked like a G", correct: false },
            { text:"He took the train", correct: false },
            { text:"He used Boats", correct: true },
            { text:"He teleported", correct: false },
        ]
    },
    {
        question: 'The rivalry between Richard III and Salah ad-Din can be described as "____" ?',
        answers: [
            { text:"Besties", correct: false },
            { text:"Mutual Respect", correct: true },
            { text:"Absolute Hatred", correct: false },
            { text:"They wrote eachother love letters", correct: false },
        ]
    }
]


function init() { 
    totalQuest.innerText = questionBank.length
    totalCorr.innerText = 0
    timerEl.innerText = 999
  };

function startGame() { 
    isWin = false;
    timerCounter = startingTime;
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
    document.querySelectorAll(".answer-btn").forEach(function (element) {
        element.setAttribute("disabled", true)
    })
    const selectedBtn = event.target
    const correct = selectedBtn.dataset.correct
    var executed = false;
    if (correct && !executed) {
        answerCorrect()      
    } else if (!correct){
        // answerIncorrect()
        clearInterval(timer)
        timerCounter = timerCounter - 4
        startTimer()
    }
    if (questionBank.length > currentQuestionsIndex + 1){
        nextBtn.classList.remove("hide")
    } else {
        doneBtn.classList.remove("hide")
    }
}

function resetQuest(){
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
        } else {
            youFailed();
            clearInterval(timer);
            document.querySelectorAll(".answer-btn").forEach(function (element) {
                element.setAttribute("disabled", true)
            })
        }
    }, 1000);
}

function youFailed() {
    restartBox.classList.remove("hide")
}

function removeImg(){
    firePitImg.classList.add("hide");
};

function increaseQuestCount() {
    currQuest.textContent = currentQuestionsIndex + 1    
}

function answerCorrect(){
    var correct = localStorage.getItem("correct")
    correct++ 
    totalCorr.textContent = correct
    var num = Number(null)
    document.writeln
    if (totalCorr === num){
        totalCorr.innerText = 0
    }
    localStorage.setItem("correct", correct)
}

function gameDone() {  
    clearInterval(timer)
    saveBox.classList.remove("hide")
}

function storeScore() {
    localStorage.setItem("Names", JSON.stringify(savedReco))
}

function displaynames() {
    nameBoard.innerHTML = "";
    for (var i = 0; i < savedReco.length; i++){
        var newlist = savedReco[i];
        var p = document.createElement("p")
        p.innerText = newlist
        p.setAttribute("data-index", i)
        nameBoard.appendChild(p)
    }
}

function resetGame() {
    clearInterval(timer)
    resetQuest()
    firePitImg.parentNode.appendChild(firePitImg);
    totalQuest.innerText = questionBank.length;
    totalCorr.innerText = 0;
    firePitImg.classList.remove("hide")
    startBtn.classList.remove("hide")
    currentQuestionsIndex = 0
    questionEl.innerText = "Please answer the questions to the best of your ability! Good Luck!"
    currQuest.innerText = 1
    timerEl.innerText = 90
    doneBtn.classList.add("hide")
    saveBox.classList.add("hide")
    restartBox.classList.add("hide")
};

init();


startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", ()=> {
    currentQuestionsIndex++
    currentQuestionsIndex.innerText = Number.currentQuestionsIndex
    resetQuest()
    nextQuestion()
    increaseQuestCount()
})
resetBtn.addEventListener("click", resetGame); 
restartBtn.addEventListener("click", resetGame); 
doneBtn.addEventListener("click", gameDone);
saveBtn.addEventListener("click", function (event) {
    var correct = localStorage.getItem("correct")
    event.preventDefault();
    var savedNames = inputName.value.trim();
    if ( correct ){
        savedReco.push(savedNames + " " + correct + "/" + questionBank.length);
    } else if ( correct === null){
        savedReco.push(savedNames + " " + 0 + "/" + questionBank.length)
    }
    inputName.value =""
    storeScore()
    displaynames()
    resetGame()
});
