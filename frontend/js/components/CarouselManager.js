import Base from "../core/Base";
import Swiper from "swiper";
import { Autoplay, EffectFade, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { SWIPER_CONFIG } from "../core/constants";

export class CarouselManager extends Base {
  constructor() {
    super();
    this.swipers = new Map();
    Swiper.use([Autoplay, EffectFade, FreeMode]);
  }

  init() {
    super.init();
    this.initHeroSwiper();
    this.initFeaturedProductSwiper();
    this.initVerticalCarousels();
  }

  initHeroSwiper() {
    const heroSwiper = document.querySelector(".hero-swiper");
    if (!heroSwiper) return;

    this.swipers.set("hero", new Swiper(".hero-swiper", SWIPER_CONFIG.fade));
  }

  initFeaturedProductSwiper() {
    const featuredProductSwiper = document.querySelector(
      ".featured-product-swiper"
    );
    if (!featuredProductSwiper) return;

    this.swipers.set(
      "featured-product",
      new Swiper(".featured-product-swiper", SWIPER_CONFIG.fade)
    );
  }

  initVerticalCarousels() {
    const carousels = document.querySelectorAll('[id^="vertical-carousel-"]');
    if (!carousels.length) return;

    carousels.forEach((carousel) => {
      this.swipers.set(
        carousel.id,
        new Swiper(
          `#${carousel.id} .vertical-carousel-swiper`,
          SWIPER_CONFIG.vertical
        )
      );
    });
  }

  destroy() {
    this.swipers.forEach((swiper) => swiper.destroy());
    this.swipers.clear();
    super.destroy();
  }
}
