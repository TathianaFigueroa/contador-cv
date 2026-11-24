// Purpose: count the box's characters against 500, show the over-limit message, and clear the box with undo intact (REQ-001, REQ-002, REQ-003).
// Nothing is sent or stored anywhere (CON-001): no network call, no storage, no change to the address or title.
'use strict';

(function () {
  var LIMITE = 500;
  var caja = document.getElementById('resumen');
  var contador = document.getElementById('contador');
  var aviso = document.getElementById('aviso');
  var borrar = document.getElementById('borrar');
  var raiz = document.documentElement;

  // On a browser without grapheme segmentation, show neither a count nor the message (CON-004, A-019).
  var segmentador = (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function')
    ? new Intl.Segmenter('es', { granularity: 'grapheme' })
    : null;

  // A grapheme whose first character is a letter, a number, a mark, an emoji or a keycap base (# *)
  // counts as one. Anything else (a space, a tab, a symbol, a prepended mark) followed by a
  // combining mark, joiner or modifier counts each of its parts on its own (A-001 as restated, D-017).
  var BASE = /^[\p{L}\p{N}\p{M}\p{Extended_Pictographic}\p{Regional_Indicator}#*]/u;

  function contar(texto) {
    var total = 0;
    var it = segmentador.segment(texto)[Symbol.iterator]();
    for (var paso = it.next(); !paso.done; paso = it.next()) {
      var g = paso.value.segment;
      if (g === '\r\n' || g.length === 1 || BASE.test(g)) {
        total += 1;
      } else {
        total += Array.from(g).length;
      }
    }
    return total;
  }

  function actualizar() {
    if (!segmentador) {
      contador.textContent = '';
      aviso.hidden = true;
      raiz.classList.remove('excedido');
      return;
    }
    var n;
    try {
      n = contar(caja.value);
    } catch (e) {
      contador.textContent = '';
      aviso.hidden = true;
      raiz.classList.remove('excedido');
      return;
    }
    contador.textContent = String(n) + ' / ' + LIMITE;
    var excedido = n > LIMITE;
    aviso.hidden = !excedido;
    raiz.classList.toggle('excedido', excedido);
  }

  // Every change to the text, whatever made it, arrives as an input event (RULE-002).
  caja.addEventListener('input', actualizar);
  caja.addEventListener('compositionend', actualizar);

  // Clear through the browser's own editing path so that undo brings the text back (REQ-003, D-004).
  borrar.addEventListener('click', function () {
    caja.focus();
    if (caja.value.length > 0) {
      caja.select();
      var hecho = false;
      try {
        hecho = document.execCommand('delete', false);
      } catch (e) {
        hecho = false;
      }
      if (!hecho) {
        caja.setRangeText('', 0, caja.value.length, 'start');
      }
    }
    actualizar();
  });

  // A dropped file must never replace the page and lose the summary.
  function esArchivo(e) {
    var tipos = e.dataTransfer && e.dataTransfer.types;
    return !!tipos && Array.prototype.indexOf.call(tipos, 'Files') !== -1;
  }
  document.addEventListener('dragover', function (e) {
    if (esArchivo(e)) { e.preventDefault(); }
  });
  document.addEventListener('drop', function (e) {
    if (esArchivo(e)) { e.preventDefault(); }
  });

  // Back from another page via the back-forward cache: the box opens empty (CON-002, D-005).
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      caja.value = '';
    }
    actualizar();
  });

  // Text typed while this script was still loading is kept and counted at once (ROW-043).
  actualizar();
})();
