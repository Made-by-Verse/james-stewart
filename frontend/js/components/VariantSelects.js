export class VariantSelects {
  constructor() {}

  init() {
    this.variantSelects = document.querySelectorAll('variant-selects');
    if (!this.variantSelects.length) return;
    
    this.variantSelects.forEach(select => {
      select.addEventListener('variant:change', this.onVariantChange.bind(this));
      this.initializeSelect(select);
    });
  }

  initializeSelect(select) {
    this.element = select;
    this.updateOptions();
    this.updateMasterId();
  }

  onVariantChange(event) {
    this.updateOptions();
    this.updateMasterId();
  }

  updateOptions() {
    const selects = this.element.querySelectorAll('select');
    this.options = Array.from(selects, (select, index) => {
      return {
        index: index + 1,
        value: select.value
      };
    });
  }

  updateMasterId() {
    const variants = this.getVariantData();
    this.currentVariant = variants.find(variant => {
      return this.options.every(option => {
        const variantOption = variant[`option${option.index}`];
        return variantOption === option.value;
      });
    });

    if (this.currentVariant) {
      if (this.currentVariant.available) {
        this.toggleAddButton(false, window.variantStrings.addToCart);
      } else {
        this.toggleAddButton(true, window.variantStrings.soldOut);
      }
      this.updateURL();
      this.updateVariantInput();
    } else {
      this.toggleAddButton(true, window.variantStrings.unavailable);
    }
  }

  updateURL() {
    if (!this.currentVariant || this.element.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.element.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.element.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      if (input) {
        input.value = this.currentVariant.id;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  getVariantData() {
    try {
      const variantsScript = this.element.querySelector('[type="application/json"][data-variants]');
      if (!variantsScript) return [];
      this.variantData = this.variantData || JSON.parse(variantsScript.textContent);
      return this.variantData;
    } catch (error) {
      return [];
    }
  }

  toggleAddButton(disable = true, text) {
    const productForm = document.getElementById(`product-form-${this.element.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }
  }
}