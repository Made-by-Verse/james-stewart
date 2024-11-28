export class ProductForm {
  constructor() {}

  init() {
    this.forms = document.querySelectorAll('product-form');
    if (!this.forms.length) return;
    this.forms.forEach(form => {
      this.initializeForm(form);
    });
  }

  initializeForm(element) {
    this.element = element;
    this.form = element.querySelector('form');
    this.form?.addEventListener('submit', this.onSubmitHandler.bind(this));
    this.cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
    this.submitButton = element.querySelector('[type="submit"]');
  }

  onSubmitHandler(evt) {
    evt.preventDefault();
    if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

    this.handleErrorMessage();
    this.submitButton.setAttribute('aria-disabled', true);
    this.submitButton.classList.add('loading');

    const config = {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    const formData = new FormData(this.form);
    config.body = formData;

    fetch(window.routes.cart_add_url, config)
      .then((response) => response.text())
      .then((responseText) => {
        if (responseText.trim().match(/^[\{\[]/)) {
          const parsedState = JSON.parse(responseText);
          
          if (parsedState.status === 422) {
            throw new Error(parsedState.description);
          }

          this.cartNotification?.renderContents(parsedState);
          
          this.element.dispatchEvent(new CustomEvent('cart:added', {
            bubbles: true,
            detail: {
              response: parsedState
            }
          }));
        } else {
          window.location.href = window.routes.cart_url;
        }
      })
      .catch((error) => {
        this.handleErrorMessage(
          error?.message || window.cartStrings?.error || 'There was an error adding this item to the cart.'
        );
      })
      .finally(() => {
        this.submitButton.classList.remove('loading');
        this.submitButton.removeAttribute('aria-disabled');
      });
  }

  handleErrorMessage(errorMessage = false) {
    this.errorMessageWrapper = this.errorMessageWrapper || this.element.querySelector('.product-form__error-message-wrapper');
    if (!this.errorMessageWrapper) return;
    
    this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

    this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

    if (errorMessage) {
      this.errorMessage.textContent = errorMessage;
    }
  }
} 