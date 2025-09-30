
    // Año dinámico
    document.getElementById('y').textContent = new Date().getFullYear();

    // Swiper (pérgolas y arte)
    new Swiper('.swiper', {
      loop: true,
      spaceBetween: 16,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
    });

    // Lightbox
    const lightbox = GLightbox({ selector: '.glightbox' });

    // AOS
    AOS.init({ duration: 700, once: true, offset: 80 });

    // Comparador antes/después
    (function(){
      const cmp = document.getElementById('compare');
      const after = cmp.querySelector('.after');
      const knob  = cmp.querySelector('.knob');
      const bar   = cmp.querySelector('.bar');
      function setSplit(x){
        const r = cmp.getBoundingClientRect();
        let p = (x - r.left) / r.width;
        p = Math.max(0.05, Math.min(0.95, p));
        after.style.clipPath = `inset(0 0 0 ${p*100}%)`;
        knob.style.left = `${p*100}%`;
      }
      setSplit(cmp.getBoundingClientRect().left + cmp.getBoundingClientRect().width*0.5);
      let dragging=false;
      const move = e => { if(!dragging) return; setSplit((e.touches?e.touches[0].clientX:e.clientX)); };
      const start = e => { dragging=true; move(e); };
      const stop = ()=> dragging=false;
      cmp.addEventListener('mousedown', start);
      cmp.addEventListener('mousemove', move);
      window.addEventListener('mouseup', stop);
      cmp.addEventListener('touchstart', start, {passive:true});
      cmp.addEventListener('touchmove', move, {passive:true});
      window.addEventListener('touchend', stop);
    })();
  