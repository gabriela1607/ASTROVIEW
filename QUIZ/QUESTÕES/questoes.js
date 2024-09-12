const body = document.querySelector("body");
const assunto = localStorage.getItem("Iniciar");

let quiz = {};
let pontos = 0;
let pergunta = 1;
let resposta = "";
let idInputResposta = "";
let respostaCorretaId = "";

async function buscarPerguntas() {
    const urlDados = "../../data.json";
    
    await fetch(urlDados)
        .then(resposta => resposta.json())
        .then(dados => {
            dados.quizzes.forEach(dado => {
                if (dado.title === Iniciar) {
                    quiz = dado;
                }
            });
        });
}

function montarPergunta() {
    const main = document.querySelector("main");

    main.innerHTML = `
        <section class="pergunta">
        <div  class = "card">
                <div class = "question">
                    <p>Questão ${pergunta} de 10</p>

                    <h2>${alterarSinais(quiz.questions[pergunta-1].question)}</h2>
                </div>
                <div class="barra_progresso">
                    <div style="width: ${pergunta * 10}%"></div>
                </div>
            </section>

            <section class="alternativas">
                <form action="">
                    <label for="alternativa_a">
                        <input type="radio" id="alternativa_a" name="question1" value="${alterarSinais(quiz.questions[pergunta-1].options[0])}">

                        <div>
                            <span>A</span>
                            ${alterarSinais(quiz.questions[pergunta-1].options[0])}
                        </div>
                    </label>

                    <label for="alternativa_b">
                        <input type="radio" id="alternativa_b" name="question1" value="${alterarSinais(quiz.questions[pergunta-1].options[1])}">

                        <div>
                            <span>B</span>
                            ${alterarSinais(quiz.questions[pergunta-1].options[1])}
                        </div>
                    </label>

                    <label for="alternativa_c">
                        <input type="radio" id="alternativa_c" name="question1" value="${alterarSinais(quiz.questions[pergunta-1].options[2])}">

                        <div>
                            <span>C</span>
                            ${alterarSinais(quiz.questions[pergunta-1].options[2])}
                        </div>
                    </label>
                </form>
        </div>

                <button>Próxima</button>
            </section>
    `;
}

function alterarSinais(texto) {
    return texto.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function guardarResposta(evento) {
    resposta = evento.target.value;
    idInputResposta = evento.target.id;
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".alternativas button");

    if (resposta === quiz.questions[pergunta - 1].answer) {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta");
        pontos++;
    } else {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "errada");
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta");
    }

    if (pergunta === 10) {
        botaoEnviar.innerText = "Finalizar";
        botaoEnviar.removeEventListener("click", proximaPergunta);
        botaoEnviar.addEventListener("click", finalizar);
    } else {
        botaoEnviar.innerText = "Próxima";
        botaoEnviar.removeEventListener("click", validarResposta);
        botaoEnviar.addEventListener("click", proximaPergunta);
    }

    pergunta++;
}

function finalizar() {
    localStorage.setItem("pontos", pontos);
    window.location.href = "./RESULTADOS/resultado.html";
}

function proximaPergunta() {
    montarPergunta();
    adicionarEventoInputs();
}

function adicionarEventoInputs() {
    const inputsResposta = document.querySelectorAll(".alternativas input");
    inputsResposta.forEach(input => {
        input.addEventListener("click", guardarResposta);

        if (input.value === quiz.questions[pergunta - 1].answer) {
            respostaCorretaId = input.id;
        }
    });

    const botaoEnviar = document.querySelector(".alternativas button");
    botaoEnviar.addEventListener("click", validarResposta);
}

async function iniciar() {
    await buscarPerguntas();
    montarPergunta();
    adicionarEventoInputs();
}

iniciar();
