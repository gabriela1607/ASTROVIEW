// Array com as respostas corretas
const respostasCorretas = [
    "Mercurio", // q1
    "Netuno",   // q2
    "Urano",    // q3
    "Lua",      // q4
    "Sol",      // q5
    "1969",     // q6
    "Constelacao", // q7
    "Hidrogenio e Helio", // q8
    "Meteorito", // q9
    "Horizonte de Eventos" // q10
  ];
  
  function calcularPontuacao() {
    let acertos = 0;
  
    // Percorre as respostas e verifica se estão corretas
    respostasCorretas.forEach((respostaCorreta, index) => {
      const respostaUsuario = document.querySelector(`input[name="question${index + 1}"]:checked`);
      if (respostaUsuario && respostaUsuario.value === respostaCorreta) {
        acertos++;
      }
    });
  
    // Salva a pontuação no localStorage para ser acessada na página de resultados
    localStorage.setItem('pontuacao', acertos);
  }
  
  document.getElementById('finalizar').addEventListener('click', calcularPontuacao);

 
  