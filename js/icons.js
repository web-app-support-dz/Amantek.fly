/* Initialisation des icônes Lucide */

    // Rend toutes les balises <i data-lucide="..."> en icônes SVG Lucide.
    // Attributs par défaut conformes à l'identité : stroke 2px, arrondi, sans remplissage.
    function renderAmanTekIcons() {
      if (window.lucide) {
        lucide.createIcons({
          attrs: {
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          }
        });
      }
    }
    renderAmanTekIcons();
    // Ré-applique les icônes après chaque changement de page (SPA go()) ou de langue
    var _amantekOrigGo = window.go;
    if (typeof _amantekOrigGo === 'function') {
      window.go = function() { _amantekOrigGo.apply(this, arguments); renderAmanTekIcons(); };
    }
    document.addEventListener('DOMContentLoaded', renderAmanTekIcons);
