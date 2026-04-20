window.addEventListener("load", function () {
const accordions = document.querySelectorAll(".w-full.min-h-\\[100px\\] > .w-auto.h-auto");

  accordions.forEach((item, index) => {

    const icon = item.querySelector("div[style*='down_arrow']");
    const headingBox = item.children[1];
    const bodyWrapper = item.querySelector(".accordion-body");
    const bodyInner = bodyWrapper.children[0];

    // Make HEADING area relative (not whole item)
    headingBox.classList.add("relative", "pr-[60px]", "cursor-pointer");

    // Arrow fixed inside heading center
    icon.classList.add(
      "absolute",
      "right-[20px]",
      "top-1/2",
      "-translate-y-1/2",
      "transition-transform",
      "duration-300"
    );

    // Move icon inside headingBox for proper alignment
    headingBox.appendChild(icon);

    // Smooth animation
    bodyWrapper.classList.remove("hidden");
    bodyWrapper.style.overflow = "hidden";
    bodyWrapper.style.transition = "max-height 0.45s ease, opacity 0.3s ease";
    bodyWrapper.style.maxHeight = "0px";
    bodyWrapper.style.opacity = "0";

    // First open by default
    if (index === 0) {
      bodyWrapper.style.maxHeight = bodyInner.scrollHeight + "px";
      bodyWrapper.style.opacity = "1";
      icon.classList.add("rotate-180");
    }

    // Toggle click
    headingBox.addEventListener("click", function () {

      const isOpen = bodyWrapper.style.maxHeight !== "0px";

      // Close all
      accordions.forEach((other) => {
        const oIcon = other.querySelector("div[style*='down_arrow']");
        const oBody = other.querySelector(".accordion-body");
        oBody.style.maxHeight = "0px";
        oBody.style.opacity = "0";
        oIcon.classList.remove("rotate-180");
      });

      // Open clicked
      if (!isOpen) {
        bodyWrapper.style.maxHeight = bodyInner.scrollHeight + "px";
        bodyWrapper.style.opacity = "1";
        icon.classList.add("rotate-180");
      }
    });

  });

});

