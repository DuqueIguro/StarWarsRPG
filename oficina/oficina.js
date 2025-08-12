document.addEventListener('DOMContentLoaded', () => {
    // Painéis de Ordens de Serviço Normais
    const osListContainer = document.getElementById('os-list');
    const osDetailsContainer = document.getElementById('os-details-container');
    const osDetailsContent = document.getElementById('os-details');
    const osPlaceholder = document.getElementById('os-placeholder');

    // Painéis de Ordens de Serviço Sigilosas
    const osListSigilosoContainer = document.getElementById('os-list-sigiloso');
    const osDetailsContainerSigiloso = document.getElementById('os-details-container-sigiloso');
    const osDetailsContentSigiloso = document.getElementById('os-details-sigiloso');
    const osPlaceholderSigiloso = document.getElementById('os-placeholder-sigiloso');

    // Caminhos para os manifestos
    const manifestFile = 'oficina/manifesto.json';
    const manifestSigilosoFile = 'oficina/manifestoSigiloso.json';

    // Função genérica para carregar um manifesto e popular sua lista
    async function carregarManifesto(manifestPath, container, itemRenderer, itemClass) {
        try {
            const manifestResponse = await fetch(manifestPath);
            if (!manifestResponse.ok) throw new Error(`Manifesto não encontrado: ${manifestPath}`);
            const manifestData = await manifestResponse.json();
            
            const basePath = manifestPath.substring(0, manifestPath.lastIndexOf('/'));

            for (const osFile of manifestData.ordens) {
                const fullPath = `${basePath}/${osFile}`;
                try {
                    const response = await fetch(fullPath);
                    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
                    
                    const data = await response.json();
                    itemRenderer(data.ordemDeServico, fullPath, container, itemClass);
                } catch (error) {
                    console.error('Falha ao carregar e processar a OS:', fullPath, error);
                }
            }
        } catch (error) {
            console.error('Falha ao carregar o arquivo de manifesto:', error);
            container.innerHTML = `<div class="os-item bg-red-900/50 p-3 rounded-md"><p class="font-bold text-red-300">Erro ao carregar manifesto.</p></div>`;
        }
    }

    function handleItemClick(itemDiv, file, detailsToShow, placeholderToShow, contentTarget, detailsToHide, placeholderToReset, theme) {
        if (itemDiv.classList.contains('active')) {
            itemDiv.classList.remove('active');
            detailsToShow.classList.add('hidden');
            placeholderToShow.classList.remove('hidden');
        } else {
            carregarDetalhesOS(file, contentTarget, theme);
            detailsToShow.classList.remove('hidden');
            placeholderToShow.classList.add('hidden');
            
            detailsToHide.classList.add('hidden');
            placeholderToReset.classList.remove('hidden');

            document.querySelectorAll('.os-item, .os-item-sigiloso').forEach(el => el.classList.remove('active'));
            itemDiv.classList.add('active');
        }
    }
    
    function criarItemNaLista(os, file, container, itemClass, themeColors) {
        const itemDiv = document.createElement('div');
        itemDiv.className = `${itemClass} bg-gray-900/50 p-3 rounded-md`;
        itemDiv.dataset.file = file;
        const statusClass = `status-${os.status.toLowerCase().replace(/ /g, '-')}`;
        
        itemDiv.innerHTML = `
            <div class="flex justify-between items-center">
                <p class="font-bold ${themeColors.title}">${os.titulo}</p>
                <span class="text-xs font-bold px-2 py-1 rounded-full ${statusClass}">${os.status}</span>
            </div>
            <p class="text-sm ${themeColors.subtext}">Cliente: ${os.cliente.nome}</p>
            <p class="text-xs text-gray-400">ID: ${os.id}</p>
        `;

        itemDiv.addEventListener('click', () => {
            if (itemClass === 'os-item') {
                handleItemClick(itemDiv, file, osDetailsContainer, osPlaceholder, osDetailsContent, osDetailsContainerSigiloso, osPlaceholderSigiloso, 'normal');
            } else {
                handleItemClick(itemDiv, file, osDetailsContainerSigiloso, osPlaceholderSigiloso, osDetailsContentSigiloso, osDetailsContainer, osPlaceholder, 'sigiloso');
            }
        });
        container.appendChild(itemDiv);
    }

    const exibirItemNormal = (os, file, container, itemClass) => criarItemNaLista(os, file, container, itemClass, { title: 'text-orange-300', subtext: 'text-orange-400'});
    const exibirItemSigiloso = (os, file, container, itemClass) => criarItemNaLista(os, file, container, itemClass, { title: 'text-red-300', subtext: 'text-red-400'});
    
    async function carregarDetalhesOS(file, contentTarget, themeType) {
        try {
            const response = await fetch(file);
            const data = await response.json();
            const os = data.ordemDeServico;

            const theme = themeType === 'sigiloso' ? {
                main: 'red', title: 'text-red-300', header: 'text-red-400', strong: 'text-red-300', border: 'border-red-800', borderStrong: 'border-red-500'
            } : {
                main: 'orange', title: 'text-orange-300', header: 'text-orange-400', strong: 'text-orange-300', border: 'border-orange-800', borderStrong: 'border-orange-500'
            };

            let servicosHtml = os.itens.map(item => `
                <div class="border-t ${theme.border} pt-3 mt-3">
                    <p><strong class="${theme.strong}">Serviço:</strong> ${item.servico}</p>
                    <p><strong class="${theme.strong}">Tipo:</strong> ${item.tipo}</p>
                    <p><strong class="${theme.strong}">Peça:</strong> ${item.detalhes.peca.nome || 'N/A'}</p>
                    <p><strong class="${theme.strong}">Custo (Peças):</strong> ${(item.detalhes.peca.custo || 0).toLocaleString()} créditos</p>
                    <p><strong class="${theme.strong}">Custo (Mão de Obra):</strong> ${(item.detalhes.maoDeObra.custo || 0).toLocaleString()} créditos</p>
                </div>
            `).join('');
            
            let pecasDescricaoHtml = os.itens.filter(item => item.detalhes.peca && item.detalhes.peca.custo > 0).map(item => `<div class="text-sm text-gray-400 ml-4">${item.detalhes.peca.nome}: ${item.detalhes.peca.custo.toLocaleString()} créditos</div>`).join('');
            let maoDeObraDescricaoHtml = os.itens.filter(item => item.detalhes.maoDeObra && item.detalhes.maoDeObra.custo > 0).map(item => `<div class="text-sm text-gray-400 ml-4">${item.servico}: ${item.detalhes.maoDeObra.custo.toLocaleString()} créditos</div>`).join('');
            let taxasFixasDescricaoHtml = '', adicionaisDescricaoHtml = '';

            // LÓGICA CORRIGIDA AQUI
            if (os.taxasAdicionais && os.taxasAdicionais.length > 0) {
                taxasFixasDescricaoHtml = os.taxasAdicionais
                    .filter(taxa => !taxa.percentual_sobre_mao_de_obra && !taxa.percentual_sobre_mao_de_obra_improvisada && !taxa.percentual_sobre_peca && !taxa.percentual_sobre_servico_total)
                    .map(taxa => `<div class="text-sm text-gray-400 ml-4">${taxa.nome} (${taxa.sigla}): ${taxa.custo.toLocaleString()} créditos</div>`)
                    .join('');

                adicionaisDescricaoHtml = os.taxasAdicionais
                    .filter(taxa => taxa.percentual_sobre_mao_de_obra || taxa.percentual_sobre_mao_de_obra_improvisada || taxa.percentual_sobre_peca || taxa.percentual_sobre_servico_total)
                    .map(taxa => {
                        let percentual = 0;
                        let tipo = '';

                        if (taxa.percentual_sobre_mao_de_obra) {
                            percentual = taxa.percentual_sobre_mao_de_obra;
                            tipo = "Mão de Obra";
                        } else if (taxa.percentual_sobre_mao_de_obra_improvisada) {
                            percentual = taxa.percentual_sobre_mao_de_obra_improvisada;
                            tipo = "Mão de Obra Impr.";
                        } else if (taxa.percentual_sobre_peca) {
                            percentual = taxa.percentual_sobre_peca;
                            tipo = "Peça";
                        } else if (taxa.percentual_sobre_servico_total) {
                            percentual = taxa.percentual_sobre_servico_total;
                            tipo = "Total do Serviço";
                        }
                        
                    return `<div class="text-sm text-gray-400 ml-4">+${percentual}% ${tipo} (${taxa.sigla}): ${taxa.custo.toLocaleString()} créditos</div>`;
                }).join('');
            }
            
            let pecasSumarioHtml = (os.financeiro.subtotalPecas > 0) ? `<div class="text-lg"><strong class="font-orbitron ${theme.title}">Subtotal (Peças):</strong> ${os.financeiro.subtotalPecas.toLocaleString()} ${os.financeiro.moeda}</div>${pecasDescricaoHtml}` : '';
            let maoDeObraSumarioHtml = (os.financeiro.subtotalMaoDeObra > 0) ? `<div class="text-lg"><strong class="font-orbitron ${theme.title}">Subtotal (Mão de Obra):</strong> ${os.financeiro.subtotalMaoDeObra.toLocaleString()} ${os.financeiro.moeda}</div>${maoDeObraDescricaoHtml}` : '';
            let taxasFixasSumarioHtml = (os.financeiro.subtotalTaxasFixas > 0) ? `<div class="text-lg"><strong class="font-orbitron ${theme.title}">Taxas Fixas:</strong> ${os.financeiro.subtotalTaxasFixas.toLocaleString()} ${os.financeiro.moeda}</div>${taxasFixasDescricaoHtml}` : '';
            let adicionaisSumarioHtml = (os.financeiro.subtotalAdicionais > 0) ? `<div class="text-lg"><strong class="font-orbitron ${theme.title}">Adicionais:</strong> +${os.financeiro.subtotalAdicionais.toLocaleString()} ${os.financeiro.moeda}</div>${adicionaisDescricaoHtml}` : '';
            let termosHtml = os.termos ? `<div class="mt-6 border-t ${theme.border} pt-4"><h3 class="font-orbitron text-lg ${theme.header} mb-2"><i class="fa-solid fa-file-signature"></i>Termos e Condições</h3><p class="text-sm text-${theme.main}-200 bg-gray-900/70 p-3 rounded-md italic">"${os.termos}"</p></div>` : '';


            contentTarget.innerHTML = `
                <h2 class="font-orbitron text-2xl ${theme.title} mb-2">${os.titulo}</h2>
                <p class="text-sm text-gray-400 mb-4">ID da Ordem: ${os.id} | Data: ${os.data}</p>
                <div class="bg-gray-900/50 p-4 rounded-md mb-4">
                    <h3 class="font-orbitron text-lg ${theme.header} mb-2"><i class="fa-solid fa-user-astronaut"></i>Informações do Cliente</h3>
                    <p><strong class="${theme.strong}">Nome:</strong> ${os.cliente.nome}</p>
                    <p><strong class="${theme.strong}">Afiliação:</strong> ${os.cliente.afiliacao}</p>
                    <p><strong class="${theme.strong}">Contato HoloNet:</strong> ${os.cliente.contato_holonet}</p>
                </div>
                <div class="bg-gray-900/50 p-4 rounded-md mb-4">
                    <h3 class="font-orbitron text-lg ${theme.header} mb-2"><i class="fa-solid fa-triangle-exclamation"></i>Relatório do Problema</h3>
                    <p class="text-gray-300">${os.relatorio_problema}</p>
                </div>
                <div class="bg-gray-900/50 p-4 rounded-md mb-4">
                    <h3 class="font-orbitron text-lg ${theme.header} mb-2"><i class="fa-solid fa-gears"></i>Serviços Executados</h3>
                    ${servicosHtml}
                </div>
                <div class="border-t-2 ${theme.borderStrong} pt-4 mt-4 space-y-2">
                    ${pecasSumarioHtml}
                    ${maoDeObraSumarioHtml}
                    ${taxasFixasSumarioHtml}
                    ${adicionaisSumarioHtml}
                    <h3 class="font-orbitron text-2xl text-yellow-400 mt-4 pb-4 border-b ${theme.border} ">Total a Pagar: ${os.financeiro.total.toLocaleString()} ${os.financeiro.moeda}</h3>
                </div>
                <div class="mt-6">
                    <h3 class="font-orbitron text-lg ${theme.header} mb-2"><i class="fa-solid fa-comment-dots"></i>Notas do Mecânico (${os.mecanicoResponsavel || 'N/A'})</h3>
                    <p class="text-gray-300 italic">"${os.notas_mecanico}"</p>
                </div>
                ${termosHtml}
            `;
        } catch (error) {
            console.error('Falha ao carregar detalhes da OS:', file, error);
            contentTarget.innerHTML = `<p class="text-red-400">Não foi possível carregar os detalhes da ordem de serviço.</p>`;
        }
    }
    
    // Inicia o carregamento de ambas as listas
    carregarManifesto(manifestFile, osListContainer, exibirItemNormal, 'os-item');
    carregarManifesto(manifestSigilosoFile, osListSigilosoContainer, exibirItemSigiloso, 'os-item-sigiloso');
});