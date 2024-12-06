// export class ProductForm {
//   constructor() {}

//   init() {
//     this.forms = document.querySelectorAll('product-form');
//     if (!this.forms.length) return;
//     this.forms.forEach(form => {
//       this.initializeForm(form);
//     });
//   }

//   initializeForm(element) {
//     this.element = element;
//     this.form = element.querySelector('form');
//     this.form?.addEventListener('submit', this.onSubmitHandler.bind(this));
//     this.cartNotification = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
//     this.submitButton = element.querySelector('[type="submit"]');
//   }

//   onSubmitHandler(evt) {
//     console.log("submit");
//     evt.preventDefault();
//     if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

//     this.handleErrorMessage();
//     this.submitButton.setAttribute('aria-disabled', true);
//     this.submitButton.classList.add('loading');

//     const config = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     };

//     const formData = new FormData(this.form);
//     const jsonData = {
//       items: [{
//         id: formData.get('id'),
//         quantity: parseInt(formData.get('quantity'), 10)
//       }],
//       sections: "cart-items,cart-icon-bubble"
//     };
    
//     config.body = JSON.stringify(jsonData);

//     fetch(`${window.routes.cart_add_url}.js`, config)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((cart) => {
//         window.dispatchEvent(new CustomEvent('cart:updated', {
//           detail: { cart }
//         }));

//         this.element.dispatchEvent(new CustomEvent('cart:added', {
//           bubbles: true,
//           detail: {
//             response: cart
//           }
//         }));

//         window.dispatchEvent(new CustomEvent('toggle-cart-drawer'));
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//         this.handleErrorMessage(error?.message || window.cartStrings?.error || 'There was an error adding this item to the cart.');
//       })
//       .finally(() => {
//         this.submitButton.classList.remove('loading');
//         this.submitButton.removeAttribute('aria-disabled');
//       });
//   }

//   handleErrorMessage(errorMessage = false) {
//     this.errorMessageWrapper = this.errorMessageWrapper || this.element.querySelector('.product-form__error-message-wrapper');
//     if (!this.errorMessageWrapper) return;
    
//     this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

//     this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

//     if (errorMessage) {
//       this.errorMessage.textContent = errorMessage;
//     }
//   }
// } 