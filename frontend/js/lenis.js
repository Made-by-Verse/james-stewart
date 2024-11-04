import Lenis from "lenis";

const lenis = new Lenis();

lenis.on("scroll", (e) => {});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
