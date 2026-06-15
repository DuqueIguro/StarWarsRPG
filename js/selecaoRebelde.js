let celulaSelecionada = "";
let bancoSenhas = null;

async function carregarBancoSenhas() {
    try {
        const response = await fetch('../data/senhasRebeldes.json');
        if (!response.ok) throw new Error('Falha ao obter chaves criptográficas.');
        bancoSenhas = await response.json();
    } catch (error) {
        console.error('Erro no Holonet:', error);
        alert('Erro ao conectar com a rede de dados da Aliança Rebelde.');
    }
}

function abrirAutenticacao(idCelula) {
    if (!bancoSenhas) {
        alert("A rede de dados ainda está sincronizando. Aguarde um instante.");
        return;
    }
    
    const celulaData = bancoSenhas[idCelula];
    
    // Proteção extra via código caso tentem burlar o clique
    if (!celulaData || !celulaData.ativo) {
        alert("Aviso: Este canal de transmissão está fora de alcance ou foi desativado pela Aliança.");
        return;
    }

    celulaSelecionada = idCelula;
    document.getElementById('modalTitulo').innerText = `Autenticar: ${celulaData.nome}`;
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
        erroDiv.style.color = "#00ffcc";
        erroDiv.innerText = "Acesso concedido. Abrindo canal seguro...";
        
        setTimeout(() => {
            window.location.href = dadosCelula.url;
        }, 1200);
    } else {
        erroDiv.style.color = "#ff3333";
        erroDiv.innerText = "CÓDIGO INCORRETO. Varredura imperial detectada!";
        const input = document.getElementById('inputSenha');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

document.getElementById('inputSenha')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verificarAcesso();
});

carregarBancoSenhas();