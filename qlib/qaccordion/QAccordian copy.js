document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach(acc => {
    const headers = acc.querySelectorAll(".accordion-header");

    headers.forEach(header => {
      const content = header.nextElementSibling;

      // open default active
      if (header.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      }

      header.addEventListener("click", () => {
        headers.forEach(h => {
          if (h !== header) {
            h.classList.remove("active");
            h.querySelector(".icon").textContent = "+";
            h.nextElementSibling.style.maxHeight = null;
          }
        });

        header.classList.toggle("active");
        const icon = header.querySelector(".icon");

        if (header.classList.contains("active")) {
          icon.textContent = "−";
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          icon.textContent = "+";
          content.style.maxHeight = null;
        }
      });
    });
  });
});
