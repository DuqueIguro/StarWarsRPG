import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eziyaqhrkfvjjyzeegqt.supabase.co';
const supabaseKey = 'sb_publishable_P_C9Fhvg4z1E3OpQC7_VwQ_SwSK12wj';
const supabase = createClient(supabaseUrl, supabaseKey);

let bancoSenhas = {};
let celulaSelecionada = "";


// Função para o botão voltar no canto superior esquerdo
function voltarParaIndex() {
    window.location.href = "../index.html"; // Retorna para a página principal (ajuste o caminho se necessário)
}

/* INICIO DE FUNÇÃO DE [carregarBancoSenhas]; esta função faz [a busca exclusiva dos módulos ativos no banco de dados e mapeamento para a estrutura de navegação da interface] */
async function carregarBancoSenhas() {
    try {
        const { data, error } = await supabase
            .from('system_access')
            .select('key_name, display_name, is_active')
            .eq('is_active', true);

        if (error) throw new Error('Falha ao obter chaves criptográficas no Supabase.');

        bancoSenhas = {};
        data.forEach(item => {
            bancoSenhas[item.key_name] = {
                nome: item.display_name,
                ativo: item.is_active
            };
        });
        
        console.log("Dados recebidos do banco:", bancoSenhas);
        
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

/* INICIO DE FUNÇÃO DE [verificarAcesso]; esta função faz [a validação remota da senha enviada através de uma query direta ao Supabase, recebendo a URL de redirecionamento em caso de correspondência exata] */
async function verificarAcesso() {
    const senhaDigitada = document.getElementById('inputSenha').value.trim();
    const erroDiv = document.getElementById('mensagemErro');
    
    if (!celulaSelecionada) return;

    const { data, error } = await supabase
        .from('system_access')
        .select('redirect_url')
        .eq('key_name', celulaSelecionada)
        .eq('password', senhaDigitada)
        .eq('is_active', true)
        .single();

    if (data) {
        erroDiv.style.color = "#ff6666";
        erroDiv.innerText = "Chave aceita. Estabelecendo conexão estável...";
        
        setTimeout(() => {
            window.location.href = data.redirect_url;
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



window.abrirAutenticacao = abrirAutenticacao;
window.fecharAutenticacao = fecharAutenticacao;
window.verificarAcesso = verificarAcesso;