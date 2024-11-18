import Base from "../core/Base";

export class HeaderManager extends Base {
  constructor() {
    super();
    this.header = document.querySelector("#js-header");
    this.heroSection = document.querySelector(".home-hero");
  }

  init() {
    super.init();
    if (!this.header || !this.heroSection) return;

    this.initializeObserver();
  }

  initializeObserver() {
    const headerObserver = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: 0.5 }
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
}
