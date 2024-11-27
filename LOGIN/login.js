const loginForm = document.getElementById("login");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function(event) {
event.preventDefault(); 

const username = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
    if (email === "" || password === "") {
                errorMessage.textContent = "Por favor, preencha todos os campos.";
                return;
            }
    if (username === "admin" && password === "1234") {
     errorMessage.textContent = ""; // Limpa a mensagem de erro
     alert("Login bem-sucedido!");
                // Redirecionar ou realizar outras ações aqui
    } else {
        errorMessage.textContent = "Usuário ou senha inválidos.";
    }

});