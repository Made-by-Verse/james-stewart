export class CartQuantityHandler {
  constructor() {
    this.init();
  }

  async init() {
    this.initQuantityControls();
    this.initRemoveButtons();
  }

  initQuantityControls() {
    document.addEventListener("click", (e) => {
      const button = e.target.closest(".quantity-btn");
      if (!button) return;

      const itemId = button.dataset.itemId;
      const action = button.dataset.action;
      const quantityDisplay =
        button.parentElement.querySelector(".quantity-display");
      const currentQty = parseInt(quantityDisplay.textContent);
      const newQty =
        action === "increase" ? currentQty + 1 : Math.max(1, currentQty - 1);

      this.updateQuantity(itemId, newQty);
    });

    document.addEventListener("change", (e) => {
      const quantityInput = e.target.closest('input[name="updates[]"]');
      if (!quantityInput) return;

      const variantId = quantityInput.dataset.variantId;
      const newQty = parseInt(quantityInput.value);
      if (newQty >= 0) {
        this.updateQuantity(variantId, newQty);
      }
    });
  }

  initRemoveButtons() {
    document.addEventListener("click", (e) => {
      const removeButton = e.target.closest('button[data-action="remove"]');
      if (!removeButton) return;

      const itemId = removeButton.dataset.itemId;
      this.updateQuantity(itemId, 0);
    });
  }

  async updateQuantity(itemId, newQty) {
    console.log("Starting updateQuantity:", { itemId, newQty });
    try {
      const response = await fetch("/cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: itemId,
          quantity: newQty,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const cart = await response.json();

      if (newQty === 0) {
        const itemElement = document
          .querySelector(`[data-item-id="${itemId}"]`)
          .closest(".flex.gap-4.py-4.border-b");
        if (itemElement) {
          itemElement.remove();
        }
      } else {
        const quantityDisplay = document.querySelector(
          `.quantity-display[data-item-id="${itemId}"]`
        );
        if (quantityDisplay) {
          const cartItem = cart.items.find((item) => item.key === itemId);
          if (cartItem) {
            quantityDisplay.textContent = cartItem.quantity;
          }
        }
      }

      window.dispatchEvent(
        new CustomEvent("cart:updated", {
          detail: { cart },
        })
      );

      this.updateCartCountBubble(cart.item_count);
      this.updateCartTotal(cart.total_price);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  }

  updateCartCountBubble(count) {
    const bubble = document.querySelector(
      '.cart-count-bubble span[aria-hidden="true"]'
    );
    if (bubble) {
      bubble.textContent = count;
    }
  }

  updateCartTotal(total) {
    const totalElement = document.querySelector(".total-text .total");
    if (totalElement) {
      totalElement.textContent = this.formatMoney(total);
    }
  }

  formatMoney(cents) {
    return (cents / 100).toLocaleString("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
}
