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
const formLogin = document.querySelector('.form form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('senha'); // ID é 'senha' no seu HTML

// ------------------------------------------
// 1. Lógica Principal de Login (handleLogin)
// ------------------------------------------

async function handleLogin(event) {
    event.preventDefault(); 
    displayMessage('clear', ''); 

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('ERRO DETALHADO DO SUPABASE:', error);
            displayMessage('error', `Erro ao fazer login: ${error.message}`);
            return;
        }

        if (data.user) {
            displayMessage('success', 'Login realizado com sucesso! Redirecionando...');
            
            // 3. Redireciona o usuário após o login
            setTimeout(() => {
                window.location.href = '../CARROSSEL/index.html'; 
            }, 1500);
            
        }

    } catch (err) {
        console.error('Erro geral no login:', err);
        displayMessage('error', 'Ocorreu um erro inesperado no sistema.');
    }
}

// ------------------------------------------
// 2. Inicialização e Event Listeners
// ------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    if (formLogin) {
        // Adiciona o listener principal
        formLogin.addEventListener('submit', handleLogin);
        
        // Remove a ação de link do botão
        const loginButtonA = formLogin.querySelector('button a');
        if (loginButtonA) {
            loginButtonA.removeAttribute('href');
        }
    }
});
