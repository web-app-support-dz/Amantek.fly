/* Accueil */

    (function () {
      var sec = document.getElementById('why-section');
      var cards = sec.querySelectorAll('.why-card');
      if (!('IntersectionObserver' in window)) return;      // sans support : cartes visibles normalement
      sec.classList.add('why-ready');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var i = Array.prototype.indexOf.call(cards, e.target);
            e.target.style.transitionDelay = (i * 120) + 'ms';   // apparition l'une après l'autre
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      cards.forEach(function (c) { io.observe(c); });
    })();

    (function () {
      var sec = document.getElementById('how-section');
      if (!('IntersectionObserver' in window)) return;     // sans support : tout reste visible
      sec.classList.add('how-ready');
      var steps = sec.querySelectorAll('.how-step');
      steps.forEach(function (s, i) { s.style.transitionDelay = (i * 150) + 'ms'; });
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { sec.classList.add('is-visible'); io.disconnect(); }
      }, { threshold: 0.2 });
      io.observe(sec.querySelector('.how-steps'));
    })();

    (function () {
      var sec = document.getElementById('tm-section');
      if (!('IntersectionObserver' in window)) return;
      sec.classList.add('tm-ready');
      var cards = sec.querySelectorAll('.tm-card');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var i = Array.prototype.indexOf.call(cards, e.target);
            e.target.style.transitionDelay = (i * 140) + 'ms';
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.15 });
      cards.forEach(function (c) { io.observe(c); });
    })();
