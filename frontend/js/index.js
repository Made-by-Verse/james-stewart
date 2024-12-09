import App from "./core/App";

document.addEventListener("DOMContentLoaded", () => {

  const formContainer = document.querySelector('#app-embed');

  const observer = new MutationObserver((mutationsList, observer) => {
    const form = document.querySelector('form-embed');

    if (form) {
      console.log('form found');
      
      observer.disconnect();
      const shadow = form.shadowRoot;

      // Clear existing adopted stylesheets
      shadow.adoptedStyleSheets = [];
      
      const sheet = new CSSStyleSheet();

      // CSS Reset for form elements
      sheet.insertRule(`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      `);

      sheet.insertRule(`
        input, button, textarea, select {
          font-family: inherit;
          font-size: 100%;
          line-height: 1.15;
          margin: 0;
        }
      `);

      // Base input styles
      sheet.insertRule(`
        input {
          outline: none;
          appearance: none;
          width: 100%;
          background-color: transparent;
          padding: 1rem;
          border: none !important;
          border-bottom: 1px solid #241917 !important;
        }
      `);

      // Number input styles for Chrome/Safari/Edge
      sheet.insertRule(`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          background: #fff !important;
        }
      `);

      // Number input styles for Firefox
      sheet.insertRule(`
        input[type=number] {
          -moz-appearance: textfield !important;
        }
      `);

      // Textarea styles
      sheet.insertRule(`
        textarea {
          background-color: transparent !important;
          border-bottom: 1px solid #C3C2BC !important;
          padding: 1rem !important;
          width: 100% !important;
          appearance: none !important;
        }
      `);

      // Radio input styles
      sheet.insertRule(`
        input[type="radio"] {
          appearance: none !important;
          width: 0.5rem !important;
          height: 1rem !important;
          border-radius: 9999px !important;
          border: 1px solid #C3C2BC !important;
        }
      `);

      sheet.insertRule(`
        button {
          appearance: none !important;
          background-color: #241917 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;

        }
        `)

      sheet.insertRule(`
        label {
          color: #C3C2BC !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          transform: translateY(-50%) !important;
          font-size: 0.875rem !important;
        }
      `)

      shadow.adoptedStyleSheets.push(sheet);

      formContainer.classList.add('loaded');
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  const app = new App();
  app.init();
});
