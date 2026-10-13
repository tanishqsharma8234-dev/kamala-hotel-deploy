
(function(){
  var overlay  = document.getElementById('aboutOverlay');
  var scrim    = document.getElementById('aboutScrim');
  var closeBtn = document.getElementById('aboutClose');
  var triggers = document.querySelectorAll('#ctaBtn, #ctaBtnSheet, .cta');
  if (!overlay) return;

  function openAbout(e){
    if (e){ e.preventDefault(); }
    overlay.classList.add('is-open');
    overlay.removeAttribute('inert');
    document.body.classList.add('nav-open');
    if (closeBtn) closeBtn.focus();
  }
  function closeAbout(){
    overlay.classList.remove('is-open');
    overlay.setAttribute('inert','');
    document.body.classList.remove('nav-open');
  }

  triggers.forEach(function(t){
    t.addEventListener('click', openAbout);
  });

  if (scrim)    scrim.addEventListener('click', closeAbout);
  if (closeBtn) closeBtn.addEventListener('click', closeAbout);

  document.addEventListener('keydown', function(e){
    if ((e.key === 'Escape' || e.key === 'Esc') && overlay.classList.contains('is-open')){
      closeAbout();
    }
  });
})();
