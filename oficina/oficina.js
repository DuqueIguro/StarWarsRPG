document.addEventListener('DOMContentLoaded', () => {
    const osListContainer = document.getElementById('os-list');
    const osDetailsContainer = document.getElementById('os-details-container');
    const osDetailsContent = document.getElementById('os-details');
    const osPlaceholder = document.getElementById('os-placeholder');

    // Caminho para o arquivo de manifesto
    const manifestFile = 'oficina/manifesto.json';

    async function carregarOrdensDeServico() {
        try {
            const manifestResponse = await fetch(manifestFile);
            const manifestData = await manifestResponse.json();
            const ordensDeServico = manifestData.ordens.map(os => 'oficina/' + os);

            for (const osFile of ordensDeServico) {
                try {
                    const response = await fetch(osFile);
                    if (!response.ok) {
                        throw new Error(`Erro HTTP: ${response.status}`);
                    }
                    const data = await response.json();
                    exibirItemDaLista(data.ordemDeServico, osFile);
                } catch (error) {
                    console.error('Falha ao carregar e processar a OS:', osFile, error);
                    const fileName = osFile.split('/').pop();
                    osListContainer.innerHTML += `<div class="os-item bg-red-900/50 p-3 rounded-md">
                        <p class="font-bold text-red-300">Erro ao carregar OS</p>
                        <p class="text-xs text-red-400">${fileName}</p>
                    </div>`;
                }
            }
        } catch (error) {
            console.error('Falha ao carregar o arquivo de manifesto:', error);
            osListContainer.innerHTML = `<div class="os-item bg-red-900/50 p-3 rounded-md">
                <p class="font-bold text-red-300">Erro Crítico</p>
                <p class="text-xs text-red-400">Não foi possível carregar o manifesto.json</p>
            </div>`;
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
            // MODIFICAÇÃO: Verifica se o item clicado já está ativo
            if (itemDiv.classList.contains('active')) {
                // Se estiver, deseleciona e volta para a tela padrão
                itemDiv.classList.remove('active');
                osDetailsContainer.classList.add('hidden');
                osPlaceholder.classList.remove('hidden');
            } else {
                // Caso contrário, carrega os detalhes da OS clicada
                carregarDetalhesOS(file);
                document.querySelectorAll('.os-item').forEach(el => el.classList.remove('active'));
                itemDiv.classList.add('active');
            }
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

            // --- INÍCIO DAS ALTERAÇÕES ---

            // 1. Gera o descritivo de Peças
            let pecasDescricaoHtml = os.itens
                .filter(item => item.detalhes.peca && item.detalhes.peca.custo > 0)
                .map(item => `
                    <div class="text-sm text-gray-400 ml-4">${item.detalhes.peca.nome}: ${item.detalhes.peca.custo.toLocaleString()} créditos</div>
                `).join('');

            // 2. Gera o descritivo de Mão de Obra
            let maoDeObraDescricaoHtml = os.itens
                .filter(item => item.detalhes.maoDeObra && item.detalhes.maoDeObra.custo > 0)
                .map(item => `
                    <div class="text-sm text-gray-400 ml-4">${item.servico}: ${item.detalhes.maoDeObra.custo.toLocaleString()} créditos</div>
                `).join('');

            let taxasFixasDescricaoHtml = '';
            let adicionaisDescricaoHtml = '';

            if (os.taxasAdicionais && os.taxasAdicionais.length > 0) {
                const taxasFixasDescricoes = os.taxasAdicionais.filter(taxa => !taxa.percentual_sobre_mao_de_obra && !taxa.percentual_sobre_mao_de_obra_improvisada).map(taxa => 
                    `<div class="text-sm text-gray-400 ml-4">${taxa.nome} (${taxa.sigla}): ${taxa.custo.toLocaleString()} créditos</div>`
                ).join('');

                const adicionaisDescricoes = os.taxasAdicionais.filter(taxa => taxa.percentual_sobre_mao_de_obra || taxa.percentual_sobre_mao_de_obra_improvisada).map(taxa => {
                    const percentual = taxa.percentual_sobre_mao_de_obra || taxa.percentual_sobre_mao_de_obra_improvisada;
                    const tipo = taxa.percentual_sobre_mao_de_obra ? "Mão de Obra" : "Mão de Obra Impr.";
                    return `<div class="text-sm text-gray-400 ml-4">+${percentual}% ${tipo} (${taxa.sigla}): ${taxa.custo.toLocaleString()} créditos</div>`;
                }).join('');
                
                if (taxasFixasDescricoes) {
                    taxasFixasDescricaoHtml = taxasFixasDescricoes;
                }
                if (adicionaisDescricoes) {
                    adicionaisDescricaoHtml = adicionaisDescricoes;
                }
            }
            
            let pecasSumarioHtml = '';
            if (os.financeiro.subtotalPecas && os.financeiro.subtotalPecas > 0) {
                pecasSumarioHtml = `
                    <div class="text-lg"><strong class="font-orbitron text-orange-300">Subtotal (Peças):</strong> ${os.financeiro.subtotalPecas.toLocaleString()} ${os.financeiro.moeda}</div>
                    ${pecasDescricaoHtml}
                `;
            }

            let maoDeObraSumarioHtml = '';
            if (os.financeiro.subtotalMaoDeObra && os.financeiro.subtotalMaoDeObra > 0) {
                 maoDeObraSumarioHtml = `
                    <div class="text-lg"><strong class="font-orbitron text-orange-300">Subtotal (Mão de Obra):</strong> ${os.financeiro.subtotalMaoDeObra.toLocaleString()} ${os.financeiro.moeda}</div>
                    ${maoDeObraDescricaoHtml}
                 `;
            }

            let taxasFixasSumarioHtml = '';
            if (os.financeiro.subtotalTaxasFixas && os.financeiro.subtotalTaxasFixas > 0) {
                taxasFixasSumarioHtml = `
                    <div class="text-lg"><strong class="font-orbitron text-orange-300">Taxas Fixas:</strong> ${os.financeiro.subtotalTaxasFixas.toLocaleString()} ${os.financeiro.moeda}</div>
                    ${taxasFixasDescricaoHtml}
                `;
            }

            let adicionaisSumarioHtml = '';
            if (os.financeiro.subtotalAdicionais && os.financeiro.subtotalAdicionais > 0) {
                 adicionaisSumarioHtml = `
                    <div class="text-lg"><strong class="font-orbitron text-orange-300">Adicionais:</strong> +${os.financeiro.subtotalAdicionais.toLocaleString()} ${os.financeiro.moeda}</div>
                    ${adicionaisDescricaoHtml}
                 `;
            }
            
            // MODIFICAÇÃO: Cria a seção de termos apenas se os.termos tiver conteúdo
            let termosHtml = '';
            if (os.termos) {
                termosHtml = `
                <div class="mt-6 border-t border-orange-800 pt-4">
                    <h3 class="font-orbitron text-lg text-orange-400 mb-2">Termos e Condições</h3>
                    <p class="text-sm text-orange-200 bg-gray-900/70 p-3 rounded-md italic">
                        "${os.termos}"
                    </p>
                </div>
                `;
            }

            // --- FIM DAS ALTERAÇÕES ---


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
                
                <div class="border-t-2 border-orange-500 pt-4 mt-4 space-y-2">
                    ${pecasSumarioHtml}
                    ${maoDeObraSumarioHtml}
                    ${taxasFixasSumarioHtml}
                    ${adicionaisSumarioHtml}
                    <h3 class="font-orbitron text-2xl text-yellow-400 mt-4 pb-4 border-b border-orange-800">Total a Pagar: ${os.financeiro.total.toLocaleString()} ${os.financeiro.moeda}</h3>
                </div>
                <div class="mt-6">
                    <h3 class="font-orbitron text-lg text-orange-400 mb-2">Notas do Mecânico (${os.mecanicoResponsavel || 'N/A'})</h3>
                    <p class="text-gray-300 italic">"${os.notas_mecanico}"</p>
                </div>
                ${termosHtml}
            `;
        } catch (error) {
            console.error('Falha ao carregar detalhes da OS:', file, error);
            osDetailsContent.innerHTML = `<p class="text-red-400">Não foi possível carregar os detalhes da ordem de serviço.</p>`;
        }
    }

    carregarOrdensDeServico();
});