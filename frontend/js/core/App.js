import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import Lenis from "lenis";
import { VideoSection } from "../components/VideoSection";
import { HeaderManager } from "../components/HeaderManager";
import { CarouselManager } from "../components/CarouselManager";
import { RecommendationsManager } from "../components/RecommendationsManager";
import { SCROLL_PREVENT } from "./constants";
import Process from "../AlpineData/Process";

export default class App {
  constructor() {
    this.initializeAlpine();
    this.lenis = null;
    this.initializeLenis();
    this.components = new Map();
  }

  initializeAlpine() {
    Alpine.plugin(intersect);
    window.Alpine = Alpine;

    // Initialize the store first
    Alpine.store("cartState", {
      items: [],
      sub_total: 0,
    });

    Process();

    Alpine.data("megaMenu", () => ({
      open: false,
    }));

    Alpine.data("cart", () => ({
      items: [],
      sub_total: 0,

      init() {
        this.getCart();
      },

      async getCart(openCart = false) {
        try {
          const response = await fetch(`${window.routes.cart_url}.js`);
          const cart = await response.json();

          // Update store
          Alpine.store("cartState").items = cart.items;
          Alpine.store("cartState").sub_total = this.formatMoney(
            cart.total_price
          );

          // Update local state
          this.items = cart.items;
          this.sub_total = this.formatMoney(cart.total_price);

          if (openCart) {
            window.dispatchEvent(new Event("open-cart-drawer"));
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      },

      async addToCart(variantId, quantity = 1) {
        try {
          // Dispatch event to show loading state
          window.dispatchEvent(new CustomEvent("cart:adding"));

          const response = await fetch(`${window.routes.cart_add_url}.js`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [{ id: variantId, quantity }],
            }),
          });

          if (!response.ok) throw new Error("Add to cart failed");

          // Immediately update the cart after successful add
          await this.getCart(true);

          // Dispatch success event
          window.dispatchEvent(new CustomEvent("cart:added"));
        } catch (error) {
          console.error("Error adding to cart:", error);
          // Dispatch error event
          window.dispatchEvent(
            new CustomEvent("cart:error", {
              detail: { message: error.message },
            })
          );
        }
      },

      async removeFromCart(variantId) {
        try {
          const response = await fetch(`${window.routes.cart_change_url}.js`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: variantId.toString(),
              quantity: 0,
            }),
          });

          if (!response.ok) throw new Error("Remove from cart failed");

          const cart = await response.json();

          // Update store
          Alpine.store("cartState").items = cart.items;
          Alpine.store("cartState").sub_total = this.formatMoney(
            cart.total_price
          );

          // Update local state
          this.items = cart.items;
          this.sub_total = this.formatMoney(cart.total_price);
        } catch (error) {
          console.error("Error removing from cart:", error);
        }
      },

      async updateQuantity(variantId, quantity) {
        try {
          const response = await fetch(`${window.routes.cart_change_url}.js`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: variantId.toString(),
              quantity: quantity,
            }),
          });

          if (!response.ok) throw new Error("Update quantity failed");

          const cart = await response.json();

          // Update store
          Alpine.store("cartState").items = cart.items;
          Alpine.store("cartState").sub_total = this.formatMoney(
            cart.total_price
          );

          // Update local state
          this.items = cart.items;
          this.sub_total = this.formatMoney(cart.total_price);
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      },

      formatMoney(cents) {
        return (cents / 100).toLocaleString("en-AU", {
          style: "currency",
          currency: "AUD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    }));

    Alpine.start();
  }

  initializeLenis() {
    this.lenis = new Lenis({
      prevent: (node) => SCROLL_PREVENT.includes(node.id),
    });

    function raf(time) {
      this.lenis?.raf(time);
      requestAnimationFrame(raf.bind(this));
    }

    requestAnimationFrame(raf.bind(this));
  }

  async init() {
    // Initialize core components
    this.components.set("header", new HeaderManager());
    this.components.set("video", new VideoSection());
    this.components.set("carousels", new CarouselManager());
    this.components.set("recommendations", new RecommendationsManager());
    //this.components.set("cart", new CartQuantityHandler());
    //this.components.set("variants", new VariantSelects());
    //this.components.set("productForm", new ProductForm());

    // Initialize all components
    for (const component of this.components.values()) {
      await component.init();
    }
  }
}
