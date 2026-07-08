(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Animation engine: Lenis + GSAP ScrollTrigger when available,
     IntersectionObserver fallback otherwise. */
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var hasLenis = typeof window.Lenis !== 'undefined';
  var useGsap = hasGsap && !prefersReducedMotion;
  var useLenis = hasLenis && !prefersReducedMotion;

  if (hasGsap) window.gsap.registerPlugin(window.ScrollTrigger);

  /* ---------------- Theme toggle ---------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var iconSun = document.getElementById('icon-sun');
  var iconMoon = document.getElementById('icon-moon');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
    if (iconSun && iconMoon) {
      iconSun.style.display = theme === 'light' ? 'block' : 'none';
      iconMoon.style.display = theme === 'light' ? 'none' : 'block';
    }
  }

  var storedTheme = null;
  try { storedTheme = localStorage.getItem('theme'); } catch (e) {}
  var initialTheme = storedTheme || 'light';
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------------- Lenis smooth scrolling ---------------- */
  var lenis = null;
  if (useLenis) {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });

    if (useGsap) {
      /* Drive Lenis from GSAP's ticker so ScrollTrigger and the
         smooth scroller share a single clock. */
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      var lenisLoop = function (time) {
        lenis.raf(time);
        window.requestAnimationFrame(lenisLoop);
      };
      window.requestAnimationFrame(lenisLoop);
    }
  }

  /* Route in-page anchors through Lenis for app-like navigation.
     The skip link keeps native behavior for accessibility. */
  document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (!lenis) return;
      var hash = link.getAttribute('href');
      if (!hash || hash.length < 2) return;
      var target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: hash === '#top' ? 0 : -76, duration: 1.3 });
      if (window.history && window.history.pushState) window.history.pushState(null, '', hash);
    });
  });

  /* ---------------- Mobile menu ---------------- */
  var mobileToggle = document.getElementById('mobile-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
      if (lenis) { if (isOpen) lenis.stop(); else lenis.start(); }
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
      });
    });
  }

  /* ---------------- Nav scroll state + active link ---------------- */
  var nav = document.getElementById('nav');
  var navLinks = document.querySelectorAll('.nav__link');
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id], header[id]'));

  var progressBar = document.getElementById('scroll-progress');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
    if (progressBar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------------- Scroll-driven entrance animations ---------------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if (useGsap) {
    /* GSAP path: fade-up with a subtle 3D tilt. The has-gsap class
       neutralizes the CSS-transition reveal so the two never fight. */
    root.classList.add('has-gsap');

    var revealFrom = {
      opacity: 0,
      y: 48,
      rotationX: -8,
      transformPerspective: 900,
      transformOrigin: '50% 100%'
    };

    window.gsap.utils.toArray('.reveal').forEach(function (el) {
      window.gsap.from(el, Object.assign({}, revealFrom, {
        duration: 1,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }));
    });

    window.gsap.utils.toArray('.reveal-stagger').forEach(function (group) {
      window.gsap.from(group.children, Object.assign({}, revealFrom, {
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        clearProps: 'all',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true }
      }));
    });
  } else if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- 3D tilt & depth parallax ----------------
     Pointer-driven rotateX/rotateY around each card's center, written
     at most once per frame via requestAnimationFrame. Only activates on
     hover-capable fine-pointer devices (never on touch screens) and
     respects prefers-reduced-motion. Depth comes from translateZ on the
     card's key elements (see html.has-tilt rules in the CSS). */
  var supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function initTilt(selector, options) {
    var settings = Object.assign({ maxTilt: 8, lift: -4, scale: 1.02 }, options);
    var idleTransition = 'transform 0s, box-shadow 0.25s ease, border-color 0.25s ease';
    var settleTransition = 'transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.25s ease, border-color 0.25s ease';

    document.querySelectorAll(selector).forEach(function (card) {
      var rect = null;
      var frame = null;
      var settleTimer = null;
      var nx = 0.5;
      var ny = 0.5;

      function render() {
        frame = null;
        if (!rect) return;
        var rx = (0.5 - ny) * settings.maxTilt;
        var ry = (nx - 0.5) * settings.maxTilt;
        card.style.transform =
          'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)' +
          ' translateY(' + settings.lift + 'px) scale(' + settings.scale + ')';
      }

      card.addEventListener('pointerenter', function (event) {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        rect = card.getBoundingClientRect();
        clearTimeout(settleTimer);
        /* Ease into the first pose, then hand over to 1:1 rAF tracking. */
        card.style.transition = settleTransition;
        settleTimer = setTimeout(function () { card.style.transition = idleTransition; }, 500);
      });

      card.addEventListener('pointermove', function (event) {
        if (!rect) return;
        nx = (event.clientX - rect.left) / rect.width;
        ny = (event.clientY - rect.top) / rect.height;
        if (frame === null) frame = window.requestAnimationFrame(render);
      });

      card.addEventListener('pointerleave', function () {
        rect = null;
        if (frame !== null) { window.cancelAnimationFrame(frame); frame = null; }
        clearTimeout(settleTimer);
        card.style.transition = settleTransition;
        card.style.transform = '';
        settleTimer = setTimeout(function () { card.style.transition = ''; }, 520);
      });
    });
  }

  if (supportsHover && !prefersReducedMotion) {
    root.classList.add('has-tilt');
    initTilt('.metric-card, .hero-card', { maxTilt: 8, lift: -4, scale: 1.02 });
    initTilt('.exp-card', { maxTilt: 3.5, lift: -3, scale: 1.005 });
  }

  /* ---------------- Dynamic years of experience ---------------- */
  document.querySelectorAll('[data-years-since]').forEach(function (el) {
    var parts = el.getAttribute('data-years-since').split('-');
    var start = new Date(parseInt(parts[0], 10), (parseInt(parts[1], 10) || 1) - 1, 1);
    var years = Math.floor((Date.now() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if (years > 0) {
      el.setAttribute('data-count', String(years));
      el.textContent = String(years);
    }
  });

  /* ---------------- Count-up metrics ----------------
     The static HTML already contains each final value, so crawlers and
     ATS parsers read real numbers. When motion is allowed, the value is
     re-animated from 0 to the target as it enters the viewport. */
  var counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    if (isNaN(target)) return;

    if (useGsap) {
      var state = { value: 0 };
      window.gsap.to(state, {
        value: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function () { el.textContent = state.value.toFixed(decimals); },
        onComplete: function () { el.textContent = target.toFixed(decimals); }
      });
      return;
    }

    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (eased * target).toFixed(decimals);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length && !prefersReducedMotion) {
    if (useGsap) {
      counters.forEach(function (el) {
        window.ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: function () { animateCounter(el); }
        });
      });
    } else if ('IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------------- Haptic feedback ----------------
     A barely-there tap on interactive elements. Only Android browsers
     implement navigator.vibrate — iOS silently ignores the call. */
  if ('vibrate' in navigator && !prefersReducedMotion) {
    document.addEventListener('pointerdown', function (event) {
      if (event.pointerType !== 'touch') return;
      var interactive = event.target.closest(
        '.btn, .nav__link, .nav__toggle-btn, .nav__brand, .mobile-menu a, ' +
        '.metric-card, .exp-card, .project-card, .award-card, .cert-card__link, .contact-channel__link'
      );
      if (interactive) {
        try { navigator.vibrate(8); } catch (e) {}
      }
    }, { passive: true });
  }

  /* ---------------- Easter egg: tap the ER logo 5x ---------------- */
  var brand = document.querySelector('.nav__brand');
  var tapCount = 0;
  var tapTimer = null;
  var celebrating = false;

  if (brand) {
    brand.addEventListener('click', function () {
      tapCount += 1;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(function () { tapCount = 0; }, 700);
      if (tapCount >= 5) {
        tapCount = 0;
        celebrate();
      }
    });
  }

  function celebrate() {
    if (celebrating) return;
    celebrating = true;
    showToast('Thanks for visiting! 🎉');
    if (!prefersReducedMotion) {
      launchConfetti();
      if ('vibrate' in navigator) { try { navigator.vibrate([12, 40, 12]); } catch (e) {} }
    }
    setTimeout(function () { celebrating = false; }, 3200);
  }

  function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    window.requestAnimationFrame(function () { toast.classList.add('toast--visible'); });
    setTimeout(function () {
      toast.classList.remove('toast--visible');
      setTimeout(function () { toast.remove(); }, 400);
    }, 2600);
  }

  function launchConfetti() {
    var canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    var colors = ['#3B82F6', '#10B981', '#60A5FA', '#34D399', '#F59E0B'];
    var pieces = [];
    for (var i = 0; i < 140; i++) {
      pieces.push({
        x: Math.random() * width,
        y: -20 - Math.random() * height * 0.25,
        vx: (Math.random() - 0.5) * 1.6,
        vy: 2 + Math.random() * 3,
        w: 5 + Math.random() * 6,
        h: 8 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
        color: colors[i % colors.length]
      });
    }

    var DURATION = 2600;
    var start = null;

    function tick(now) {
      if (start === null) start = now;
      var elapsed = now - start;
      ctx.clearRect(0, 0, width, height);
      var alpha = Math.max(0, 1 - Math.max(0, elapsed - DURATION * 0.6) / (DURATION * 0.4));
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (elapsed < DURATION) {
        window.requestAnimationFrame(tick);
      } else {
        canvas.remove();
      }
    }
    window.requestAnimationFrame(tick);
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
