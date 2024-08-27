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