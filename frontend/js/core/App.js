import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import Lenis from "lenis";
import { VideoSection } from "../components/VideoSection";
import { HeaderManager } from "../components/HeaderManager";
import { CarouselManager } from "../components/CarouselManager";
import { RecommendationsManager } from "../components/RecommendationsManager";
import { CartQuantityHandler } from "../components/Cart";
import { VariantSelects } from "../components/VariantSelects";
import { ProductForm } from "../components/ProductForm";

export default class App {
  constructor() {
    this.initializeAlpine();
    this.initializeLenis();
    this.components = new Map();
  }

  initializeAlpine() {
    Alpine.plugin(intersect);
    window.Alpine = Alpine;

    Alpine.data("megaMenu", () => ({
      open: false,
    }));

    Alpine.start();
  }

  initializeLenis() {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  async init() {
    // Initialize core components
    this.components.set("header", new HeaderManager());
    this.components.set("video", new VideoSection());
    this.components.set("carousels", new CarouselManager());
    this.components.set("recommendations", new RecommendationsManager());
    this.components.set("cart", new CartQuantityHandler());
    this.components.set("variants", new VariantSelects());
    this.components.set("productForm", new ProductForm());

    // Initialize all components
    for (const component of this.components.values()) {
      await component.init();
    }
  }
}
