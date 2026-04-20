
function initDynamicMasonryPopup() {

  document.querySelectorAll("[data-popup]").forEach(container => {

    const popupId = container.dataset.popup;
    const popup = document.getElementById(popupId);
    if (!popup) return;

    /* ===== gallery images ===== */
    const galleryImages = Array.from(container.querySelectorAll("img"));
    let currentIndex = 0;

    /* ===== carousel wrapper & slides ===== */
    const carouselWrapper = popup.querySelector(".w-full");
    if (!carouselWrapper) return;

    const carouselItems = Array.from(carouselWrapper.children);
    if (!carouselItems.length) return;

    /* ===== icons from backdrop ONLY ===== */
    const closeBtn = popup.querySelector('img[src*="remove.svg"]');
    const leftBtn  = popup.querySelector('img[src*="left-white-arrow.svg"]');
    const rightBtn = popup.querySelector('img[src*="right-white-arrow.svg"]');

    /* ===== popup base ===== */
    popup.style.position = "fixed";

    /* ===== bring icons to top layer ===== */
    [closeBtn, leftBtn, rightBtn].forEach(btn => {
      if (!btn) return;
      popup.appendChild(btn);
      btn.style.position = "absolute";
      btn.style.zIndex = "99999";
      btn.style.cursor = "pointer";
      btn.style.display = "block";
    });

    /* ===== icon positions ===== */
    if (closeBtn) {
      closeBtn.style.top = "20px";
      closeBtn.style.right = "30px";
    }

    if (leftBtn) {
      leftBtn.style.left = "20px";
      leftBtn.style.top = "50%";
      leftBtn.style.transform = "translateY(-50%)";
    }

    if (rightBtn) {
      rightBtn.style.right = "20px";
      rightBtn.style.top = "50%";
      rightBtn.style.transform = "translateY(-50%)";
    }

    /* ===== show only active slide ===== */
    function showImage(index) {
      carouselItems.forEach((item, i) => {
        item.style.display = i === index ? "block" : "none";
      });
    }

    /* ===== open popup on image click ===== */
    galleryImages.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
    currentIndex = index;
    popup.classList.add("active");
    popup.style.width = "100%";


        showImage(currentIndex);
      });
    });

    /* ===== close popup ===== */
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    }

    /* ===== next ===== */
    if (rightBtn) {
      rightBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showImage(currentIndex);
      });
    }

    /* ===== prev ===== */
    if (leftBtn) {
      leftBtn.addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showImage(currentIndex);
      });
    }

    /* ===== initial state ===== */
    showImage(0);

  });
}

window.addEventListener("load", initDynamicMasonryPopup);
