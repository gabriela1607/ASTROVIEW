const carroselContainer = document.querySelector("#carrosel_container");
const estrutura = carroselContainer.querySelector(".estrutura");
const imagens = estrutura.querySelectorAll(".imagem_carrosel");
const setaEsquerda = carroselContainer.querySelector("#SD");
const setaDireita = carroselContainer.querySelector("#SE");

let indexAtual = 0;

function atualizarCarrossel() {
    const larguraImagem = imagens[0].offsetWidth;
    const deslocamento = -indexAtual * larguraImagem;
    estrutura.style.transform = `translateX(${deslocamento}px)`;
}

setaDireita.addEventListener("click", () => {
    if (indexAtual < imagens.length - 1) {
        indexAtual++;
    } else {
        indexAtual = 0; // Volta para o início
    }
    atualizarCarrossel();
});

setaEsquerda.addEventListener("click", () => {
    if (indexAtual > 0) {
        indexAtual--;
    } else {
        indexAtual = imagens.length - 1; // Vai para o final
    }
    atualizarCarrossel();
});

// Inicializa o carrossel na posição do inicial 
atualizarCarrossel();
