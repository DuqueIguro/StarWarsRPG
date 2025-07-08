// Foca no input assim que a página carrega
document.getElementById('passwordInput').focus();

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const feedback = document.getElementById('feedback');

    // A senha é "Kalicore"
    if (input.value.toLowerCase() === 'kalicore') {
        feedback.style.color = '#00FF41';
        feedback.textContent = '> CHAVE VÁLIDA. ACESSO CONCEDIDO. REDIRECIONANDO...';
        setTimeout(() => {
            window.location.href = 'hangar/hangarAutorizado.html';
        }, 1500); // Espera 1.5 segundos antes de redirecionar
    } else {
        feedback.style.color = '#FF4141';
        feedback.textContent = '> ACESSO NEGADO. CHAVE INCORRETA.';
        input.value = ''; // Limpa o campo
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}