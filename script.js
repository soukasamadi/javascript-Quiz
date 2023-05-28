//questions, answers and options Array 

let questions = [
    {
        number: 1,
        question: "Inside which HTML element do we put the JavaScript?",
        answer: "<script>",
        options: [
            "<js>>",
            "<scripting>",
            "<Head>",
            "<script>"
        ]
    },
    {
        number: 2,
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answer: "<script src='xxx.js'>",
        options: [
            "<script href='xxx.js'>",
            "<script name='xxx.js'>",
            "<script src='xxx.js'>",
            "<script type='xxx.js'>"
        ]
    },
    {
        number: 3,
        question: "How do you write 'Hello World' in an alert box?",
        answer: "alert('Hello World!')",
        options: [
            "alert('Hello World!')",
            "alertBox('Hello World!')",
            "print('Hello World!')",
            "msgBox('Hello World!')"
        ]
    },
    {
        number: 4,
        question: "How do you create a function in JavaScript?",
        answer: "function myFunction()",
        options: [
            "function:myFunction()",
            "function myFunction()",
            "function = myFunction()",
            "function == myFunction()"
        ]
    },
    {
        number: 5,
        question: "How to write an IF statement in JavaScript?",
        answer: "if (i == 5){}",
        options: [
            "if i = 5",
            "if i = 5 then",
            "if i == 5 then",
            "if (i == 5){}"
        ]
    },

];

// get All Elements from index.html file

let startButton = document.getElementsByClassName('start_button')[0];
let RulesBox = document.getElementsByClassName('Rules_box')[0];
let exit = RulesBox.getElementsByClassName('exit')[0];
let next = RulesBox.getElementsByClassName('start')[0];
let quizBox = document.querySelector(".quiz_box");
let answerList = document.getElementsByClassName('answers_list')[0];
let resultBox = document.getElementsByClassName('result_box')[0];
let timeDescount = document.getElementsByClassName("timer timer_sec")[0];
let restart = resultBox.getElementsByClassName('restart')[0];
const quitQuiz = resultBox.getElementsByClassName('quit')[0];

startButton.addEventListener("click", showRulesBox);
exit.addEventListener("click", backInitialStartBtn);
next.addEventListener("click", startQuiz);



function showRulesBox() {
    RulesBox.classList.add("visible_rules_box");
}
function backInitialStartBtn() {
    RulesBox.classList.remove("visible_rules_box");
}


function startQuiz() {
    RulesBox.classList.remove("visible_rules_box");
    quizBox.style.opacity = "1";
    quizBox.style.pointerEvents = "auto";
    appearQuestions(0);
    startTimer(30);
    questionCounter(1);


}

//destoring question from the array
function appearQuestions(i) {
    let questions = document.getElementsByClassName('question')[0];
    
}
