document.getElementById('cadastro-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById("registername").target[0].value;
    const sobrenome = document.getElementById("registersobrenome").target[1].value;
    const email = document.getElementById("registeremail").target[2].value;
    const senha = document.getElementById("registerPassword").target[3].value;

    fetch('http://localhost:3000/api/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome,sobrenome, email, senha })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'Usuário cadastrado com sucesso!') {
            e.target.reset(); 
        }
    })
    .catch(error => console.error('Erro:', error));
});
