
(function(){
  var btn = document.getElementById('navToggle');
  var sheet = document.getElementById('navSheet');
  if (!btn || !sheet) return;
  var panel = sheet.querySelector('.navsheet__panel');
  if (!panel) return;
  var isOpen = false;

  // The right-anchored panel is capped at 460px: on wide screens it can stop
  // short of the burger, so a white icon would be invisible on the white page.
  // Measure instead of guessing a breakpoint.
  function syncBurgerContrast(){
    var panelLeft = window.innerWidth - panel.getBoundingClientRect().width;
    var onPanel = btn.getBoundingClientRect().right > panelLeft + 4;
    btn.classList.toggle('burger--on-panel', onPanel);
  }

  function setOpen(next){
    if (next === isOpen) return;
    isOpen = next;
    if (isOpen) syncBurgerContrast();
    sheet.classList.toggle('is-open', isOpen);
    btn.classList.toggle('is-active', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if (isOpen){
      sheet.removeAttribute('inert');
    } else {
      sheet.setAttribute('inert', '');
    }
  }

  btn.addEventListener('click', function(){ setOpen(!isOpen); });

  sheet.addEventListener('click', function(e){
    if (!isOpen) return;
    var t = e.target;
    if (t && t.nodeType === 1 && (t.hasAttribute('data-nav-close') || t.closest('a'))){
      setOpen(false);
    }
  });

  document.addEventListener('keydown', function(e){
    if (!isOpen) return;
    if (e.key === 'Escape' || e.key === 'Esc'){
      setOpen(false);
      btn.focus();
    }
  });

  window.addEventListener('resize', function(){
    if (isOpen) syncBurgerContrast();
  });
})();
