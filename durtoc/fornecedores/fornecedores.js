document.addEventListener('DOMContentLoaded', () => {
    const listaFornecedoresContainer = document.getElementById('lista-fornecedores');
    const mensagemNenhumResultado = document.getElementById('mensagem-nenhum-resultado');
    
    // Inputs de filtro
    const buscaNomeInput = document.getElementById('busca-nome');
    const buscaRacaInput = document.getElementById('busca-raca');
    const buscaPlanetaInput = document.getElementById('busca-planeta');
    const filtroQualidadeSelect = document.getElementById('filtro-qualidade');

    let todosFornecedores = [];

    // Carregar dados do JSON
    fetch('fornecedores/fornecedores.json')
        .then(response => response.json())
        .then(data => {
            const { ruins, normais, bons, excelentes } = data.fornecedores;
            todosFornecedores = [...ruins, ...normais, ...bons, ...excelentes];

            // Ordena a lista principal em ordem alfabética pelo nome
            todosFornecedores.sort((a, b) => a.nome.localeCompare(b.nome));
            exibirFornecedores(todosFornecedores);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados dos fornecedores:', error);
            mensagemNenhumResultado.textContent = 'Erro ao carregar dados. Tente recarregar a página.';
            mensagemNenhumResultado.style.display = 'block';
        });

    // Função para exibir os fornecedores na página
    function exibirFornecedores(fornecedores) {
        listaFornecedoresContainer.innerHTML = '';
        if (fornecedores.length === 0) {
            mensagemNenhumResultado.style.display = 'block';
            return;
        }
        mensagemNenhumResultado.style.display = 'none';

        fornecedores.forEach(fornecedor => {
            const card = document.createElement('div');
            card.className = 'fornecedor-card';

            card.innerHTML = `
                <h2>${fornecedor.nome}</h2>
                <div class="info-principal">
                    <span>${fornecedor.raca}</span> de <span>${fornecedor.planeta}</span>
                </div>
                <div class="quote-box">
                    <p>"${fornecedor.frase_principal}"</p>
                </div>
                <div class="info-grid">
                    <div class="info-box">
                        <strong>Qualidade</strong>
                        <span>${fornecedor.qualidade}</span>
                    </div>
                    <div class="info-box">
                        <strong>Preço</strong>
                        <span>${fornecedor.preco}</span>
                    </div>
                </div>
            `;
            listaFornecedoresContainer.appendChild(card);
        });
    }

    // Função para filtrar os fornecedores
    function filtrarFornecedores() {
        const nomeQuery = buscaNomeInput.value.toLowerCase();
        const racaQuery = buscaRacaInput.value.toLowerCase();
        const planetaQuery = buscaPlanetaInput.value.toLowerCase();
        const qualidadeQuery = filtroQualidadeSelect.value;

        const fornecedoresFiltrados = todosFornecedores.filter(fornecedor => {
            const nomeMatch = fornecedor.nome.toLowerCase().includes(nomeQuery);
            const racaMatch = fornecedor.raca.toLowerCase().includes(racaQuery);
            const planetaMatch = fornecedor.planeta.toLowerCase().includes(planetaQuery);
            const qualidadeMatch = qualidadeQuery === '' || fornecedor.qualidade.startsWith(qualidadeQuery);

            return nomeMatch && racaMatch && planetaMatch && qualidadeMatch;
        });

        exibirFornecedores(fornecedoresFiltrados);
    }

    // Adicionar listeners para os filtros
    buscaNomeInput.addEventListener('input', filtrarFornecedores);
    buscaRacaInput.addEventListener('input', filtrarFornecedores);
    buscaPlanetaInput.addEventListener('input', filtrarFornecedores);
    filtroQualidadeSelect.addEventListener('change', filtrarFornecedores);
});