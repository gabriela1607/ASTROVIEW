// Seleciona as setas
const setaEsquerda = document.querySelector('.seta-esquerda img');
const setaDireita = document.querySelector('.seta-direita img');

// Função para redirecionar para a página anterior
setaEsquerda.addEventListener('click', () => {
    window.location.href = './CARROSSEL/carrossel.html'; // URL da página anterior
});

// Função para redirecionar para a próxima página
setaDireita.addEventListener('click', () => {
    window.location.href = './CARROSSEL3/carrossel3.html'; // URL da próxima página
});
