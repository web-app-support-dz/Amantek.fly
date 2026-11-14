/* FAQ */

      (function () {
        var page = document.getElementById('page-faq');
        if (!('IntersectionObserver' in window)) return;
        page.classList.add('fq-ready');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              var all = Array.prototype.slice.call(page.querySelectorAll('.fq-rev'));
              e.target.style.transitionDelay = ((all.indexOf(e.target) % 4) * 80) + 'ms';
              e.target.classList.add('is-visible'); io.unobserve(e.target);
            }
          });
        }, { threshold: 0.1 });
        page.querySelectorAll('.fq-rev').forEach(function (r) { io.observe(r); });
      })();
