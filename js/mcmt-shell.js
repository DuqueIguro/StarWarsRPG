/* mcmt-shell.js — cabeçalho e rodapé únicos para todas as páginas MCMT.
   Uso: logo após <div class="aurebesh-bg">, adicione:
   <script src="../js/mcmt-shell.js" data-active="droids"></script>
   data-active = oficina | servicos | droids | tripulantes | fornecedores | lexico */
(function () {
  var script = document.currentScript;
  var active = (script && script.dataset.active) || '';

  var LINKS = [
    ['inicio',       '../menu',        'Início'],
    ['oficina',      'oficina',        'Oficina'],
    ['servicos',     'servicosMCMT',   'Serviços'],
    ['inventario',   'inventarioOficina',     'Inventário'],
    ['tripulantes',  'tripulantes',    'Tripulantes'],
    ['droids',       'droids',         'Droids'],
    ['fornecedores', 'fornecedores',   'Fornecedores'],
    ['lexico',       'siglas',         'Léxico']
  ];

  var nav = LINKS.map(function (l) {
    var cur = l[0] === active;
    return '<li><a href="' + l[1] + '"' + (cur ? ' class="active" aria-current="page"' : '') + '>' + l[2] + '</a></li>';
  }).join('');

  var header =
    '<header class="mcmt-header">' +
      '<div class="logo">' +
        '<span class="logo-aurebesh">engrenagem mestra</span>' +
        '<span>Oficina Dur\'toc · MCMT</span>' +
      '</div>' +
      '<nav aria-label="Navegação MCMT"><ul class="mcmt-nav">' + nav + '</ul></nav>' +
    '</header>';

  var footer =
    '<footer class="mcmt-footer">' +
      '<span>Engrenagem Mestra · A Brigada das Catracas</span>' +
      '<span class="footer-aurebesh">engrenagem mestra</span>' +
      '<span>Dur\'toc · Comandante</span>' +
    '</footer>';

  script.insertAdjacentHTML('afterend', header);

  document.addEventListener('DOMContentLoaded', function () {
    var wrap = document.querySelector('.mcmt-wrapper');
    if (wrap && !document.querySelector('.mcmt-footer')) wrap.insertAdjacentHTML('afterend', footer);
  });
})();
