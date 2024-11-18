import Base from "../core/Base";
import Swiper from "swiper";
import { Autoplay, EffectFade, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

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

    this.swipers.set(
      "hero",
      new Swiper(".hero-swiper", {
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 1500,
        loop: true,
      })
    );
  }

  initFeaturedProductSwiper() {
    const featuredProductSwiper = document.querySelector(
      ".featured-product-swiper"
    );
    if (!featuredProductSwiper) return;

    this.swipers.set(
      "featured-product",
      new Swiper(".featured-product-swiper", {
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 1500,
        loop: true,
      })
    );
  }

  initVerticalCarousels() {
    const carousels = document.querySelectorAll('[id^="vertical-carousel-"]');
    if (!carousels.length) return;

    carousels.forEach((carousel) => {
      this.swipers.set(
        carousel.id,
        new Swiper(`#${carousel.id} .vertical-carousel-swiper`, {
          direction: "vertical",
          slidesPerView: "auto",
          loop: true,
          allowTouchMove: false,
          autoplay: {
            delay: 1,
            disableOnInteraction: false,
          },
          speed: 5000,
        })
      );
    });
  }

  destroy() {
    this.swipers.forEach((swiper) => swiper.destroy());
    this.swipers.clear();
    super.destroy();
  }
}
