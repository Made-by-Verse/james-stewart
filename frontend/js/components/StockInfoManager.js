import axios from "axios";

export class StockInfoManager {
  constructor() {
    const stockInfoContainer = document.querySelector("[data-variant-stock]");
    const buyButton = document.querySelector(".buy-button");

    // Access the product ID from the data attribute
    this.productId = stockInfoContainer.getAttribute("data-product-id");
    this.stockInfoContainer = stockInfoContainer;
    this.buyButton = buyButton;
    this.productVariants = [];

    this.init(); // Call init directly in the constructor
  }

  init() {
    this.fetchProductData();
    document.addEventListener("product:variant-change", (evt) => {
      const selectedVariantValues = this.findVariantByID(evt.detail.variant.id);
      this.renderStockInformation(selectedVariantValues);
    });
  }

  fetchProductData() {
    axios
      .get(`https://jsf-po-eta.gadget.app/product?id=${this.productId}`, {
        mode: "cors",
      })
      .then(({ data }) => {
        this.productVariants = data.data;
        const selectedVariantValues = this.findVariantByID(this.productId);
        this.renderStockInformation(selectedVariantValues);
      })
      .catch((error) => console.error("Error:", error));
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }

  renderStockInformation(data) {
    if (!data) {
      console.error("No data provided");
      return;
    }

    let content = "";
    const stockText = data.inStock === true ? "IN STOCK" : "";

    // Disable the buy button if out of stock
    if (this.buyButton) {
      this.buyButton.disabled = !data.inStock; // Disable if not in stock
    }

    if (data.eta && data.eta.length > 0 && data.inStock === false) {
      const etaDate = new Date(data.eta[data.eta.length - 1]); // get the latest order
      const currentDate = new Date();

      if (isNaN(etaDate.getTime())) {
        console.error("Invalid ETA date");
      } else if (currentDate < etaDate) {
        const formattedDate = this.formatDate(etaDate);
        content = `<strong>ETA: ${formattedDate}</strong>`;
      }
    }

    if (!content && stockText) {
      content = `<strong>${stockText}</strong>`;
    }

    this.stockInfoContainer.innerHTML = content;
  }

  findVariantByID(variantID) {
    return this.productVariants.find((variant) =>
      variant.id.includes(variantID)
    );
  }
}
