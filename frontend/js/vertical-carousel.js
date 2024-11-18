import Swiper, { Autoplay } from "swiper";

document.addEventListener("DOMContentLoaded", function () {
  Swiper.use([Autoplay]);

  new Swiper(".vertical-carousel-swiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    speed: 1000,
  });
});
