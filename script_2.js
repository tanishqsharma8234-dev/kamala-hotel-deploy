
/* ============ ROOMS OVERLAY JS — HTML5 Video Player ============ */
(function(){
  var overlay    = document.getElementById('roomsOverlay');
  var scrim      = document.getElementById('roomsScrim');
  var closeBtn   = document.getElementById('roomsClose');
  var navLink    = document.getElementById('roomsNavLink');
  var sheetLink  = document.getElementById('roomsSheetLink');
  var video      = document.getElementById('roomsVideo');
  var ppBtn      = document.getElementById('roomsPlayPause');
  if (!overlay || !video) return;

  video.muted = true;

  function syncState(){
    var isPlaying = !video.paused && !video.ended;
    if (ppBtn){
      ppBtn.classList.toggle('is-playing', isPlaying);
      ppBtn.setAttribute('aria-label', isPlaying ? 'Pause video' : 'Play video');
    }
  }

  function togglePlay(){
    if (video.paused){
      var promise = video.play();
      if (promise !== undefined){
        promise.catch(function(err){
          console.warn('Playback error / interaction required:', err);
        });
      }
    } else {
      video.pause();
    }
    syncState();
  }

  video.addEventListener('play', syncState);
  video.addEventListener('pause', syncState);
  video.addEventListener('ended', function(){
    if (ppBtn) ppBtn.classList.remove('is-playing');
  });

  if (ppBtn){
    ppBtn.addEventListener('click', function(e){
      e.stopPropagation();
      togglePlay();
    });
  }

  video.addEventListener('click', togglePlay);

  /* ---- open / close modal ---- */
  function openRooms(e){
    if (e) e.preventDefault();
    /* close nav sheet if open */
    var sheet  = document.getElementById('navSheet');
    var burger = document.getElementById('navToggle');
    if (sheet && sheet.classList.contains('is-open')){
      sheet.classList.remove('is-open');
      sheet.setAttribute('inert','');
      document.body.classList.remove('nav-open');
      if (burger){ burger.classList.remove('is-active'); burger.setAttribute('aria-expanded','false'); burger.setAttribute('aria-label','Open menu'); }
    }
    overlay.classList.add('is-open');
    overlay.removeAttribute('inert');
    document.body.classList.add('nav-open');
    if (closeBtn) closeBtn.focus();

    /* Autoplay when opening modal */
    var playPromise = video.play();
    if (playPromise !== undefined){
      playPromise.catch(function(){
        /* Browser may require user click to unmute/play */
      });
    }
    syncState();
  }

  function closeRooms(){
    overlay.classList.remove('is-open');
    overlay.setAttribute('inert','');
    document.body.classList.remove('nav-open');
    video.pause();
    syncState();
  }

  if (navLink)   navLink.addEventListener('click', openRooms);
  if (sheetLink) sheetLink.addEventListener('click', openRooms);
  if (scrim)     scrim.addEventListener('click', closeRooms);
  if (closeBtn)  closeBtn.addEventListener('click', closeRooms);

  /* ---- 3 Action Buttons Handlers ---- */
  var actionCloseBtn = document.getElementById('roomsActionCloseBtn');
  var copyBtn        = document.getElementById('roomsCopyBtn');
  var callBtn        = document.getElementById('roomsCallBtn');

  /* 3rd Button: Close Modal */
  if (actionCloseBtn){
    actionCloseBtn.addEventListener('click', closeRooms);
  }

  /* 2nd Button: Copy Number / Booking Details */
  if (copyBtn){
    var copyTimer = null;
    copyBtn.addEventListener('click', function(e){
      e.preventDefault();
      var detailsToCopy = "Hotel Kamala & Resto\nRoom Booking Contact: +91 94143 67752\nAC Room: 1500 Rs. / night\nNON AC Room: 1000 Rs. / night\nLocation: Near Apex University, Achrol, Rajasthan 303002";
      
      function showSuccess(){
        copyBtn.classList.add('is-copied');
        var textEl = copyBtn.querySelector('.rooms__copy-text');
        if (textEl) textEl.textContent = 'Copied!';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function(){
          copyBtn.classList.remove('is-copied');
          if (textEl) textEl.textContent = 'Copy Number';
        }, 2200);
      }

      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(detailsToCopy).then(showSuccess).catch(function(){
          fallbackCopy(detailsToCopy);
        });
      } else {
        fallbackCopy(detailsToCopy);
      }

      function fallbackCopy(text){
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showSuccess();
        } catch(err){
          alert('Hotel Kamala Booking: +91 94143 67752');
        }
        document.body.removeChild(ta);
      }
    });
  }

  document.addEventListener('keydown', function(e){
    if ((e.key === 'Escape' || e.key === 'Esc') && overlay.classList.contains('is-open')){
      closeRooms();
    }
  });
})();
