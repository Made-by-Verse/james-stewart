import Base from "../core/Base";

export class HeaderManager extends Base {
  constructor() {
    super();
    this.header = document.querySelector("#js-header");
    this.heroSection = document.querySelector(".home-hero");
    this.filterBar = document.querySelector("#filter-bar");
    this.lastScrollY = window.scrollY; // Track the last scroll position
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
      const currentScrollY = window.scrollY;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (currentScrollY < 50) {
        this.header.classList.add("header--not-scrolled");
      } else {
        this.header.classList.remove("header--not-scrolled");
      }

      // Determine scroll direction
      if (currentScrollY > this.lastScrollY) {
        // Scrolling down
        if (this.header.classList.contains("not-home")) {
          this.header.classList.add("header--hidden");
          this.filterBar && this.filterBar.classList.add("header--hidden");
        } else if (scrollPosition > viewportHeight) {
          this.header.classList.add("header--hidden");
          this.filterBar && this.filterBar.classList.add("header--hidden");
        }
      } else {
        // Scrolling up
        this.header.classList.remove("header--hidden");
        this.filterBar && this.filterBar.classList.remove("header--hidden");
      }

      const logo = document.getElementById("logo");

      if (logo && !this.header.classList.contains("not-home")) {
        const scale =
          scrollPosition < viewportHeight
            ? 1.8 - 0.5 * (scrollPosition / viewportHeight)
            : 1;
        const translateY =
          scrollPosition < viewportHeight
            ? 33 - 33 * (scrollPosition / viewportHeight)
            : 0;

        logo.style.transform = `translateY(${translateY}vh) scale(${scale})`;
      }

      this.lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", this.scrollHandler);
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
      window.removeEventListener("scroll", this.scrollHandler);
    }
    super.destroy?.();
  }
}
