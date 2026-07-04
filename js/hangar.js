import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://eziyaqhrkfvjjyzeegqt.supabase.co';
const supabaseKey = 'sb_publishable_P_C9Fhvg4z1E3OpQC7_VwQ_SwSK12wj';
const supabase = createClient(supabaseUrl, supabaseKey);

const CHAVE_TERMINAL = 'hangar';
const TABELA = 'storage_access';

// Foca no input assim que a página carrega
document.getElementById('passwordInput').focus();

/* INICIO DE FUNÇÃO DE [checkPassword]; esta função faz [a validação remota da senha enviada através de uma query direta ao Supabase, recebendo a URL de redirecionamento em caso de correspondência exata] */
async function checkPassword() {
    const input = document.getElementById('passwordInput');
    const feedback = document.getElementById('feedback');
    const inputPassword = input.value;

    feedback.style.color = '#FFFFFF';
    feedback.textContent = '> SINCRONIZANDO CREDENCIAIS...';

    const { data, error } = await supabase
        .from(TABELA)
        .select('redirect_url')
        .eq('key_name', CHAVE_TERMINAL)
        .eq('password', inputPassword)
        .single();

    if (data) {
        feedback.style.color = '#00FF41';
        feedback.textContent = '> CHAVE VÁLIDA. ACESSO CONCEDIDO. REDIRECIONANDO...';
        setTimeout(() => {
            window.location.href = data.redirect_url;
        }, 500); // Espera 0.5 segundos antes de redirecionar
    } else {
        feedback.style.color = '#FF4141';
        feedback.textContent = '> ACESSO NEGADO. CHAVE INCORRETA.';
        input.value = ''; // Limpa o campo
        input.focus();
    }
}

/* INICIO DE FUNÇÃO DE [handleKeyPress]; esta função faz [a intercepção da tecla Enter para submeter a tentativa de senha] */
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}

/* INICIO DE FUNÇÃO DE [Exposição Global]; esta função faz [a vinculação das funções ao escopo global para que os eventos inline do HTML (como onclick ou onkeypress) possam acessá-las após a conversão do script para um módulo isolado] */
window.checkPassword = checkPassword;
window.handleKeyPress = handleKeyPress;