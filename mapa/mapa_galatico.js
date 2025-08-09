document.addEventListener('DOMContentLoaded', () => {
    const mapaGalactico = document.getElementById('mapa-galactico');
    const buscaPlanetaInput = document.getElementById('busca-planeta');
    const filtroRegiaoSelect = document.getElementById('filtro-regiao');
    const buscaSetorInput = document.getElementById('busca-setor');
    const mensagemNenhumResultado = document.getElementById('mensagem-nenhum-resultado');
    
    let planetasData = [];

    // Carregar dados do JSON (COM O CAMINHO CORRIGIDO)
    fetch('mapa/planetas_database.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
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
            card.innerHTML = `
                <h2>${planeta.nome}</h2>
                <p class="regiao">${planeta.regiao} - ${planeta.setor}</p>
                <p>${planeta.descricao}</p>
                <div class="info-grid">
                    <div class="info-item"><strong>Sistema:</strong> <span>${planeta.sistema}</span></div>
                    <div class="info-item"><strong>Governo:</strong> <span>${planeta.governo}</span></div>
                    <div class="info-item"><strong>Afiliação:</strong> <span>${planeta.afiliacao}</span></div>
                    <div class="info-item"><strong>Espécies Principais:</strong> <span>${planeta.principais_especies.join(', ')}</span></div>
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

        const planetasFiltrados = planetasData.filter(planeta => {
            const matchPlaneta = planeta.nome.toLowerCase().includes(termoPlaneta);
            const matchRegiao = regiaoSelecionada === '' || planeta.regiao === regiaoSelecionada;
            const matchSetor = planeta.setor.toLowerCase().includes(termoSetor);
            return matchPlaneta && matchRegiao && matchSetor;
        });

        renderizarPlanetas(planetasFiltrados);
    }

    // Adicionar listeners para os filtros
    buscaPlanetaInput.addEventListener('input', filtrarPlanetas);
    filtroRegiaoSelect.addEventListener('change', filtrarPlanetas);
    buscaSetorInput.addEventListener('input', filtrarPlanetas);
});