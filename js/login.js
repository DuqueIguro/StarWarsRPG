/* ---------------- Clock ---------------- */
(function () {
    const el = document.getElementById('clock');
    function tick() {
        const n = new Date();
        el.textContent = String(n.getHours()).padStart(2, '0') + ':' +
            String(n.getMinutes()).padStart(2, '0') + ':' +
            String(n.getSeconds()).padStart(2, '0');
    }
    tick(); setInterval(tick, 1000);
})();

/* ---------------- Starfield ---------------- */
(function () {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    let stars = [];
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        const count = Math.floor((canvas.width * canvas.height) / 6000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.4 + 0.2,
                speed: Math.random() * 0.25 + 0.03,
                twinkle: Math.random() * Math.PI * 2,
                color: Math.random() < 0.15 ? '217,83,79' : (Math.random() < 0.5 ? '0,170,255' : '255,255,255')
            });
        }
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of stars) {
            s.twinkle += 0.02;
            const alpha = 0.4 + Math.sin(s.twinkle) * 0.4;
            ctx.beginPath();
            ctx.fillStyle = `rgba(${s.color},${Math.max(0, alpha)})`;
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
            s.y += s.speed;
            if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        }
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize(); draw();
})();

/* ---------------- Boot typing line ---------------- */
(function () {
    const el = document.getElementById('bootLine');
    const msgs = [
        '> Sincronizando com a HoloNet...',
        '> Verificando assinatura biométrica...',
        '> Conexão segura estabelecida com o servidor CORELLIAN v5.0',
        '> Aguardando credenciais do usuário...'
    ];
    let mIdx = 0, cIdx = 0;
    function typeStep() {
        const msg = msgs[mIdx];
        if (cIdx <= msg.length) {
            el.innerHTML = msg.slice(0, cIdx) + '<span class="cursor-blink">_</span>';
            cIdx++;
            setTimeout(typeStep, 28);
        } else {
            setTimeout(() => {
                cIdx = 0;
                mIdx = (mIdx + 1) % msgs.length;
                typeStep();
            }, 2000);
        }
    }
    typeStep();
})();

/* ---------------- Random title glitch ---------------- */
(function () {
    const title = document.getElementById('gateTitle');
    function trigger() {
        title.classList.add('glitching');
        setTimeout(() => title.classList.remove('glitching'), 220);
        setTimeout(trigger, 3500 + Math.random() * 5000);
    }
    setTimeout(trigger, 2500);
})();

/* ---------------- Input focus glow ---------------- */
(function () {
    const pairs = [['userInput', 'userWrap'], ['passInput', 'passWrap']];
    pairs.forEach(([inputId, wrapId]) => {
        const input = document.getElementById(inputId);
        const wrap = document.getElementById(wrapId);
        input.addEventListener('focus', () => wrap.classList.add('focused'));
        input.addEventListener('blur', () => wrap.classList.remove('focused'));
    });
})();

/* ---------------- Mini log stream ---------------- */
function logLine(text, cls) {
    const log = document.getElementById('miniLog');
    const p = document.createElement('p');
    if (cls) p.className = cls;
    p.textContent = text;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
    while (log.children.length > 5) log.removeChild(log.firstChild);
}
logLine('> Conexão estabelecida com o servidor CORELLIAN v5.0');
logLine('> Terminal pronto. Insira suas credenciais.', 'ok-log');

/* ---------------- Forgot password easter egg ---------------- */
document.getElementById('forgotLink').addEventListener('click', (e) => {
    e.preventDefault();
    logLine('> ALERTA: Contate o Mestre da Campanha diretamente.', 'warn-log');
    const fb = document.getElementById('gateFeedback');
    fb.className = 'gate-feedback info';
    fb.textContent = 'Recuperação indisponível. Fale com o Mestre da Campanha.';
});

/* ---------------- Integração Supabase e Lógica de Terminal ---------------- */
const form = document.getElementById('gateForm');
const panel = document.getElementById('gatePanel');
const btn = document.getElementById('gateBtn');
const btnReg = document.getElementById('regBtn'); // Novo botão
const feedback = document.getElementById('gateFeedback');
const progressWrap = document.getElementById('authProgress');
const progressBar = document.getElementById('authBar');
const successCheck = document.getElementById('successCheck');
const userInput = document.getElementById('userInput');
const passInput = document.getElementById('passInput');
const newPassField = document.getElementById('newPassField');
const newPassInput = document.getElementById('newPassInput');
const newPassWrap = document.getElementById('newPassWrap');
let modoTrocaSenha = false;

// 1. Verificação de sessão (redireciona se já estiver logado)
async function verificarSessaoAtiva() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        logLine('> Sessão ativa detectada. Redirecionando...', 'ok-log');
        setTimeout(() => { window.location.href = './menu.html'; }, 800);
    }
}
verificarSessaoAtiva();

function setFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = 'gate-feedback ' + (type || '');
}

function setPanelState(state) {
    panel.classList.remove('erro', 'sucesso');
    if (state) panel.classList.add(state);
}

