/* Capta+Edu — interactions */
(function () {
  'use strict';

  /* nav scrolled state */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var burger = document.querySelector('.nav__burger');
  var menu = document.querySelector('.mobile-menu');
  function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  /* FAQ accordion */
  document.querySelectorAll('.qa').forEach(function (qa) {
    var btn = qa.querySelector('.qa__q');
    var ans = qa.querySelector('.qa__a');
    btn.addEventListener('click', function () {
      var isOpen = qa.classList.contains('open');
      if (isOpen) {
        qa.classList.remove('open');
        ans.style.maxHeight = '';
      } else {
        qa.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  /* Mind map nodes — toggle active (one at a time on desktop) */
  var nodes = Array.prototype.slice.call(document.querySelectorAll('.node'));
  nodes.forEach(function (node) {
    node.addEventListener('click', function () {
      var was = node.classList.contains('active');
      nodes.forEach(function (n) { n.classList.remove('active'); });
      if (!was) node.classList.add('active');
    });
  });
  if (nodes[0]) nodes[0].classList.add('active');

  /* scroll reveal — position based (works in all environments) */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  function checkReveals() {
    var trigger = window.innerHeight * 0.92;
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (el.classList.contains('in')) continue;
      if (el.getBoundingClientRect().top < trigger) el.classList.add('in');
    }
  }
  /* active nav link on scroll */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var links = {};
  document.querySelectorAll('.nav__link').forEach(function (l) {
    var id = l.getAttribute('href');
    if (id && id.charAt(0) === '#') links[id.slice(1)] = l;
  });
  function checkSpy() {
    var mid = window.innerHeight * 0.4;
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      var r = sections[i].getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) { current = sections[i].id; break; }
    }
    Object.keys(links).forEach(function (k) { links[k].classList.toggle('active-link', k === current); });
  }
  var ticking = false;
  function onFrame() {
    checkReveals();
    checkSpy();
    ticking = false;
  }
  function requestTick() {
    if (!ticking) { ticking = true; requestAnimationFrame(onFrame); }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
  checkReveals();
  checkSpy();
  /* safety: ensure nothing stays hidden if something goes wrong */
  setTimeout(function () { reveals.forEach(function (el) { el.classList.add('in'); }); }, 2500);

  /* contact form — handled by RD Station embed */
})();
