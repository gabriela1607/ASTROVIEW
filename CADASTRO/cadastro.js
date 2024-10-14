document.getElementById('cadastro-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = e.target[0].value;
    const email = e.target[1].value;
    const senha = e.target[2].value;

    fetch('http://localhost:3000/api/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
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