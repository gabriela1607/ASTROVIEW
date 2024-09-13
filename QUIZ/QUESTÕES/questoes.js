const questions = [
    {
        question: ") Qual é o planeta mais próximo do sol?",
        answers: [
            {text: "Mercurio", correct: true},
            {text: "Marte", correct: false},
            {text: "Vênus", correct: false}
        ]
    },
    {
        question: ") Qual o planeta mais distante do sol em nosso sistema solar?",
        answers: [
            {text: "Urano", correct: false},
            {text: "Netuno", correct: true},
            {text: "Plutão", correct: false}
        ] 
    },
    {
        question: ") Qual é o único planeta do sistema solar que gira de lado?",
        answers: [
            {text: "Urano", correct: true},
            {text: "Saturno", correct: false},
            {text: "Marte", correct: false}
        ] 
    },
    {
        question: ") Qual o satélite natural do planeta Terra?",
        answers: [
            {text: "Sol", correct: false},
            {text: "Netuno", correct: false},
            {text: "Lua", correct: true}
        ] 
    },
    {
        question: ") O Sistema Solar possui uma estrela principal, qual o nome dela?",
        answers: [
            {text: "Urano", correct: false},
            {text: "Sol", correct: true},
            {text: "Plutão", correct: false}
        ] 
    },
    {
        question: ") Qual foi o ano que o homem pisou na Lua pela primeira vez?",
        answers: [
            {text: "1969", correct: true},
            {text: "1912", correct: false},
            {text: "1964", correct: false}
        ] 
    },
    {
        question: ") Como se chama um aglomerado de estrelas?",
        answers: [
            {text: "Sistema Solar", correct: false},
            {text: "Planetoide", correct: false},
            {text: "Constelação", correct: true}
        ] 
    },
    {
        question: ") Quais são os dois principais componentes do Sol?",
        answers: [
            {text: "Gás Carbônico e Hélio", correct: false},
            {text: "Ferro e Níquel", correct: false},
            {text: "Hidrogênio e Hélio", correct: true}
        ] 
    },
    {
        question: ") O que é um meteorito?",
        answers: [
            {text: "Reflexo da Lua", correct: false},
            {text: "Estrela anã", correct: false},
            {text: "Meteorito", correct: true}
        ] 
    },
    {
        question: ") Qual o nome do centro de um buraco negro de onde a luz é incapaz de sair?",
        answers: [
            {text: "Horizonte de Eventos", correct: true},
            {text: "Centro gravitacional", correct: false},
            {text: "Espaço-tempo", correct: false}
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("myBar");

let currentQuestionIndex = 0;
let score = 0;

function updateProgressBar() {
    // Calcula a porcentagem de progresso
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.height = progressPercent + "%";
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    updateProgressBar(); 
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    localStorage.setItem("score", score);
    window.location.href = "../RESULTADOS/resultado.html";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        updateProgressBar();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

