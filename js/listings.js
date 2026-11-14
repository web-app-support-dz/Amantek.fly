/* Annonces */

      (function () {
        var page = document.getElementById('page-listings');
        if (!('IntersectionObserver' in window)) return;      // sans support : tout reste visible
        page.classList.add('ls-ready');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              var siblings = Array.prototype.slice.call(e.target.parentNode.children).filter(function (x) { return x.style.display !== 'none'; });
              e.target.style.transitionDelay = ((siblings.indexOf(e.target) % 3) * 110) + 'ms';
              e.target.classList.add('is-visible'); io.unobserve(e.target);
            }
          });
        }, { threshold: 0.12 });
        page.querySelectorAll('.ls-rev').forEach(function (r) { io.observe(r); });
      })();
