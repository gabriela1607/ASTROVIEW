// ATENÇÃO: SUBSTITUA ESSES VALORES PELOS SEUS REAIS DO PAINEL SUPABASE!
const SUPABASE_URL = 'https://pmdiqhxtchfxxiboxedn.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZGlxaHh0Y2hmeHhpYm94ZWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NDQ0ODIsImV4cCI6MjA4MTEyMDQ4Mn0.N4Eg598CWjrAO56yA03tDIAgxL6Euss9Nv1vCZtZEh0';

// Inicializa o cliente Supabase usando 'supabaseClient' para evitar conflito com a função global 'supabase'
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const formElement = document.querySelector('.form');
let messageArea = document.getElementById('message-area');

if (!messageArea) {
    messageArea = document.createElement('p');
    messageArea.id = 'message-area';
    formElement.insertBefore(messageArea, formElement.querySelector('form').nextSibling);
}

function displayMessage(type, message) {
    messageArea.textContent = message;
    
    messageArea.style.padding = '10px';
    messageArea.style.marginBottom = '15px';
    messageArea.style.borderRadius = '5px';
    messageArea.style.textAlign = 'center';
    
    if (type === 'error') {
        messageArea.style.backgroundColor = '#fca5a5';
        messageArea.style.color = '#7f1d1d';
    } else if (type === 'success') {
        messageArea.style.backgroundColor = '#a7f3d0';
        messageArea.style.color = '#065f46';
    } else {
        messageArea.textContent = '';
        messageArea.style.backgroundColor = 'transparent';
    }
    
    messageArea.style.display = message ? 'block' : 'none';
}
// ===========================================


// Referências de Elementos do HTML
const formCadastro = document.querySelector('.form form');
const nameInput = document.getElementById('registername');
const sobrenomeInput = document.getElementById('registersobrenome');
const emailInput = document.getElementById('registeremail');
const passwordInput = document.getElementById('registerPassword');
// O campo 'Confirme a senha' não tem ID, então o pegamos pela sua posição
const confirmPasswordInput = document.querySelector('.input-grupo5 input[type="password"]'); 

// ------------------------------------------
// 1. Lógica de Verificação de Sessão (Impede Cadastro se já logado)
// ------------------------------------------

async function checkUserSession() {
    // Tenta obter o usuário logado
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (user) {
        // Se estiver logado, redireciona para a página de conteúdo
        alert('Você já está logado. Redirecionando para o Conteúdo.');
        window.location.href = '../CARROSSEL/index.html';
        return true;
    }
    return false;
}

// ------------------------------------------
// 2. Lógica Principal de Cadastro (handleSignUp)
// ------------------------------------------

async function handleSignUp(event) {
    event.preventDefault(); 
    displayMessage('clear', ''); 

    // Verifica se já está logado
    if (await checkUserSession()) return; 

    const nome = nameInput.value.trim();
    const sobrenome = sobrenomeInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        displayMessage('error', 'As senhas não coincidem. Tente novamente.');
        return;
    }
    
    try {
        const { error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: `${nome} ${sobrenome}`,
                }
            }
        });

        // ----------------------------------------------------
        // LÓGICA DE TRATAMENTO DE ERRO (Usuário Existente)
        // ----------------------------------------------------
        if (error) {
            console.error('ERRO DETALHADO DO SUPABASE:', error);

            // A mensagem exata do Supabase para e-mail existente pode variar
            // O código de status 400 (Bad Request) é comum para esse erro
            if (error.status === 400 && error.message.includes('already registered')) {
                 displayMessage('error', '❌ Este e-mail já está cadastrado. Por favor, faça login.');
            } else if (error.message.includes('already exists')) {
                 displayMessage('error', '❌ Este e-mail já está cadastrado. Por favor, faça login.');
            } 
            else {
                // Outros erros (senha fraca, email inválido, etc.)
                displayMessage('error', `Erro ao cadastrar: ${error.message}`);
            }
            return; // RETORNA AQUI PARA IMPEDIR QUALQUER REDIRECIONAMENTO

        }
        // ----------------------------------------------------

        // SUCESSO: Força o redirecionamento para o login (SÓ SE NÃO HOUVE ERRO)
        displayMessage('success', '✅ Cadastro realizado com sucesso! Você será redirecionado para o Login...');
        
        // Redireciona para a página de Login após 2 segundos
        setTimeout(() => {
            window.location.href = '../LOGIN/login.html'; 
        }, 2000); 

    } catch (err) {
        console.error('Erro geral no cadastro:', err);
        displayMessage('error', 'Ocorreu um erro inesperado no sistema.');
    }
}
// ------------------------------------------
// 3. Inicialização e Event Listeners
// ------------------------------------------

document.addEventListener('DOMContentLoaded', async () => {
    // Se estiver logado, a função checkUserSession já redirecionará.
    if (await checkUserSession()) {
        return; 
    }
    
    if (formCadastro) {
        // Adiciona o listener principal
        formCadastro.addEventListener('submit', handleSignUp);
        
        // Remove a ação de link do botão, pois o JS irá lidar com a submissão
        const cadastrarButtonA = formCadastro.querySelector('button a');
        if (cadastrarButtonA) {
             cadastrarButtonA.removeAttribute('href');
        }
    }
});
