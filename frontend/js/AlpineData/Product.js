import axios from "axios";

export default function MegaMenu() {
  Alpine.data("product", () => ({
    shopifyCurrentVariantID: "",
    stockInfoContainer: document.querySelector("[data-variant-stock]"),
    productId: "",
    productVariants: [],

    getProductVariants() {
      axios
        .get(
          `https://jsf-po-eta--development.gadget.app/product?id=${this.productId}`,
          {
            mode: "cors",
          }
        )
        .then(({ data }) => {
          this.productVariants = data.data;
          const selectedVariantValues = this.findVariantByID(
            this.shopifyCurrentVariantID
          );
          this.renderStockInformation(selectedVariantValues);
        })
        .catch((error) => console.error("Error:", error));
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
    },

    renderStockInformation(data) {
      if (!data) {
        console.error("No data provided");
        return;
      }

      let content = "";
      const stockText = data.inStock === true ? "IN STOCK" : "";

      // Disable the buy button if out of stock
      if (this.$refs.buyButton) {
        this.$refs.buyButton.disabled = !data.inStock; // Disable if not in stock
      }

      if (data.eta && data.eta.length > 0 && data.inStock === false) {
        const etaDate = new Date(data.eta[data.eta.length - 1]); // get the latest order
        const currentDate = new Date();

        if (isNaN(etaDate.getTime())) {
          console.error("Invalid ETA date");
        } else if (currentDate < etaDate) {
          const formattedDate = this.formatDate(etaDate);
          content = `<strong>ETA: ${formattedDate}</strong>`;
        } // Implicitly handles if currentDate is not before etaDate by not setting etaText
      }

      if (!content && stockText) {
        content = `<strong>${stockText}</strong>`;
      }

      this.stockInfoContainer.innerHTML = content;
    },

    updateStockInformation() {
      const url = new URL(window.location.href);
      const variantId = url.searchParams.get("variant");
      const selectedVariantValues = this.findVariantByID(
        `gid://shopify/ProductVariant/${variantId}`
      );
      this.renderStockInformation(selectedVariantValues);
    },

    findVariantByID(variantID) {
      return this.productVariants.find((variant) =>
        variant.id.includes(variantID)
      );
    },
  }));
}
