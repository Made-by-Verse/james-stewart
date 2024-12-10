export const SWIPER_CONFIG = {
  fade: {
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    speed: 1500,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  },
  vertical: {
    direction: "vertical",
    slidesPerView: "auto",
    loop: true,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 10000,
    freeMode: {
      enabled: true,
      momentum: false
    },
    cssMode: false,
    watchSlidesProgress: true,
    effect: 'slide',
    touchRatio: 0,
    touchAngle: 0,
    longSwipes: false,
    shortSwipes: false,
  },
  recommendations: {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
    },
  },
  grid: {
    slidesPerView: 1.125,
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 2.2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  },
};

export const SCROLL_PREVENT = ['cart-items', 'FacetFiltersForm', 'drawer-content'];
