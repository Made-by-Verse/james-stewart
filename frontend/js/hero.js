import Swiper from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

Swiper.use([Autoplay, EffectFade]);

const heroSwiper = new Swiper(".hero-swiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 1500,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
