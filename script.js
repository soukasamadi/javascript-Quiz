//questions, answers and options Array 

let questions = [
    {
        number: 1,
        question: "How do you write 'Hello World' in an alert box?",
        cAnswer: "alert('Hello World!')",
        optionA: "alert('Hello World!')",
        optionB: "alertt('Hello World!')",
        optionC: "print('Hello World!')",
        optionD: "msgBox('Hello World!')"

    },
    {
        number: 2,
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        cAnswer: "if (i != 5)",
        optionA: "if (i <> 5)",
        optionB: "if i =! 5 then",
        optionC: "if (i != 5)",
        optionD: "if i <> 5"

    },
    {
        number: 3,
        question: "How does a FOR loop start?",
        cAnswer: "for(i = 0; i<= 5; i++)",
        optionA: "for i = 5 to 10",
        optionB: "for(i = 0; i<= 5; i++)",
        optionC: "for(i<= 5; i++)",
        optionD: "for(i = 0; i<= 5)"

    },
    {
        number: 4,
        question: "How do you create a function in JavaScript?",
        cAnswer: "function myFunction()",
        optionA: "function:myFunction()",
        optionB: "function myFunction()",
        optionC: "function = myFunction()",
        optionD: "function == myFunction()"

    },
    {
        number: 5,
        question: "How to write an IF statement in JavaScript?",
        cAnswer: "if (i == 5){}",
        optionA: "if i = 5",
        optionB: "if i = 5 then",
        optionC: "if i == 5 then",
        optionD: "if (i == 5){}"

    },

];


// get All needed Elements from index.html file

let startBtn = document.getElementsByClassName('start_button')[0];
let RulesBox = document.getElementsByClassName('Rules_box')[0];
let exit = RulesBox.getElementsByClassName('exit')[0];
let start = RulesBox.getElementsByClassName('start')[0];
let quizBox = document.getElementsByClassName('quiz_box')[0];
let questionArea = document.getElementsByClassName('question')[0];
let answerList = document.getElementsByClassName('answers_list')[0];
let resultBox = document.getElementsByClassName('result_box')[0];
let timeDescount = document.getElementsByClassName('timer_sec')[0];
let restart = resultBox.getElementsByClassName('restart')[0];
let quit = resultBox.getElementsByClassName('quit')[0];
let next = document.getElementsByClassName('next_question')[0];
let footerQuestionCounter = document.getElementsByClassName('total_question')[0];
let headertimer = document.getElementsByClassName('timer')[0];

// Create all Events Listner
startBtn.addEventListener("click", showRulesBox);    //strat Quiz Button
exit.addEventListener("click", backInitialStartBtn); //exit Button  
start.addEventListener("click", startQuiz);         //start Button
//restart.addEventListener("click", restartQuiz);    //restart Button
quit.addEventListener("click", quitQuiz);         //quit Quiz Button
next.addEventListener("click", nextQuestion);    //next Button





// strat Quiz Button
function showRulesBox() {
    RulesBox.classList.add("visible_rules_box");
}
//Exit Button
function backInitialStartBtn() {
    RulesBox.classList.remove("visible_rules_box");
}

// start Button
function startQuiz() {
    RulesBox.classList.remove("visible_rules_box");
    quizBox.classList.add("visibleQuizBox");
    appearQuestions(0);
    questionCounter(1);
    timerBegin(30);

}


// create some  important variables
let questionTime = 30;  // timeValue
let countQuestion = 0; // countQuestion
let questionN = 1;    // questionN
let playerScore = 0; //playerScore
let counter = 0;    // counter

// restart Button
function restartQuiz() {
    quizBox.classList.add("visibleQuizBox");
    resultBox.classList.remove("visibleResultBox");

    questionTime = 30;
    countQuestion = 0;
    questionN = 1;
    playerScore = 0;

    appearQuestions(countQuestion);
    questionCounter(questionN);
    clearCounter(counter);
    timerBegin(questionTime);

    //next.classList.remove("show_btn"); 
}

//quit Quiz Button
function quitQuiz() {
    window.location.reload();
}

//next Button
function nextQuestion() {
    if (countQuestion < questions.length - 1) {
        countQuestion++;
        questionN++;
        appearQuestions(countQuestion);
        questionCounter(questionN);
        clearInterval(counter);
        timerBegin(questionTime);
        next.style.pointerEvents = "none";
    } else {
        clearInterval(counter);
        showResult();
    }

}


//destoring questions from the array
function appearQuestions(x) {

    //insert Html (question + options) content 
    let questionHtml = '<span>' + questions[x].number + ". " + questions[x].question + '</span>';

    questionArea.innerHTML = questionHtml;

    let optionHtml = '<div class="answer"><span>' + questions[x].optionA + '</span></div>'
        + '<div class="answer"><span>' + questions[x].optionB + '</span></div>'
        + '<div class="answer"><span>' + questions[x].optionC + '</span></div>'
        + '<div class="answer"><span>' + questions[x].optionD + '</span></div>';

    answerList.innerHTML = optionHtml;



    let answerr = answerList.querySelectorAll('.answer');
    for (let i = 0; i < answerr.length; i++) {
        answerr[i].setAttribute("onclick", "answerSelected(this)");
    }
}



function answerSelected(answer) {
    clearInterval(counter);

    let playerAnswer = answer.textContent;
    let correctAnswer = questions[countQuestion].cAnswer;

    if (playerAnswer == correctAnswer) {
        answer.style.color = "#155724";
        answer.style.backgroundColor = "#d4edda";
        answer.style.border = "2px solid #c3e6cb";
        console.log("Oh Yeee! Your answer is CORRECT!");
    } else {
        answer.style.color = "#721c24";
        answer.style.backgroundColor = "#f8d7da";
        answer.style.border = "2px solid #f5c6cb";
        console.log("Ooops! Your answer is WRONG!");

    }

    let options = answerList.children.length;
    let i = 0;
    while (i < options) {
        answerList.children[i].classList.add("uncklickable");
        i++;
    }
    next.style.pointerEvents = "auto";
}


function questionCounter(i) {

    let QuestionCounTag = '<span><p>' + i + '</p> / <p>' + questions.length + '</p> </span>';
    footerQuestionCounter.innerHTML = QuestionCounTag;
}

function timerBegin(time) {

    counter = setInterval(timer, 1000);
    function timer() {
        timeDescount.textContent = time;
        timeDescount.style.fontSize = "large";
        timeDescount.style.color = "#ed4516";
        headertimer.style.width = "75px";
        time--;
        if (time < 0) {
            clearInterval(counter);
            timeDescount.textContent = "Time OFF";
            timeDescount.style.fontSize = "medium";
            timeDescount.style.color = "black";
            headertimer.style.width = "120px";

        }
    }

}
