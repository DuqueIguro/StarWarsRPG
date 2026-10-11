/* tripulantes.js — gera os cards e a ficha (modal) a partir de tripulantes.json.
   Para editar a lore, mexa só no JSON. Use **texto** para destacar trechos. */
(function () {
  'use strict';

  var DATA_URL = 'tripulantes/tripulantes.json';
  var IMG_DIR = '../img/tripulantes/';

  var grid = document.getElementById('crew-grid');
  var countEl = document.getElementById('crew-count');
  var overlay = document.getElementById('crew-overlay');
  var closeBtn = document.getElementById('crew-close');
  var photosEl = document.getElementById('crew-photos');
  var eyebrowEl = document.getElementById('crew-eyebrow');
  var titleEl = document.getElementById('crew-title');
  var subtitleEl = document.getElementById('crew-subtitle');
  var bodyEl = document.getElementById('crew-body');

  var lastFocus = null;

  /* ---------- utilidades ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // escapa o texto e só depois converte **trecho** em destaque
  function rich(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="highlight">$1</span>');
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function displayName(t) {
    return t.apelido ? t.nome + ' \u201C' + t.apelido + '\u201D' : t.nome;
  }

  function photo(file, alt) {
    var img = new Image();
    img.alt = alt;
    img.loading = 'lazy';
    img.addEventListener('error', function () {
      img.replaceWith(el('div', 'img-missing', 'Arquivo corrompido'));
    }, { once: true });
    img.src = IMG_DIR + file;
    return img;
  }

  /* ---------- cards ---------- */
  function buildCard(t) {
    var card = el('article', 'mcmt-card');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Abrir ficha de ' + displayName(t));

    var wrap = el('div', 'card-img-wrap');
    wrap.appendChild(photo(t.imgAtual, t.nome + ' — registro atual'));

    var body = el('div', 'card-body');
    body.appendChild(el('p', 'card-designation', t.setor));
    body.appendChild(el('h2', 'card-name', displayName(t)));
    body.appendChild(el('p', 'card-alias', 'Antes: ' + t.anterior.cargo));
    body.appendChild(el('p', 'card-role', t.atual.cargo));

    card.appendChild(wrap);
    card.appendChild(body);

    card.addEventListener('click', function () { openModal(t, card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(t, card);
      }
    });
    return card;
  }

  /* ---------- modal ---------- */
  function figure(file, caption, alt) {
    var f = el('figure', 'crew-photo');
    f.appendChild(photo(file, alt));
    f.appendChild(el('figcaption', '', caption));
    return f;
  }

  function section(label, role) {
    var html = '<div class="modal-section-label">' + esc(label) + ' · ' + esc(role.cargo) + '</div>';
    role.texto.forEach(function (p) { html += '<p class="modal-desc">' + rich(p) + '</p>'; });
    return html;
  }

  function openModal(t, trigger) {
    lastFocus = trigger || document.activeElement;

    photosEl.replaceChildren(
      figure(t.imgAntiga, '[ Registro antigo ]', t.nome + ' — registro antigo (pré 9 anos)'),
      figure(t.imgAtual, '[ Registro atual ]', t.nome + ' — registro atual (pós 9 anos)')
    );

    eyebrowEl.textContent = 'Tripulante · ' + t.setor;
    titleEl.textContent = t.nome;
    subtitleEl.textContent = t.apelido ? '\u201C' + t.apelido + '\u201D' : '';
    subtitleEl.hidden = !t.apelido;
    bodyEl.innerHTML = section('Função anterior', t.anterior) + section('Função atual', t.atual);

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.mcmt-modal').scrollTop = 0;
    closeBtn.focus();
  }

  function closeModal() {
    if (!overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ---------- carga dos dados ---------- */
  fetch(DATA_URL)
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var lista = data.tripulantes || [];
      grid.replaceChildren();
      lista.forEach(function (t) { grid.appendChild(buildCard(t)); });
      countEl.textContent = lista.length;
      if (!lista.length) grid.appendChild(el('p', 'crew-status', 'Nenhum tripulante registrado.'));
    })
    .catch(function (err) {
      console.error('Falha ao carregar tripulantes:', err);
      grid.replaceChildren(el('p', 'crew-status', 'Não foi possível carregar os registros da tripulação.'));
    });
})();
