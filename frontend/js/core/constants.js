export const SELECTORS = {
  header: "#js-header",
  heroSection: ".home-hero",
  videoPlayButton: "#video-play-button",
  recommendations: ".product-recommendations",
  verticalCarousel: '[id^="vertical-carousel-"]',
  fadeSwiper: ".fade-swiper",
};

export const CLASSES = {
  isHidden: "is-hidden",
  headerOnHero: "header--on-hero",
};

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
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    speed: 1000,
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
};
