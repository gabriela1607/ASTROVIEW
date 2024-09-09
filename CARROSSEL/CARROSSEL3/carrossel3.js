document.addEventListener('DOMContentLoaded', function() {
    const rightArrow = document.querySelector('.seta-direita img');
    const leftArrow = document.querySelector('.seta-esquerda img');

    if (rightArrow) {
        rightArrow.addEventListener('click', function() {
            window.location.href = "../CARROSSEL4/carrossel4.html";
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener('click', function() {
            window.location.href = "../CARROSSEL2/carrossel2.html"; 
        });
    }
});