// Função compartilhada para sucesso visual
function animacaoSucesso(email) {
    logLine('> Assinatura validada no banco de dados.', 'ok-log');
    setFeedback('Acesso concedido. Bem-vindo(a), ' + email.split('@')[0] + '.', 'ok');
    setPanelState('sucesso');
    successCheck.classList.add('show');
    form.classList.add('hidden-block');

    setTimeout(() => {
        window.location.href = './menu.html';
    }, 1600);
}

// Função compartilhada para iniciar carregamento visual
function iniciarCarregamento(mensagem) {
    btn.disabled = true;
    btnReg.disabled = true;
    userInput.disabled = true;
    passInput.disabled = true;
    setFeedback(mensagem, 'info');
    logLine('> Transmitindo pacote para o núcleo CORELLIAN...');

    progressWrap.classList.add('show');
    progressBar.style.width = '0%';
    requestAnimationFrame(() => { progressBar.style.width = '100%'; });
}

// Função compartilhada para falhas
function resetarCarregamento() {
    btn.disabled = false;
    btnReg.disabled = false;
    userInput.disabled = false;
    passInput.disabled = false;
    progressWrap.classList.remove('show');
    progressBar.style.width = '0%';
}

newPassInput.addEventListener('focus', () => newPassWrap.classList.add('focused'));
newPassInput.addEventListener('blur', () => newPassWrap.classList.remove('focused'));

btnReg.textContent = 'Trocar Senha';

// 2. Lógica de Login e Cancelar Troca
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (modoTrocaSenha) {
        // Se o formulário for submetido no modo de troca, o botão principal funciona como "Cancelar"
        modoTrocaSenha = false;
        newPassField.classList.add('hidden-block');
        btnReg.textContent = "Trocar Senha";
        btn.textContent = "Acessar";
        btnReg.style.borderColor = "var(--imp-red)";
        btnReg.style.color = "var(--imp-red)";
        newPassInput.value = "";
        setFeedback('Reconfiguração cancelada.', 'info');
        logLine('> Modo de troca abortado.', 'warn-log');
        return;
    }

    const email = userInput.value.trim();
    const pass = passInput.value.trim();

    if (!email || !pass) {
        setPanelState('erro');
        setTimeout(() => setPanelState(null), 400);
        setFeedback('Preencha identificação e senha.', 'erro');
        logLine('> FALHA: parâmetros vazios.', 'warn-log');
        return;
    }

    iniciarCarregamento('Verificando credenciais no sistema...');

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: pass });

    if (error) {
        setPanelState('erro');
        setTimeout(() => setPanelState(null), 400);
        setFeedback('Credenciais rejeitadas pelo sistema.', 'erro');
        logLine('> ERRO: ' + error.message, 'warn-log');
        resetarCarregamento();
    } else {
        animacaoSucesso(email);
    }
});

// 3. Lógica de Trocar Senha
btnReg.addEventListener('click', async function () {
    if (!modoTrocaSenha) {
        // Altera a interface para o modo de troca
        modoTrocaSenha = true;
        newPassField.classList.remove('hidden-block');
        btnReg.textContent = "Confirmar Troca";
        btn.textContent = "Cancelar";
        btnReg.style.borderColor = "var(--tech-cyan)";
        btnReg.style.color = "var(--tech-cyan)";
        setFeedback('Insira a credencial atual e a nova senha.', 'info');
        logLine('> Modo de reconfiguração ativado.', 'info-log');
        return;
    }

    const email = userInput.value.trim();
    const oldPass = passInput.value.trim();
    const newPass = newPassInput.value.trim();

    if (!email || !oldPass || !newPass) {
        setPanelState('erro');
        setTimeout(() => setPanelState(null), 400);
        setFeedback('Preencha todos os campos obrigatórios.', 'erro');
        logLine('> FALHA: parâmetros insuficientes.', 'warn-log');
        return;
    }

    iniciarCarregamento('Autenticando protocolo de segurança...');

    // Passo 1: Autenticar com a senha antiga
    const { error: signInError } = await supabaseClient.auth.signInWithPassword({ email, password: oldPass });

    if (signInError) {
        setPanelState('erro');
        setTimeout(() => setPanelState(null), 400);
        setFeedback('Senha atual incorreta.', 'erro');
        logLine('> ERRO: ' + signInError.message, 'warn-log');
        resetarCarregamento();
        return;
    }

    logLine('> Autenticação confirmada. Gravando nova criptografia...');

    // Passo 2: Atualizar para a nova senha
    const { error: updateError } = await supabaseClient.auth.updateUser({ password: newPass });

    if (updateError) {
        setPanelState('erro');
        setTimeout(() => setPanelState(null), 400);
        setFeedback('Falha ao atualizar a senha.', 'erro');
        logLine('> ERRO: ' + updateError.message, 'warn-log');
        resetarCarregamento();
    } else {
        logLine('> Credencial atualizada com sucesso.', 'ok-log');
        animacaoSucesso(email);
    }
});