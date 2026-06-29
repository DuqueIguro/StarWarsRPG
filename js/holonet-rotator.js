/* ========================================================
   HNN PRINCIPAL ROTATOR — Sistema de Alternância Automática
   ======================================================== */
'use strict';

// Configurações do Rotador
const ROTATOR_CONFIG = {
  intervaloSegundos: 5, // Altere aqui o tempo de troca (X segundos)
  pausarNoModal: false    // Pausa a rotação se o modal de detalhes estiver aberto
};

let rotatorInterval = null;
let noticiaAtualId = null;

function getNoticiasAtivas() {
  const dadosGerais = window.__HNN_DATA__;
  if (!dadosGerais || !dadosGerais.noticias) return [];

  const categoriaAtiva = document.querySelector('.hnn-nav-btn.active')?.dataset.cat || 'TODOS';
  const lista = categoriaAtiva === 'TODOS'
    ? [...dadosGerais.noticias]
    : dadosGerais.noticias.filter(n => n.categoria === categoriaAtiva);

  return lista.sort((a, b) => Number(a.id) - Number(b.id));
}

/**
 * Avança para a próxima notícia com base nas regras de filtro atuais do HNN
 */
function alternarNoticiaPrincipal() {
  if (ROTATOR_CONFIG.pausarNoModal) {
    const modalOverlay = document.getElementById('hnn-modal-overlay');
    if (modalOverlay && modalOverlay.classList.contains('open')) {
      return;
    }
  }

  const noticiasAtivas = getNoticiasAtivas();
  if (noticiasAtivas.length <= 1) return;

  const cardDestaque = document.querySelector('.hnn-featured-card');
  const idAtual = cardDestaque?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || noticiaAtualId;
  const indiceAtual = noticiasAtivas.findIndex(n => n.id === idAtual);
  const proximoIndice = indiceAtual >= 0
    ? (indiceAtual + 1) % noticiasAtivas.length
    : 0;

  const proximaNoticia = noticiasAtivas[proximoIndice];
  if (!proximaNoticia) return;

  noticiaAtualId = proximaNoticia.id;
  atualizarDestaquePeloId(proximaNoticia.id);
}

/**
 * Busca a notícia nos dados globais armazenados ou injetados e atualiza o DOM do Destaque
 */
function atualizarDestaquePeloId(id) {
  // Busca a notícia diretamente da lista global que o HNN expõe ou que está acessível
  // Vamos usar um truque limpo: simular o clique ou reconstruir o card.
  // Como o holonet.js original não expõe a lista 'dados', nós podemos ler os dados do Fallback
  // ou simplesmente disparar uma requisição cacheada rápida ao JSON se necessário.
  
  // Para máxima performance, vamos ler do cache local criado no window durante o fetch original
  // Modificação recomendada: No seu holonet.js original, salve os dados em window.__HNN_DATA__ assim que carregar!
  const dadosGerais = window.__HNN_DATA__;
  if (!dadosGerais || !dadosGerais.noticias) return;

  const n = dadosGerais.noticias.find(item => item.id === id);
  if (!n) return;

  const featured = document.getElementById('hnn-featured');
  if (!featured) return;

  // Mapeamento de classes idêntico ao seu holonet.js
  const CATEGORIA_CLASS = {
    'URGENTE': 'urgente', 'POLÍTICA': 'politica', 'ECONOMIA': 'economia',
    'CONFLITO': 'conflito', 'TECNOLOGIA': 'tecnologia', 'VARIEDADES': 'variedades'
  };
  const cls = CATEGORIA_CLASS[n.categoria] || 'urgente';
  const isUrgente = n.categoria === 'URGENTE' ? 'urgente-card' : '';

  // Efeito visual de transição simples (Fade In)
  featured.style.transition = 'opacity 0.3s ease';
  featured.style.opacity = '0.3';

  setTimeout(() => {
    featured.innerHTML = `
      <article class="hnn-featured-card ${isUrgente}" onclick="HNN.abrirModal('${n.id}')">
        <div class="corner-tl"></div>
        <div class="corner-br"></div>
        <span class="hnn-cat-badge ${cls}">${n.icone} ${n.categoria}</span>
        <h2 class="hnn-featured-title">${n.titulo}</h2>
        <p class="hnn-featured-sub">${n.subtitulo}</p>
        <p class="hnn-featured-body">${n.corpo}</p>
        <div class="hnn-featured-meta">
          <span class="hnn-meta-source">◆ ${n.fonte} — ${n.data}</span>
          <span class="hnn-meta-aure">${n.tag_aurebesh}</span>
        </div>
      </article>
    `;
    featured.style.opacity = '1';
  }, 300);
}

/**
 * Inicializa o Intervalo de Rotação
 */
function iniciarRotador() {
  // Para evitar sobreposição de intervalos antigos
  if (rotatorInterval) clearInterval(rotatorInterval);

  rotatorInterval = setInterval(
    alternarNoticiaPrincipal, 
    ROTATOR_CONFIG.intervaloSegundos * 1000
  );
}

// Inicia após a página e o holonet.js terminarem de montar o DOM principal
document.addEventListener('DOMContentLoaded', () => {
  // Pequeno delay de 500ms para garantir que o fetch do holonet.js concluiu e montou o layout
  setTimeout(iniciarRotador, 500);
});