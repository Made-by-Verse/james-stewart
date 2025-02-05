export class ProductForm {
  constructor() {
    this.productId = null;
    this.currentVariantId = null;
    this.stockInfoContainer = null;
    this.productVariants = [];
  }

  init() {
    this.productId =
      document.querySelector("[data-product-id]").dataset.productId;
    this.stockInfoContainer = document.querySelector("[data-variant-stock]");
    this.currentVariantId = document.querySelector(
      "[data-current-variant-id]"
    ).dataset.currentVariantId;

    if (this.stockInfoContainer) {
      this.fetchProductVariants();
      this.setupEventListeners();
    }
  }

  async fetchProductVariants() {
    try {
      const response = await axios.get(
        `https://jsf-po-eta.gadget.app/product?id=${this.productId}`
      );
      this.productVariants = response.data.data;
      this.renderStockInformation(this.findVariantByID(this.currentVariantId));
    } catch (error) {
      console.error("Error fetching product variants:", error);
    }
  }

  findVariantByID(variantID) {
    return this.productVariants.find((variant) =>
      variant.id.includes(variantID)
    );
  }

  renderStockInformation(data) {
    if (!data) {
      console.error("No data provided");
      return;
    }

    let content = "";
    const stockText = data.inStock ? "IN STOCK" : "";

    if (data.eta && data.eta.length > 0 && !data.inStock) {
      const etaDate = new Date(data.eta[data.eta.length - 1]);
      const currentDate = new Date();

      if (!isNaN(etaDate.getTime()) && currentDate < etaDate) {
        content = `<strong>ETA: ${this.formatDate(etaDate)}</strong>`;
      }
    }

    if (!content && stockText) {
      content = `<strong>${stockText}</strong>`;
    }

    this.stockInfoContainer.innerHTML = content;
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }

  setupEventListeners() {
    document.addEventListener("product:variant-change", (evt) => {
      const selectedVariantValues = this.find;
    });
  }
}
