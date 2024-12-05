import Base from "../core/Base";

export class HeaderManager extends Base {
  constructor() {
    super();
    this.header = document.querySelector("#js-header");
    this.heroSection = document.querySelector(".home-hero");
  }

  init() {
    super.init();
    if (!this.header) return;
    this.handleScroll();

    if (!this.heroSection) return;
    this.initializeObserver();
  }

  handleScroll() {
    this.scrollHandler = () => {
      if (window.scrollY < 50) {
        this.header.classList.add('header--not-scrolled');
      } else {
        this.header.classList.remove('header--not-scrolled');
      }
    };

    window.addEventListener('scroll', this.scrollHandler);
  }

  initializeObserver() {
    const headerObserver = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0 }
    );

    headerObserver.observe(this.heroSection);
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.header.classList.add("header--on-hero");
      } else {
        this.header.classList.remove("header--on-hero");
      }
    });
  }

  destroy() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    super.destroy?.();
  }
}
