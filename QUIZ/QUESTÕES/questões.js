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

// Seleciona a barra de progresso
const barraProgresso = document.getElementById('barra-progresso');

// Defina o número total de perguntas
const totalPerguntas = 10; // Mude este valor para o número de perguntas do seu quiz
let progressoAtual = 0; // Começa com progresso 0

// Função para atualizar o progresso
function atualizarProgresso() {
    // Calcula a porcentagem do progresso
    const porcentagemProgresso = (progressoAtual / totalPerguntas) * 100;
    
    // Atualiza a altura da barra de progresso
    barraProgresso.style.height = `${porcentagemProgresso}%`;
}

// Função para verificar se a resposta está correta e aumentar o progresso
function verificarResposta(correta) {
    if (correta) {
        progressoAtual++; // Aumenta o contador de progresso
        atualizarProgresso(); // Atualiza a barra de progresso
    }
}

// Exemplo de uso: Quando uma pergunta for respondida corretamente, chamar verificarResposta(true)
