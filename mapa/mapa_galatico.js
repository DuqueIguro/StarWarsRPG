document.addEventListener('DOMContentLoaded', () => {
    const mapaGalactico = document.getElementById('mapa-galactico');
    const buscaPlanetaInput = document.getElementById('busca-planeta');
    const filtroRegiaoSelect = document.getElementById('filtro-regiao');
    const buscaSetorInput = document.getElementById('busca-setor');
    const mensagemNenhumResultado = document.getElementById('mensagem-nenhum-resultado');
    
    let planetasData = [];

    // Carregar dados do JSON
    fetch('mapa/planetas_database.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Ordena os planetas em ordem alfabética por nome na carga inicial
            data.planetas.sort((a, b) => a.nome.localeCompare(b.nome));
            
            planetasData = data.planetas;
            popularFiltros(planetasData);
            renderizarPlanetas(planetasData);
        })
        .catch(error => {
            console.error('Erro ao carregar o banco de dados de planetas:', error);
            mapaGalactico.innerHTML = '<p style="color: #ef4444;">Falha ao carregar dados da galáxia. Verifique o console para mais detalhes.</p>';
        });

    // Popular o filtro de regiões
    function popularFiltros(planetas) {
        const regioes = [...new Set(planetas.map(p => p.regiao))];
        regioes.sort().forEach(regiao => {
            const option = document.createElement('option');
            option.value = regiao;
            option.textContent = regiao;
            filtroRegiaoSelect.appendChild(option);
        });
    }

    // Renderizar os planetas na tela
    function renderizarPlanetas(planetas) {
        mapaGalactico.innerHTML = '';
        if (planetas.length === 0) {
            mensagemNenhumResultado.style.display = 'block';
        } else {
            mensagemNenhumResultado.style.display = 'none';
        }

        planetas.forEach(planeta => {
            const card = document.createElement('div');
            card.className = 'planeta-card';

            const affiliationItems = planeta.afiliacao.split(',').map(item => `<li>${item.trim()}</li>`).join('');
            const speciesItems = planeta.principais_especies.map(item => `<li>${item.trim()}</li>`).join('');

            // TEMPLATE DO CARD ATUALIZADO COM ÍCONES
            card.innerHTML = `
                <h2><i class="fa-solid fa-earth-americas"></i> ${planeta.nome}</h2>
                <p class="font-aurebesh planeta-aurebesh">${planeta.nome}</p>
                <p class="regiao">${planeta.regiao} - ${planeta.setor}</p>
                
                <div class="description-box">
                    <p>${planeta.descricao}</p>
                </div>

                <div class="info-grid">
                    <div class="info-box">
                        <strong><i class="fa-solid fa-star"></i> Sistema:</strong>
                        <span>${planeta.sistema}</span>
                    </div>
                    <div class="info-box">
                        <strong><i class="fa-solid fa-landmark-flag"></i> Governo:</strong>
                        <span>${planeta.governo}</span>
                    </div>
                    <div class="info-box affiliation-box">
                        <strong><i class="fa-solid fa-user-group"></i> Afiliação:</strong>
                        <ul>${affiliationItems}</ul>
                    </div>
                    <div class="info-box species-box">
                        <strong><i class="fa-solid fa-users"></i> Espécies Principais:</strong>
                        <ul>${speciesItems}</ul>
                    </div>
                </div>
            `;
            mapaGalactico.appendChild(card);
        });
    }

    // Função para filtrar os planetas
    function filtrarPlanetas() {
        const termoPlaneta = buscaPlanetaInput.value.toLowerCase();
        const regiaoSelecionada = filtroRegiaoSelect.value;
        const termoSetor = buscaSetorInput.value.toLowerCase();

        let planetasFiltrados = planetasData.filter(planeta => {
            const matchPlaneta = planeta.nome.toLowerCase().includes(termoPlaneta);
            const matchRegiao = regiaoSelecionada === '' || planeta.regiao === regiaoSelecionada;
            const matchSetor = planeta.setor.toLowerCase().includes(termoSetor);
            return matchPlaneta && matchRegiao && matchSetor;
        });
        
        planetasFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));

        renderizarPlanetas(planetasFiltrados);
    }

    // Adicionar listeners para os filtros
    buscaPlanetaInput.addEventListener('input', filtrarPlanetas);
    filtroRegiaoSelect.addEventListener('change', filtrarPlanetas);
    buscaSetorInput.addEventListener('input', filtrarPlanetas);
});