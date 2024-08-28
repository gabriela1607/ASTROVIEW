    const setaEsquerda = document.querySelector('.seta-esquerda img');
    const setaDireita = document.querySelector('.seta-direita img');
    const imagens = document.querySelectorAll('.estrutura > div');

    let imagemAtual = 0;

    function mostrarImagem(index) {
        imagens.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    }

    setaDireita.addEventListener('click', () => {
        imagemAtual = (imagemAtual + 1) % imagens.length;
        mostrarImagem(imagemAtual);
    });

    
    setaEsquerda.addEventListener('click', () => {
        imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
        mostrarImagem(imagemAtual);
    });

    mostrarImagem(imagemAtual);

