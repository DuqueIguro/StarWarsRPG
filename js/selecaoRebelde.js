let celulaSelecionada = "";
let bancoSenhas = null;

// Função para o botão voltar no canto superior esquerdo
function voltarParaIndex() {
    window.location.href = "../index.html"; // Retorna para a página principal (ajuste o caminho se necessário)
}

async function carregarBancoSenhas() {
    try {
        const response = await fetch('../data/senhasRebeldes.json');
        if (!response.ok) throw new Error('Falha ao obter chaves criptográficas.');
        bancoSenhas = await response.json();
    } catch (error) {
        console.error('Erro no Holonet:', error);
    }
}

function abrirAutenticacao(idCelula) {
    if (!bancoSenhas) return;
    
    const celulaData = bancoSenhas[idCelula];
    if (!celulaData || !celulaData.ativo) return;

    celulaSelecionada = idCelula;
    document.getElementById('modalTitulo').innerText = `Decodificar: ${celulaData.nome}`;
    document.getElementById('inputSenha').value = "";
    document.getElementById('mensagemErro').innerText = "";
    document.getElementById('modalSenha').style.display = 'flex';
    document.getElementById('inputSenha').focus();
}

function fecharAutenticacao() {
    document.getElementById('modalSenha').style.display = 'none';
    celulaSelecionada = "";
}

function verificarAcesso() {
    const senhaDigitada = document.getElementById('inputSenha').value.trim();
    const erroDiv = document.getElementById('mensagemErro');
    
    if (!celulaSelecionada || !bancoSenhas[celulaSelecionada]) return;
    const dadosCelula = bancoSenhas[celulaSelecionada];

    if (senhaDigitada === dadosCelula.senha) {
        erroDiv.style.color = "#ff6666";
        erroDiv.innerText = "Chave aceita. Estabelecendo conexão estável...";
        
        setTimeout(() => {
            window.location.href = dadosCelula.url;
        }, 1200);
    } else {
        erroDiv.style.color = "#ff3333";
        erroDiv.innerText = "CÓDIGO INVÁLIDO. Alerta de intrusão disparado!";
        const input = document.getElementById('inputSenha');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

document.getElementById('inputSenha')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verificarAcesso();
});

carregarBancoSenhas();