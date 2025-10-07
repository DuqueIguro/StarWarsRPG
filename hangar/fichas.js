document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os cabeçalhos que podem ser clicados para expandir/recolher
    const allCollapsibleHeaders = document.querySelectorAll('.terminal-header-collapsible');

    allCollapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // O conteúdo a ser expandido/recolhido é o próximo elemento irmão do cabeçalho
            const content = header.nextElementSibling;
            // O texto de prompt (Ex: "// Exibir Dados...")
            const prompt = header.querySelector('.toggle-prompt');

            // Verifica se o conteúdo está recolhido
            if (content.classList.contains('collapsed')) {
                // Se estiver, remove a classe para exibi-lo
                content.classList.remove('collapsed');
                if (prompt) {
                    // Altera o texto para indicar que pode ser fechado
                    const closeText = '// Ocultar Dados...';
                    prompt.textContent = closeText;
                }
            } else {
                // Se estiver expandido, adiciona a classe para recolhê-lo
                content.classList.add('collapsed');
                if (prompt) {
                    // Restaura o texto original
                    const originalText = '// Exibir Dados...';
                    prompt.textContent = originalText;
                }
            }
        });
    });
});