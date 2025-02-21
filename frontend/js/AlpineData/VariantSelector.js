export default function VariantSelector() {
  Alpine.data("variantSelector", () => ({
    open: false,

    async handleVariantChange(sectionId, value) {
      this.open = false;

      // Find the variant that matches all selected options
      const variants = JSON.parse(
        document.querySelector("[data-variants]").textContent
      );
      const selectedVariant = variants.find((variant) =>
        variant.options.includes(value)
      );

      if (selectedVariant) {
        // Update URL with new variant ID
        const url = new URL(window.location.href);
        url.searchParams.set("variant", selectedVariant.id);
        history.replaceState({}, "", url);

        // Fetch and update the product template
        await fetch(url)
          .then((response) => {
            return response.text();
          })
          .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newProductInfo = doc.getElementById(
              `ProductInfo-${sectionId}`
            );
            const currentProductInfo = document.getElementById(
              `ProductInfo-${sectionId}`
            );
            currentProductInfo.innerHTML = newProductInfo.innerHTML;

            window.dispatchEvent(new CustomEvent("product:variant-change"));
          });
      }
    },
  }));
}
