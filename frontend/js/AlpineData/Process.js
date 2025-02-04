export default function Process() {
  Alpine.data("process", () => ({
    activeStep: null,
    totalSteps: 0,

    init() {
      this.totalSteps = this.$el.querySelectorAll(".process-text").length;
      this.updateHeight();
      window.addEventListener("resize", () => this.updateHeight());
      window.addEventListener("scroll", () => this.updateScrollProgress());
    },

    updateHeight() {
      if (window.innerWidth < 768) {
        this.$refs.contentContainer.style.height = "auto";
      } else {
        const texts = this.$el.querySelectorAll(".process-text");
        let maxHeight = 0;
        texts.forEach((text) => {
          text.style.position = "static";
          text.style.opacity = "1";
          maxHeight = Math.max(maxHeight, text.offsetHeight);
          text.style.position = "";
          text.style.opacity = "";
        });
        this.$refs.contentContainer.style.height = `${maxHeight}px`;
      }
    },
    updateScrollProgress() {
      const containerTop = this.$el.getBoundingClientRect().top;
      const sectionHeight = this.$el.offsetHeight;
      const stepHeight = sectionHeight / this.totalSteps;

      this.activeStep = Math.floor(
        (window.innerHeight - containerTop) / stepHeight
      );
    },
  }));
}
