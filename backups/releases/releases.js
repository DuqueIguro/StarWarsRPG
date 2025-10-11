// releases/releases.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('releses/releases.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const releaseContainer = document.getElementById('release-container');
            if (releaseContainer) {
                releaseContainer.innerHTML = ''; // Limpa o container antes de adicionar novo conteúdo
                data.forEach(release => {
                    const releaseElement = createReleaseElement(release);
                    releaseContainer.appendChild(releaseElement);
                });
            }
        })
        .catch(error => {
            console.error('Houve um problema ao buscar o arquivo de releases:', error);
            const releaseContainer = document.getElementById('release-container');
            if(releaseContainer) {
                releaseContainer.innerHTML = `<p style="color: #ff4d4d; text-align: center;">Erro ao carregar o log de releases. Por favor, tente novamente mais tarde.</p>`;
            }
        });
});

function createReleaseElement(release) {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('release-entry');

    // Cabeçalho da Release
    const header = document.createElement('div');
    header.classList.add('release-header');
    header.innerHTML = `
        <span class="release-version">${release.version}</span>
        <span class="release-date">${release.date}</span>
    `;
    entryDiv.appendChild(header);

    // Seção de Patch Notes
    if (release.patchNotes && release.patchNotes.length > 0) {
        entryDiv.appendChild(createSection('Patch Notes', release.patchNotes));
    }

    // Seção de Correção de Bugs
    if (release.bugFixes && release.bugFixes.length > 0) {
        entryDiv.appendChild(createSection('Priority Bug Fixes', release.bugFixes));
    }

    // Seção de Próximas Funcionalidades
    if (release.upcomingFeatures && release.upcomingFeatures.length > 0) {
        entryDiv.appendChild(createSection('Upcoming Features', release.upcomingFeatures));
    }

    return entryDiv;
}

function createSection(title, items) {
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('release-section');

    const sectionTitle = document.createElement('h2');
    sectionTitle.classList.add('section-title');
    sectionTitle.textContent = title;
    sectionDiv.appendChild(sectionTitle);

    const list = document.createElement('ul');
    list.classList.add('section-list');

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="item-title">${item.title}</span>
            <span class="item-description">${item.description}</span>
        `;
        list.appendChild(listItem);
    });

    sectionDiv.appendChild(list);
    return sectionDiv;
}