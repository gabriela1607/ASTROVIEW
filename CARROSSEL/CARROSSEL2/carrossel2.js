    // Seleciona as setas e as imagens
    const setaEsquerda = document.querySelector('.seta-esquerda img');
    const setaDireita = document.querySelector('.seta-direita img');
    const imagens = document.querySelectorAll('.estrutura > div');

    let imagemAtual = 0;

    // Função para mostrar a imagem atual
    function mostrarImagem(index) {
        imagens.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    }

    // Evento para a seta direita
    setaDireita.addEventListener('click', () => {
        imagemAtual = (imagemAtual + 1) % imagens.length;
        mostrarImagem(imagemAtual);
    });

    // Evento para a seta esquerda
    setaEsquerda.addEventListener('click', () => {
        imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
        mostrarImagem(imagemAtual);
    });

    // Inicializar o carrossel mostrando apenas a primeira imagem
    mostrarImagem(imagemAtual);

