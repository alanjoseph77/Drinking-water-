(function () {
  // Close the mobile menu after a nav link is clicked
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
  });

  var counters = document.querySelectorAll('[data-count]');
  function showFinalCounts() {
    counters.forEach(function (el) { el.textContent = el.dataset.count; });
  }

  // If GSAP failed to load, show the content without animating it
  if (!window.gsap || !window.ScrollTrigger) { showFinalCounts(); return; }

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });

  // Add a shadow to the sticky header once the page scrolls
  ScrollTrigger.create({
    start: 60,
    end: 'max',
    toggleClass: { targets: '.site-header', className: 'scrolled' }
  });

  var mm = gsap.matchMedia();

  // Visitors who prefer reduced motion get the final state with no animation
  mm.add('(prefers-reduced-motion: reduce)', showFinalCounts);

  mm.add({
    isDesktop: '(min-width: 901px)',
    isMobile: '(max-width: 900px)',
    motionOK: '(prefers-reduced-motion: no-preference)'
  }, function (ctx) {
    var c = ctx.conditions;
    if (!c.motionOK) return;

    /* ---------- HERO INTRO TIMELINE ---------- */
    var intro = gsap.timeline({ defaults: { duration: 1 } });
    intro
      .from('.nav-row > *', { y: -30, autoAlpha: 0, stagger: 0.08, duration: 0.6 })
      .from('.hero .eyebrow', { y: 20, autoAlpha: 0, duration: 0.7 }, 0.2)
      .from('.hero h1', { y: 50, autoAlpha: 0 }, 0.3)
      .from('.hero .btns .btn', { y: 30, autoAlpha: 0, stagger: 0.12, duration: 0.7 }, 0.6)
      .from('.hero .circle', { scale: 0.4, autoAlpha: 0, ease: 'back.out(1.6)' }, 0.2)
      .from('.hero .b', { y: 120, autoAlpha: 0, stagger: 0.15, ease: 'back.out(1.4)' }, '<0.3');

    // Bottles keep floating gently after the intro
    gsap.utils.toArray('.hero .b').forEach(function (b, i) {
      gsap.to(b, {
        y: '-=12', duration: 2 + i * 0.4, ease: 'sine.inOut',
        repeat: -1, yoyo: true, delay: 1.8 + i * 0.2
      });
    });

    /* ---------- HERO SCROLL PARALLAX (scrubbed) ---------- */
    gsap.to('.hero-img', {
      yPercent: c.isDesktop ? 25 : 10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-text', {
      yPercent: -20, autoAlpha: 0.3,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.blob', {
      yPercent: 30, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    /* ---------- COUNTERS ---------- */
    gsap.utils.toArray('.counter-grid, .ach-grid').forEach(function (grid) {
      var items = grid.querySelectorAll('.counter');
      var nums = grid.querySelectorAll('[data-count]');
      gsap.timeline({ scrollTrigger: { trigger: grid, start: 'top 98%', once: true } })
        .from(items, { y: 40, autoAlpha: 0, stagger: 0.12, duration: 0.7 })
        .from(grid.querySelectorAll('.ic'), { scale: 0, rotation: -90, stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, '<')
        .add(function () {
          nums.forEach(function (el) {
            var o = { v: 0 };
            gsap.to(o, {
              v: +el.dataset.count, duration: 2, ease: 'power2.out',
              onUpdate: function () { el.textContent = Math.round(o.v); }
            });
          });
        }, '<0.2');
    });

    /* ---------- SECTION HEADINGS ---------- */
    gsap.utils.toArray('.section .eyebrow, .section h2, .achieve h3').forEach(function (el) {
      gsap.from(el, {
        y: 40, autoAlpha: 0,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });

    /* ---------- WHY CHOOSE US ---------- */
    var why = gsap.timeline({ scrollTrigger: { trigger: '.why-grid', start: 'top 80%' } });
    why
      .from('.why-glass .glass', { scale: 0.5, autoAlpha: 0, ease: 'back.out(1.5)' })
      .from('.why-grid .why:first-child', { x: c.isDesktop ? -80 : 0, y: c.isDesktop ? 0 : 40, autoAlpha: 0 }, '<0.15')
      .from('.why-grid .why:last-child', { x: c.isDesktop ? 80 : 0, y: c.isDesktop ? 0 : 40, autoAlpha: 0 }, '<')
      .from('.why .sq', { rotation: 180, scale: 0, ease: 'back.out(2)', stagger: 0.1 }, '<0.3');
    // The glass fills gently as you scroll past it
    gsap.fromTo('.why-glass .glass', { yPercent: 10 }, {
      yPercent: -10, ease: 'none',
      scrollTrigger: { trigger: '.why-grid', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    /* ---------- PRODUCT CARDS (batched) ---------- */
    gsap.set('.card', { y: 60, autoAlpha: 0 });
    ScrollTrigger.batch('.card', {
      start: 'top 88%',
      onEnter: function (batch) {
        gsap.to(batch, { y: 0, autoAlpha: 1, stagger: 0.15, overwrite: true });
        gsap.from(batch.map(function (b) { return b.querySelector('.thumb svg'); }), {
          y: 30, rotation: -8, stagger: 0.15, duration: 1.1, ease: 'elastic.out(1, 0.6)'
        });
      },
      onLeaveBack: function (batch) {
        gsap.to(batch, { y: 60, autoAlpha: 0, stagger: 0.05, overwrite: true, duration: 0.4 });
      }
    });

    /* ---------- VIDEO (scrubbed reveal) ---------- */
    gsap.fromTo('.video', { scale: 0.85, borderRadius: 30 }, {
      scale: 1, borderRadius: 2, ease: 'none',
      scrollTrigger: { trigger: '.video', start: 'top 95%', end: 'top 40%', scrub: 1 }
    });
    gsap.fromTo('.people', { yPercent: -8 }, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: '.video', start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.to('.play', { scale: 1.12, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true });

    /* ---------- FEATURE CARDS ---------- */
    gsap.from('.feat', {
      y: 50, autoAlpha: 0, stagger: 0.15,
      scrollTrigger: { trigger: '.feat-grid', start: 'top 92%' }
    });

    /* ---------- EXPERIENCED WORKERS ---------- */
    gsap.timeline({ scrollTrigger: { trigger: '.workers', start: 'top 75%' } })
      .from('.worker-img', { x: c.isDesktop ? -100 : 0, y: c.isDesktop ? 0 : 50, autoAlpha: 0 })
      .from('.clients', { scale: 0, ease: 'back.out(2)' }, '-=0.4')
      .from('.worker-text h3, .worker-text p', { x: c.isDesktop ? 60 : 0, autoAlpha: 0, stagger: 0.12 }, '<-0.2')
      .from('.worker-text li', { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.5 }, '-=0.4')
      .from('.worker-text .btn', { y: 20, autoAlpha: 0, duration: 0.5 }, '-=0.2');
    gsap.fromTo('.man', { yPercent: 6 }, {
      yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: '.workers', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    /* ---------- TESTIMONIALS ---------- */
    gsap.timeline({ scrollTrigger: { trigger: '.testi-grid', start: 'top 80%' } })
      .from('.tcard', { y: 80, autoAlpha: 0, stagger: 0.18 })
      .from('.tcard .av', { scale: 0, ease: 'back.out(2.5)', stagger: 0.18, duration: 0.6 }, '<0.3')
      .from('.tcard .q', { y: 20, rotation: -45, autoAlpha: 0, stagger: 0.18, duration: 0.6 }, '<0.2');

    /* ---------- FOOTER ---------- */
    gsap.from('.foot-grid > div', {
      y: 40, autoAlpha: 0, stagger: 0.12,
      scrollTrigger: { trigger: 'footer', start: 'top 90%' }
    });
  });

  // Recalculate trigger positions once fonts have loaded and changed the layout
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
