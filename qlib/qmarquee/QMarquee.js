document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".js-marquee").forEach(marquee => {

    const speed = Number(marquee.dataset.speed) || 1;
    const HEIGHT = marquee.offsetHeight || 300;

    marquee.style.overflow = "hidden";
    marquee.style.position = "relative";

    const inner = document.createElement("div");
    inner.style.display = "flex";
    inner.style.width = "max-content";
    inner.style.willChange = "transform";

    const items = Array.from(marquee.children);

    items.forEach(item => {
      item.style.flex = "0 0 auto";
      item.style.height = HEIGHT + "px";
      item.style.width = item.offsetWidth + "px";
      item.style.display = "block";

      // IMG FIX
      const img = item.querySelector("img");
      if (img) {
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.display = "block";
      }

      // BG FIX
      item.style.backgroundSize = "cover";
      item.style.backgroundPosition = "center";

      inner.appendChild(item);
    });

    // clone for infinite loop
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.style.height = HEIGHT + "px";
      inner.appendChild(clone);
    });

    marquee.innerHTML = "";
    marquee.appendChild(inner);

    let x = 0;

    function animate() {
      x -= speed;
      if (Math.abs(x) >= inner.scrollWidth / 2) x = 0;
      inner.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  });

});
