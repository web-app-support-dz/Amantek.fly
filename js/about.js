/* À propos */

      (function () {
        var page = document.getElementById('page-about');
        if (!('IntersectionObserver' in window)) return;      // sans support : tout reste visible
        page.classList.add('ab-ready');

        /* apparition au scroll */
        var revs = page.querySelectorAll('.ab-rev');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
          });
        }, { threshold: 0.12 });
        revs.forEach(function (r) { io.observe(r); });

        /* compteurs animés (se terminent exactement sur le texte d'origine) */
        var nums = page.querySelectorAll('.num[data-count]');
        var co = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var el = e.target, end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec, 10) || 0, suf = el.dataset.suf || '';
            var final = el.textContent, t0 = null, dur = 1600;
            function step(t) {
              if (!t0) t0 = t;
              var p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
              el.textContent = p < 1 ? v.toFixed(dec) + suf : final;
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            co.unobserve(el);
          });
        }, { threshold: 0.6 });
        nums.forEach(function (n) { co.observe(n); });
      })();
