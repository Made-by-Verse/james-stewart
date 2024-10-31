// Create observer to watch hero section and update header styles
const headerElement = document.querySelector("#js-header");
const heroSection = document.querySelector(".home-hero");

if (headerElement && heroSection) {
  const headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // When hero is in view, add class to header
        if (entry.isIntersecting) {
          headerElement.classList.add("header--on-hero");
        } else {
          headerElement.classList.remove("header--on-hero");
        }

        console.log(entry.isIntersecting);
      });
    },
    {
      // Adjust threshold as needed - 0 means callback triggers as soon as even 1px is visible
      threshold: 0.5,
    }
  );

  // Start observing the hero section
  headerObserver.observe(heroSection);
}
