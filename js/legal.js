/* CGU / Confidentialité */

      (function () {
        var page = document.getElementById('page-cgu');
        var btns = Array.prototype.slice.call(page.querySelectorAll('.cg-toc-b'));
        btns.forEach(function (b) {
          b.addEventListener('click', function () {
            var t = document.getElementById(b.getAttribute('data-t'));
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
        var ticking = false;
        function spy() {
          ticking = false;
          if (!page.offsetParent) return;
          var cur = 0;
          btns.forEach(function (b, i) {
            var t = document.getElementById(b.getAttribute('data-t'));
            if (t && t.getBoundingClientRect().top <= 170) cur = i;
          });
          btns.forEach(function (b, i) { b.classList.toggle('on', i === cur); });
        }
        window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
        setTimeout(spy, 150);

        if (!('IntersectionObserver' in window)) return;
        page.classList.add('cg-ready');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
          });
        }, { threshold: 0.1 });
        page.querySelectorAll('.cg-rev').forEach(function (r) { io.observe(r); });
      })();

      (function () {
        var page = document.getElementById('page-privacy');
        /* sommaire : défilement doux + section active (fonctionne même sans IntersectionObserver) */
        var btns = Array.prototype.slice.call(page.querySelectorAll('.pv-toc-b'));
        btns.forEach(function (b) {
          b.addEventListener('click', function () {
            var t = document.getElementById(b.getAttribute('data-t'));
            if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        });
        var ticking = false;
        function spy() {
          ticking = false;
          if (!page.offsetParent) return;
          var cur = 0;
          btns.forEach(function (b, i) {
            var t = document.getElementById(b.getAttribute('data-t'));
            if (t && t.getBoundingClientRect().top <= 170) cur = i;
          });
          btns.forEach(function (b, i) { b.classList.toggle('on', i === cur); });
        }
        window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
        setTimeout(spy, 150);

        /* apparition au scroll */
        if (!('IntersectionObserver' in window)) return;
        page.classList.add('pv-ready');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
          });
        }, { threshold: 0.1 });
        page.querySelectorAll('.pv-rev').forEach(function (r) { io.observe(r); });
      })();
