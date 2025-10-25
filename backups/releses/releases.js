// releses/releases.js

document.addEventListener('DOMContentLoaded', () => {
    // Carrega todos os JSONs em paralelo para mais eficiência
    Promise.all([
        fetch('releses/patch_notes.json').then(res => res.json()),
        fetch('releses/bug_fixes.json').then(res => res.json()),
        fetch('releses/upcoming_features.json').then(res => res.json()),
        fetch('releses/features.json').then(res => res.json())
    ]).then(([patchData, bugData, upcomingData, featuresData]) => {
        loadPatchNotes(patchData);
        loadItemList(bugData, 'bug-fixes-list');
        loadItemList(upcomingData, 'upcoming-features-list');
        loadItemList(featuresData, 'features-list');
    }).catch(error => {
        console.error('Falha ao carregar os dados de release:', error);
        const grid = document.querySelector('.releases-grid');
        if (grid) {
            grid.innerHTML = `<p style="color: #ff4d4d; text-align: center; grid-column: 1 / -1;">Erro ao carregar o log de releases. Arquivos de dados podem estar ausentes ou corrompidos.</p>`;
        }
    });
});

function loadPatchNotes(data) {
    const container = document.getElementById('patch-notes-container');
    if (!container || !data || data.length === 0) return;

    container.innerHTML = '';
    data.forEach(release => {
        // Cabeçalho da versão
        const header = document.createElement('div');
        header.classList.add('patch-header');
        header.innerHTML = `
            <span class="patch-version">${release.version}</span>
            <span class="patch-date">${release.date}</span>
        `;

        // Lista de notas
        const list = document.createElement('ul');
        list.classList.add('item-list');
        release.notes.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="item-title">${item.title}</span>
                <span class="item-description">${item.description}</span>
            `;
            list.appendChild(listItem);
        });

        // Adiciona ao container
        container.appendChild(header);
        container.appendChild(list);
    });
}

function loadItemList(data, listId) {
    const list = document.getElementById(listId);
    if (!list || !data) return;

    list.innerHTML = ''; // Limpa a lista
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="item-title">${item.title}</span>
            <span class="item-description">${item.description}</span>
        `;
        list.appendChild(listItem);
    });
}