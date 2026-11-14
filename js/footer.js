/* Footer */

    (function () {
      var f = document.getElementById('ft-footer');
      if (!('IntersectionObserver' in window)) return;
      f.classList.add('ft-ready');
      var cols = f.querySelectorAll('.ft-col');
      cols.forEach(function (c, i) { c.style.transitionDelay = (i * 120) + 'ms'; });
      var io = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) { f.classList.add('is-visible'); io.disconnect(); }
      }, { threshold: 0.15 });
      io.observe(f.querySelector('.ft-grid'));
    })();
