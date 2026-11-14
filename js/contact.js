/* Contact */

      (function () {
        var page = document.getElementById('page-contact');
        if (!('IntersectionObserver' in window)) return;
        page.classList.add('ct-ready');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              var sib = Array.prototype.slice.call(e.target.parentNode.children).filter(function (x) { return x.classList.contains('ct-rev'); });
              e.target.style.transitionDelay = (sib.indexOf(e.target) * 110) + 'ms';
              e.target.classList.add('is-visible'); io.unobserve(e.target);
            }
          });
        }, { threshold: 0.1 });
        page.querySelectorAll('.ct-rev').forEach(function (r) { io.observe(r); });
      })();
