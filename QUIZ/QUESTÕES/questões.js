const perguntas = [
    {
        pergunta: "1) Qual é o planeta mais próximo do sol?",
        resposta: [
            "Mercurio",
            "Marte",
            "Venus"
        ]
    },
    {
        pergunta: "2) Qual o planeta mais distante do sol em nosso sistema solar?",
        resposta: [
            "Urano",
            "Netuno",
            "Plutao"
        ],
    },
    {
        pergunta: "3) Qual é o único planeta do sistema solar que gira de lado?",
        resposta: [
            "Urano",
            "Saturno",
            "Marte"
        ]
    },
    {
        pergunta: "4) Qual o satélite natural do planeta Terra?",
        resposta: [
            "Sol",
            "Netuno",
            "Lua"
        ]
    },
    {
        pergunta: "5) O Sistema Solar possui uma estrela principal, qual o nome dela?",
        resposta: [
            "UraLuano",
            "Sol",
            "Plutao"
        ]
    },
    {
        pergunta: "6) Qual foi o ano que o homem pisou na Lua pela primeira vez?",
        resposta: [
            "1969",
            "1912",
            "1964"
        ]
    },
    {
        pergunta: "7) Como se chama um aglomerado de estrelas?",
        resposta: [
            "Sistema Solar",
            "Planetoide",
            "Constelação"
        ]
    },
    {
        pergunta: "8) Qual são os dois principais componentes do Sol?",
        resposta: [
            "Gas Carbonico e Helio",
            "Ferro e Níquel",
            "Hidrogenio e Helio"
        ]
    },
    {
        "pergunta": "9) O que é uma estrela cadente?",
        "resposta": [
            "Reflexo da Lua",
            "Estrela anã",
            "Meteorito"
        ]
    },
    {
        "pergunta": "10 ) Qual o nome do centro de um buraco negro de onde a luz é incapaz de sair?",
        "resposta": [
            "Horizonte de Eventos",
            "Centro gravitacional",
            "Espaço tempo"
        ]
    }
]

let c = 0
const section = document.querySelector("section")

console.log(perguntas.length)

function montarPergunta () {
    while (c < perguntas.length) {
        section.innerHTML += `
        <div class="card">
                <div class="question">
                    <h4>${perguntas[c] .pergunta}</h4>
                </div>
    
                <ul>
                    <li>
                        <label>
                            <input type="radio" name="question1" value="Mercurio" id="correta"> ${perguntas[c] .resposta[0]}
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" name="question1" value="Marte" id="errada"> ${perguntas[c] .resposta[1]}
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" name="question1" value="Venus" id="errada"> ${perguntas[c] .resposta[2]}
                        </label>
                    </li>
                </ul>
                <a href="">next > </a>
            </div>
            <div class="navigation">
                <a href="../OPÇÃO_SAIR/opção.html">voltar</a>
                <a href="../OPÇÃO_SAIR/opção.html">sair</a>
            </div>
            <div class="borda">
                <div class="progresso"></div>
            </div>
        `
    }
}



function guardarResposta(evento) {
    resposta = evento.target.value
    idInputResposta = evento.target.id

    const botaoEnviar = document.querySelector(".alternativas button")
    botaoEnviar.addEventListener("click", validarResposta)
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".alternativas button")
    botaoEnviar.innerText = "Proxima"
    botaoEnviar.removeEventListener("click", validarResposta)

    if (pergunta === 10) {
        botaoEnviar.innerText = "Finalizar"
        botaoEnviar.addEventListener("click", finalizar)
    } else {
        botaoEnviar.addEventListener("click", proximaPergunta)
    }

    if (resposta === quiz.questions[pergunta - 1].answer) {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta")
        pontos = pontos + 1
    } else {
        document.querySelector(`label[for = '${idInputResposta}']`).setAttribute("id", "errada")
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta")
    }

    pergunta = pergunta + 1
    console.log(pergunta)
}

function finalizar() {
    localStorage.setItem("pontos", pontos)

    window.location.href = "../resultado/resultado.html"
}

function proximaPergunta() {
    montarPergunta()
    adicionarEventoInputs()
}

function adicionarEventoInputs() {
    const inputsResposta = document.querySelectorAll(".alternativas input")
    inputsResposta.forEach(input => {
        input.addEventListener("click", guardarResposta)

        if (input.value === quiz.questions[pergunta - 1].answer) {
            respostaCorretaId = input.id
        }
    })
}
async function iniciar() {
    await
    montarPergunta()
    adicionarEventoInputs()
}

iniciar()

document.addEventListener('DOMContentLoaded', () => {
    const correctAnswers = {
        question1: 'Mercurio',
        question2: 'Netuno',
        question3: 'Urano',
        question4: 'Lua',
        question5: 'Sol',
        question6: '1969',
        question7: 'Constelacao',
        question8: 'Hidrogenio e Helio',
        question9: 'Meteorito',
        question10: 'Horizonte de Eventos'
    };

    function updateAnswerStyles() {
        const questions = document.querySelectorAll('.card');
        
        questions.forEach(card => {
            const questionId = card.id;
            const correctAnswer = correctAnswers[`question${questionId.replace('q', '')}`];
            
            const inputs = card.querySelectorAll('input[type="radio"]');
            inputs.forEach(input => {
                const label = input.parentElement;
                
                if (input.checked) {
                    if (input.value === correctAnswer) {
                        label.style.color = 'green';  
                        label.querySelector('input').style.backgroundColor = 'green'; 
                    } else {
                        label.style.color = 'red';  
                        label.querySelector('input').style.backgroundColor = 'red';
                    }
                } else {
                   
                    label.style.color = '';
                    label.querySelector('input').style.backgroundColor = '';
                }
            });
        });
    }

    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', updateAnswerStyles);
    });


    updateAnswerStyles();
});

document.addEventListener("DOMContentLoaded", function() {
    document.body.style.backgroundAttachment = "fixed";
});

//barra de progresso
const barraProgresso = document.getElementById('barra-progresso');
const totalPerguntas = 10;
let progressoAtual = 0;

function atualizarProgresso() {
    const porcentagemProgresso = (progressoAtual / totalPerguntas) * 100;
    barraProgresso.style.height = `${porcentagemProgresso}%`;
}

function verificarResposta(correta) {
    if (correta) {
        progressoAtual++;
        atualizarProgresso();
    }
}
