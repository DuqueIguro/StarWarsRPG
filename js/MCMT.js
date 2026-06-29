/* =============================================
   MCMT.js — Engrenagem Mestra Shared Logic
   ============================================= */

'use strict';

// ── Aurebesh watermark generator ──────────────────────────────────────────
(function () {
  const bg = document.querySelector('.aurebesh-bg');
  if (!bg) return;
  const lorem =
    'dur toc engrenagem mestra brigada das catracas ryloth coruscant ' +
    'kalicore tino vok comboio bruto cinzel moedor engenharia mecanica ' +
    'hyperdrive reparo nave oficina droids sistemas propulsao armamento ';
  let text = '';
  while (text.length < 3000) text += lorem;
  bg.textContent = text;
})();

// ── Modal logic ────────────────────────────────────────────────────────────
const MCMT = (() => {
  const overlay = document.getElementById('mcmt-modal-overlay');
  const modalImg      = document.getElementById('modal-img');
  const modalEyebrow  = document.getElementById('modal-eyebrow');
  const modalTitle    = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody     = document.getElementById('modal-body');

  function open(data) {
    if (!overlay) return;

    modalImg.src = data.img || '';
    modalImg.alt = data.name || '';
    modalEyebrow.textContent  = data.designation || '';
    modalTitle.textContent    = data.name || '';
    modalSubtitle.textContent = data.alias ? `"${data.alias}"` : (data.role || '');

    // Build body HTML
    let html = '';

    if (data.personality) {
      html += `<p class="modal-section-label">Personalidade</p>`;
      html += `<div class="trait-list">${
        data.personality.map(t => `<span class="trait">${t}</span>`).join('')
      }</div>`;
    }

    if (data.role) {
      html += `<p class="modal-section-label">Função</p>
               <p class="modal-desc">${data.role}</p>`;
    }

    if (data.specialty) {
      html += `<p class="modal-section-label">Especialidade</p>
               <p class="modal-desc">${data.specialty}</p>`;
    }

    if (data.context) {
      html += `<p class="modal-section-label">Histórico</p>
               <p class="modal-desc">${data.context}</p>`;
    }

    if (data.specs && data.specs.length) {
      html += `<p class="modal-section-label">Ficha Técnica</p>
               <table class="spec-table">
                 ${data.specs.map(([k, v]) =>
                   `<tr><td>${k}</td><td>${v}</td></tr>`
                 ).join('')}
               </table>`;
    }

    if (data.aboard) {
      html += `<p class="modal-section-label">A bordo da Engrenagem Mestra</p>
               <p class="modal-desc">${data.aboard}</p>`;
    }

    modalBody.innerHTML = html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Close on overlay click or Escape
  if (overlay) {
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  return { open, close };
})();