
    // Seleciona as setas e as imagens
    const setaEsquerda = document.querySelector('.seta-esquerda img');
    const setaDireita = document.querySelector('.seta-direita img');
    const imagens = document.querySelectorAll('.estrutura > div');

    let imagemAtual = 0;

    // Inicializar o carrossel mostrando apenas a primeira imagem
    function inicializarCarrossel() {
        imagens.forEach((img, i) => {
            img.style.display = i === 0 ? 'block' : 'none';
        });
    }

    // Evento para a seta direita
    setaDireita.addEventListener('click', () => {
        imagens[imagemAtual].style.display = 'none';
        imagemAtual = (imagemAtual + 1) % imagens.length;
        imagens[imagemAtual].style.display = 'block';
    });

    // Evento para a seta esquerda
    setaEsquerda.addEventListener('click', () => {
        imagens[imagemAtual].style.display = 'none';
        imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
        imagens[imagemAtual].style.display = 'block';
    });

    // Inicializa o carrossel
    inicializarCarrossel();
