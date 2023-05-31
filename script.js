//Create Array containing question number, question, answer and options.

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


// Get All needed Elements from index.html file.

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
let score = document.getElementsByClassName('score')[0];

// Create all Events Listner.
startBtn.addEventListener("click", showRulesBox);
exit.addEventListener("click", backInitialStartBtn);
start.addEventListener("click", startQuiz);
restart.addEventListener("click", restartQuiz);
quit.addEventListener("click", quitQuiz);
next.addEventListener("click", nextQuestion);





/**
 * When you click on Start button,
 * the rules box will apper on the screen.
 */
function showRulesBox() {
    RulesBox.classList.add("visible_rules_box");
}

/**
 * When you click on exit button,
 * you exit the quiz and will be redirected 
 * to the first screen containing the Start button.
 */
function backInitialStartBtn() {
    RulesBox.classList.remove("visible_rules_box");
}

/**
 * When you click on start quiz button,
 * the quiz box screen will appear to start the quiz.
 */
function startQuiz() {
    RulesBox.classList.remove("visible_rules_box");
    quizBox.classList.add("visibleQuizBox");
    appearQuestions(0);
    questionCounter(1);
    timerBegin(29);

}


// Create some  important variables for the next functions.
let questionTime = 30;
let countQuestion = 0;
let questionN = 1;
let counter = 0;
let playerScore = 0;


/**
 * When you click on restart button,
 * you will be redirected to the quiz box screen
 * to restart the quiz.
 */
function restartQuiz() {
    resultBox.classList.remove("visibleResultBox");
    quizBox.classList.add("visibleQuizBox");

    // Back to initial values.
    questionTime = 30;
    countQuestion = 0;
    questionN = 1;
    playerScore = 0;

    appearQuestions(countQuestion);
    questionCounter(questionN);
    clearCounter(counter);
    timerBegin(questionTime);

}

/**
 * When you click on quit button,
 * the app will be reloaded to restart it from beginning. 
 */
function quitQuiz() {
    window.location.reload();
}

/**
 * When you click on next Button,
 * the next question will appear 
 * and you will be able to select an option
 * until the questions are completed.
 * the last next button will redirect you to the result Box.
 */
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
        showResultBox();
    }

}


/**
 * 1. Destoring questions from the array.
 * 2. Adding new span tag inside question.
 * 3. Adding new div tag inside answers_list.
 * 4. Set onclick attribute to all the options.  
 */
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


/**
 * When you click an option:
 * the timer will stop.
 * if you select the correct answer:
 * score will upgrade with 1 and make the selected option color green.
 * else :
 * the selected option color will be red.
 * Once you select an option :
 * all others options will be uncklickable.
 * the next buttob will be cklickable.
 */
function answerSelected(answer) {
    clearInterval(counter);

    let playerAnswer = answer.textContent;
    let correctAnswer = questions[countQuestion].cAnswer;

    if (playerAnswer == correctAnswer) {
        answer.style.color = "#155724";
        answer.style.backgroundColor = "#d4edda";
        answer.style.border = "2px solid #c3e6cb";
        console.log("Oh Yeee! Your answer is CORRECT!");
        playerScore++;
        console.log(playerScore);
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

/**
 * Creating a new span tag to add the question number and total question number.
 */
function questionCounter(i) {

    let QuestionCounTag = '<span><p>' + i + '</p> / <p>' + questions.length + '</p> </span>';
    footerQuestionCounter.innerHTML = QuestionCounTag;
}


/**
 * 
 * Decrement the time value.
 * if timer is less than 0:
 * clear counter and change the 0 number text to Time OFF.
 */
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
            let options = answerList.children.length;
            let i = 0;
            while (i < options) {
                answerList.children[i].classList.add("uncklickable");
                i++;
            }
            next.style.pointerEvents = "auto";

        }
    }

}


/**
 * Show the player Score with a different message deppending on his score. 
 */
function showResultBox() {
    RulesBox.classList.remove("visible_rules_box");
    quizBox.classList.remove("visibleQuizBox");
    resultBox.classList.add("visibleResultBox");
    if (playerScore == 5) {
        score.innerHTML = '<span> Great! , You got ' + playerScore + '  / ' + questions.length + '</span>';
    } else if (playerScore > 3) {
        score.innerHTML = '<span>That\'s good!, You got ' + playerScore + ' / ' + questions.length + '</span>';
    } else if (playerScore > 1) {
        score.innerHTML = '<span>Not bad!, You got ' + playerScore + ' / ' + questions.length + '</span>';
    } else {
        score.innerHTML = '<span>Try again!, You got ' + playerScore + ' / ' + questions.length + '</span>';

    }
}