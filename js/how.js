/* Comment ça marche */

      (function () {
        var page = document.getElementById('page-how');
        if (!('IntersectionObserver' in window)) return;      // sans support : tout reste visible
        page.classList.add('hw-ready');

        /* apparition au scroll */
        var revs = page.querySelectorAll('.hw-rev');
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
          });
        }, { threshold: 0.15 });
        revs.forEach(function (r) { io.observe(r); });

        /* ligne de progression + avion qui descend avec le scroll */
        var tl = page.querySelector('#hw-timeline');
        var line = tl.querySelector('.hw-line'), fill = tl.querySelector('.hw-fill'), plane = tl.querySelector('.hw-plane');
        var nodes = Array.prototype.slice.call(tl.querySelectorAll('.hw-node'));
        var ticking = false;

        function update() {
          ticking = false;
          if (!tl.offsetParent) return;                        // page masquée
          var r = tl.getBoundingClientRect();
          var a = nodes[0].getBoundingClientRect(), z = nodes[nodes.length - 1].getBoundingClientRect();
          var top = a.top + a.height / 2 - r.top, bot = z.top + z.height / 2 - r.top;
          line.style.top = top + 'px'; line.style.height = (bot - top) + 'px';
          var mid = window.innerHeight * 0.55;
          var prog = Math.max(0, Math.min(bot - top, mid - (r.top + top)));
          fill.style.height = prog + 'px'; plane.style.top = prog + 'px';
          nodes.forEach(function (n) {
            var c = n.getBoundingClientRect();
            n.classList.toggle('hw-active', c.top + c.height / 2 <= mid);
          });
        }
        function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
        window.addEventListener('scroll', req, { passive: true });
        window.addEventListener('resize', req);
        new IntersectionObserver(function (e) { if (e[0].isIntersecting) req(); }).observe(tl);
        setTimeout(req, 150);
      })();
