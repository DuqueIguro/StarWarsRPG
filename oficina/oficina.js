document.addEventListener('DOMContentLoaded', () => {
    const osListContainer = document.getElementById('os-list');
    const osDetailsContainer = document.getElementById('os-details-container');
    const osDetailsContent = document.getElementById('os-details');
    const osPlaceholder = document.getElementById('os-placeholder');

    // Lista dos seus arquivos JSON de Ordens de Serviço
    const ordensDeServico = [
        'ordens_de_servico/os_exemplo.json',
        // Adicione mais arquivos .json aqui
    ];

    async function carregarOrdensDeServico() {
        for (const osFile of ordensDeServico) {
            try {
                const response = await fetch(osFile);
                if (!response.ok) {
                    throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
                }
                const data = await response.json();
                exibirItemDaLista(data.ordemDeServico, osFile);
            } catch (error) {
                console.error('Falha ao carregar e processar a OS:', osFile, error);
                osListContainer.innerHTML += `<div class="os-item bg-red-900/50 p-3 rounded-md">
                    <p class="font-bold text-red-300">Erro ao carregar OS</p>
                    <p class="text-xs text-red-400">${osFile}</p>
                </div>`;
            }
        }
    }

    function exibirItemDaLista(os, file) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'os-item bg-gray-900/50 p-3 rounded-md';
        itemDiv.dataset.file = file;

        const statusClass = `status-${os.status.toLowerCase().replace(/ /g, '-')}`;
        
        itemDiv.innerHTML = `
            <div class="flex justify-between items-center">
                <p class="font-bold text-orange-300">${os.titulo}</p>
                <span class="text-xs font-bold px-2 py-1 rounded-full ${statusClass}">${os.status}</span>
            </div>
            <p class="text-sm text-orange-400">Cliente: ${os.cliente.nome}</p>
            <p class="text-xs text-gray-400">ID: ${os.id}</p>
        `;

        itemDiv.addEventListener('click', () => {
            carregarDetalhesOS(file);
            document.querySelectorAll('.os-item').forEach(el => el.classList.remove('active'));
            itemDiv.classList.add('active');
        });

        osListContainer.appendChild(itemDiv);
    }

    async function carregarDetalhesOS(file) {
        try {
            const response = await fetch(file);
            const data = await response.json();
            const os = data.ordemDeServico;
            
            osPlaceholder.classList.add('hidden');
            osDetailsContainer.classList.remove('hidden');

            let servicosHtml = os.itens.map(item => `
                <div class="border-t border-orange-800 pt-3 mt-3">
                    <p><strong class="text-orange-300">Serviço:</strong> ${item.servico}</p>
                    <p><strong class="text-orange-300">Tipo:</strong> ${item.tipo}</p>
                    <p><strong class="text-orange-300">Peça:</strong> ${item.detalhes.peca.nome || 'N/A'}</p>
                    <p><strong class="text-orange-300">Custo (Peças):</strong> ${(item.detalhes.peca.custo || 0).toLocaleString()} créditos</p>
                    <p><strong class="text-orange-300">Custo (Mão de Obra):</strong> ${(item.detalhes.maoDeObra.custo || 0).toLocaleString()} créditos</p>
                </div>
            `).join('');

            let taxasHtml = os.taxasAdicionais.map(taxa => `
                <li><strong>${taxa.nome} (${taxa.sigla}):</strong> +${taxa.percentual_sobre_mao_de_obra || taxa.percentual_sobre_mao_de_obra_improvisada || 0}% sobre a mão de obra. <em class="text-gray-400 text-sm">(${taxa.justificativa})</em></li>
            `).join('');

            osDetailsContent.innerHTML = `
                <h2 class="font-orbitron text-2xl text-orange-300 mb-2">${os.titulo}</h2>
                <p class="text-sm text-gray-400 mb-4">ID da Ordem: ${os.id} | Data: ${os.data}</p>

                <div class="bg-gray-900/50 p-4 rounded-md mb-4">
                    <h3 class="font-orbitron text-lg text-orange-400 mb-2">Informações do Cliente</h3>
                    <p><strong class="text-orange-300">Nome:</strong> ${os.cliente.nome}</p>
                    <p><strong class="text-orange-300">Afiliação:</strong> ${os.cliente.afiliacao}</p>
                    <p><strong class="text-orange-300">Contato HoloNet:</strong> ${os.cliente.contato_holonet}</p>
                </div>

                <div class="bg-gray-900/50 p-4 rounded-md mb-4">
                    <h3 class="font-orbitron text-lg text-orange-400 mb-2">Relatório do Problema</h3>
                    <p class="text-gray-300">${os.relatorio_problema}</p>
                </div>

                <div class="bg-gray-900/50 p-4 rounded-md mb-4">
                    <h3 class="font-orbitron text-lg text-orange-400 mb-2">Serviços Executados</h3>
                    ${servicosHtml}
                </div>

                <div class="bg-gray-900/50 p-4 rounded-md mb-4">
                    <h3 class="font-orbitron text-lg text-orange-400 mb-2">Taxas e Modificadores</h3>
                    <ul class="list-disc list-inside text-gray-300">${taxasHtml.length > 0 ? taxasHtml : '<li>Nenhuma taxa adicional aplicada.</li>'}</ul>
                </div>
                
                <div class="border-t-2 border-orange-500 pt-4 mt-4">
                    <p class="text-lg"><strong class="font-orbitron text-orange-300">Subtotal (Peças):</strong> ${os.financeiro.subtotalPecas.toLocaleString()} ${os.financeiro.moeda}</p>
                    <p class="text-lg"><strong class="font-orbitron text-orange-300">Subtotal (Mão de Obra):</strong> ${os.financeiro.subtotalMaoDeObra.toLocaleString()} ${os.financeiro.moeda}</p>
                    <p class="text-lg"><strong class="font-orbitron text-orange-300">Adicionais:</strong> +${os.financeiro.subtotalAdicionais.toLocaleString()} ${os.financeiro.moeda}</p>
                    <h3 class="font-orbitron text-2xl text-yellow-400 mt-2">Total a Pagar: ${os.financeiro.total.toLocaleString()} ${os.financeiro.moeda}</h3>
                </div>

                <div class="mt-6">
                    <h3 class="font-orbitron text-lg text-orange-400 mb-2">Notas do Mecânico (Dur'Toc)</h3>
                    <p class="text-gray-300 italic">"${os.notas_mecanico}"</p>
                </div>
            `;
        } catch (error) {
            console.error('Falha ao carregar detalhes da OS:', file, error);
            osDetailsContent.innerHTML = `<p class="text-red-400">Não foi possível carregar os detalhes da ordem de serviço.</p>`;
        }
    }

    carregarOrdensDeServico();
});