document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const commandInput = document.getElementById('commandInput');
    const terminalBody = document.getElementById('terminal-body');

    // Deve bater com DEVS em controleBugs.js
    const DEVS = ['Duque Iguro', 'EidenFox', 'Equipe de Desenvolvimento'];
    // Limites para evitar reportes gigantes (a validação real fica no front, sem garantia no banco)
    const LIMITE = { nome: 60, pagina: 100, descricao: 2000 };

    const welcomeMessage = "Conectando ao sistema de suporte...\nConexão estabelecida.\n\nBem-vindo ao Terminal de Manutenção. \n\nDigite 'ajuda' para uma lista de comandos.";
    let commandHistory = [];
    let historyIndex = -1;

    // Escapa texto digitado pelo usuário antes de exibir com innerHTML
    const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    // Mensagens com HTML fixo. Qualquer valor vindo do usuário deve passar por esc() antes.
    function print(message, className = '') {
        const p = document.createElement('p');
        if (className) {
            p.className = className;
        }
        p.innerHTML = message;
        output.appendChild(p);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function showBugReportForm() {
        commandInput.disabled = true;
        const formContainer = document.createElement('div');
        formContainer.id = 'bug-report-form';

        const formHTML = `
            <p>Seu nome:</p>
            <input type="text" id="reporter-name" class="form-input" maxlength="${LIMITE.nome}">
            <p>Reportar para o Dev:</p>
            <select id="dev-select" class="form-select">
                ${DEVS.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join('')}
            </select>
            <p>Página do Bug:</p>
            <input type="text" id="bug-page" class="form-input" placeholder="Ex: ficha.html" maxlength="${LIMITE.pagina}">
            <p>Descrição do Bug:</p>
            <textarea id="bug-description" class="form-textarea" rows="4" maxlength="${LIMITE.descricao}"></textarea>
            <button id="submit-bug-report" class="form-button">Enviar Report</button>
            <button id="cancel-bug-report" class="form-button">Cancelar</button>
        `;
        formContainer.innerHTML = formHTML;
        output.appendChild(formContainer);
        terminalBody.scrollTop = terminalBody.scrollHeight;

        document.getElementById('submit-bug-report').addEventListener('click', async () => {
            const submitBtn = document.getElementById('submit-bug-report');
            const reporterName = document.getElementById('reporter-name').value.trim();
            const dev = document.getElementById('dev-select').value;
            const bugPage = document.getElementById('bug-page').value.trim();
            const bugDescription = document.getElementById('bug-description').value.trim();

            if (!reporterName || !dev || !bugPage || !bugDescription) {
                print('\n<span class="error">Erro: Por favor, preencha todos os campos.</span>', 'error');
                return;
            }

            if (!DEVS.includes(dev)) {
                print('\n<span class="error">Erro: Dev inválido.</span>', 'error');
                return;
            }

            if (reporterName.length > LIMITE.nome || bugPage.length > LIMITE.pagina || bugDescription.length > LIMITE.descricao) {
                print('\n<span class="error">Erro: Um dos campos excede o tamanho máximo.</span>', 'error');
                return;
            }

            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // status 'aberto' é obrigatório aqui: a policy "dev_itens manutencao envia bug" (anon)
            // só aceita tipo='bug', origem='manutencao', status='aberto' e criado_por IS NULL.
            // O controleBugs exibe 'aberto' em chamados como "Por fazer".
            const { error } = await supabaseClient.from('dev_itens').insert([{
                tipo: 'bug',
                origem: 'manutencao',
                status: 'aberto',
                titulo: `Bug em ${bugPage}`,
                pagina: bugPage,
                descricao: bugDescription,
                reportado_por: reporterName,
                responsavel: dev
            }]);

            if (error) {
                print(`\n<span class="error">Erro ao enviar: ${esc(error.message)}</span>`, 'error');
                submitBtn.innerText = 'Tentar Novamente';
                submitBtn.disabled = false;
                return;
            }

            print(`\n<span class="success">Bug reportado com sucesso!</span>\nObrigado, ${esc(reporterName)}. Report enviado para o Dev ${esc(dev)}.`, 'success');
            formContainer.remove();
            commandInput.disabled = false;
            commandInput.focus();
        });

        document.getElementById('cancel-bug-report').addEventListener('click', () => {
            print('\n<span class="info">Reporte de bug cancelado.</span>', 'info');
            formContainer.remove();
            commandInput.disabled = false;
            commandInput.focus();
        });
    }

    const commands = {
        'ajuda': 'Comandos disponíveis:\n  faq - Exibe perguntas frequentes.\n  reportar - Inicia o processo de reporte de bug.\n  limpar - Limpa a tela do terminal.\n  creditos - Exibe os créditos.',

        'faq': 'Perguntas Frequentes:\n\nQ: Como acesso minha ficha?\nA: Navegue para a página "ficha.html".\n\nQ: Onde posso ver as naves?\nA: Visite o "hangar.html".\n\nQ: Esqueci minha senha.\nA: Contate o Mestre do Jogo diretamente.',

        'reportar': () => {
            print('Iniciando formulário de reporte de bug...');
            showBugReportForm();
        },

        'limpar': () => {
            output.innerHTML = '';
            typeWriter(welcomeMessage, true);
            return '';
        },

        'creditos': 'Desenvolvido por Duque Iguro e EidenFox.\nInspirado no universo de Star Wars.',
    };

    function executeCommand(command) {
        commandHistory.unshift(command);
        historyIndex = -1;
        print(`> ${esc(command)}`);
        if (commands[command]) {
            const result = commands[command];
            if (typeof result === 'function') {
                const funcResult = result();
                if (funcResult) print(funcResult, 'info');
            } else {
                print(result, 'info');
            }
        } else {
            print(`Erro: comando '${esc(command)}' não encontrado.`, 'error');
        }
    }

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && commandInput.value.trim() !== '') {
            executeCommand(commandInput.value.trim().toLowerCase());
            commandInput.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                commandInput.value = '';
            }
        }
    });

    // Efeito de digitação para a mensagem de boas-vindas.
    // Escreve só dentro de um <p> próprio. Antes, output.innerHTML += char recriava
    // todo o conteúdo e destruía os botões do formulário (e seus listeners).
    let typeTimer = null;
    let typeIndex = 0;
    let welcomeEl = null;

    function typeWriter(text, clear = false) {
        if (clear) {
            clearTimeout(typeTimer);
            output.innerHTML = '';
            typeIndex = 0;
            welcomeEl = null;
        }
        if (!welcomeEl) {
            welcomeEl = document.createElement('p');
            output.appendChild(welcomeEl);
        }
        if (typeIndex < text.length) {
            welcomeEl.textContent += text.charAt(typeIndex);
            typeIndex++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            typeTimer = setTimeout(() => typeWriter(text), 25);
        }
    }

    typeWriter(welcomeMessage);
});