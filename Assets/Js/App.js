document.addEventListener('DOMContentLoaded', () => {
  /* === Año dinámico === */
  const yEl = document.getElementById('y');
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* === Swiper ya existente (.vv-swiper) === */
  if (window.Swiper) {
    new Swiper('.vv-swiper', {
      loop: true,
      spaceBetween: 16,
      autoplay: { delay: 3500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  } else {
    console.warn('Swiper no está cargado.');
  }

  /* === Lightbox === */
  if (window.GLightbox) {
    GLightbox({ selector: '.glightbox' });
  }

  /* === AOS === */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }



  /* === Carrusel mixto (fotos + videos) .vv-media-swiper === */
  if (window.Swiper) {
    document.querySelectorAll('.vv-media-swiper').forEach((el) => {
      const swiper = new Swiper(el, {
        loop: true,
        spaceBetween: 12,
        slidesPerView: 1,
        centeredSlides: true,
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        navigation: {
          nextEl: el.querySelector('.swiper-button-next'),
          prevEl: el.querySelector('.swiper-button-prev'),
        },
        autoplay: {
          delay: 7000,                 // ⏱ 10s entre slides
          disableOnInteraction: false,
        },
      });

      // Helper: pausa todos los videos de este carrusel
      const pauseAllVideos = () => {
        el.querySelectorAll('video').forEach((v) => { v.pause(); v.currentTime = 0; });
      };

      // Al cambiar de slide, reproducir el video activo si es que lo hay
      swiper.on('slideChangeTransitionStart', () => {
        pauseAllVideos();
        const activeVideo = el.querySelector('.swiper-slide-active video');
        if (activeVideo) {
          activeVideo.muted = true; 
          activeVideo.play().catch(() => {
            
          });
        }
      });

      // Disparar la lógica al cargar por primera vez
      swiper.emit('slideChangeTransitionStart');
    });
  }
});


// Carrusel de la galería (plantillas de 6 fotos)
document.addEventListener('DOMContentLoaded', () => {
  if (window.Swiper) {
    new Swiper('.vv-gallery-swiper', {
      loop: true,
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.vv-gallery-swiper .swiper-button-next',
        prevEl: '.vv-gallery-swiper .swiper-button-prev',
      },
      
      keyboard: { enabled: true },
    });
  }
});

/* ARTE – Swiper creativo con parallax + autoplay */
(() => {
  const arteSwiper = new Swiper('.arte-swiper', {
    loop: true,
    speed: 900,
    spaceBetween: 16,
    grabCursor: true,
    centeredSlides: true,
    parallax: true,
    autoplay: { delay: 4200, disableOnInteraction: false },
    effect: 'creative',
    creativeEffect: {
      prev: { translate: ['-25%', 0, -100], opacity: 0.7, scale: 0.95 },
      next: { translate: ['25%', 0, -100], opacity: 0.7, scale: 0.95 }
    },
    pagination: { el: '.arte-swiper .swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.arte-swiper .swiper-button-next',
      prevEl: '.arte-swiper .swiper-button-prev',
    },
    on: {
      /* Reinicia el Ken-Burns para el slide activo  */
      slideChangeTransitionStart(sw) {
        sw.slides.forEach(s => {
          const img = s.querySelector('img');
          if (img) img.style.animation = 'none';
        });
        const activeImg = sw.slides[sw.activeIndex]?.querySelector('img');
        if (activeImg){
          // fuerza reflow y re-aplica animación
          void activeImg.offsetWidth;
          activeImg.style.animation = 'kb 12s ease-in-out both alternate';
        }
      }
    }
  });
})();


