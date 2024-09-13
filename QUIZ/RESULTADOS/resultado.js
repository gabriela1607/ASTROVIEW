function showScore() {
    const divPontuacao = document.querySelector("#resul");
    const score = localStorage.getItem("score");

    // Exibe a pontuação no elemento h1
    divPontuacao.innerHTML = `<p>${score}</p>`;
}

// Chama a função para exibir o resultado
showScore();
