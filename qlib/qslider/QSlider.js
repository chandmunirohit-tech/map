document.querySelectorAll(".dynamic-slider").forEach(initSlider);

function initSlider(slider) {
  const slides = Array.from(slider.children).filter(el =>
    el.style.backgroundImage || el.querySelector("img")
  );
  if (!slides.length) return;

  const indicatorType = (slider.getAttribute("sliderIndicatorType") || "circle").toLowerCase();
  const indicatorPosition = slider.getAttribute("indicatorPositionType") || "belowSlider";
  const autoPlay = slider.getAttribute("sliderAutoPlay") === "true";
  const duration = parseInt(slider.getAttribute("sliderAutoPlayDuration")) || 3000;

  let current = 0;
  slider.style.position = "relative";
  slider.style.overflow = "hidden";

  slides.forEach((slide, i) => {
    slide.style.position = "absolute";
    slide.style.inset = "0";
    slide.style.transition = "opacity 0.6s ease";
    slide.style.opacity = i === 0 ? "1" : "0";

    const img = slide.querySelector("img");
    if (img) {
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "cover";
    }
  });

  /* ================= INDICATORS ================= */
  const indicatorWrapper = document.createElement("div");
  indicatorWrapper.style.display = "flex";
  indicatorWrapper.style.justifyContent = "center";
  indicatorWrapper.style.gap = "8px";
  indicatorWrapper.style.zIndex = "5";

  if (indicatorPosition === "aboveSlider") {
    indicatorWrapper.style.position = "absolute";
    indicatorWrapper.style.bottom = "20px";
    indicatorWrapper.style.left = "50%";
    indicatorWrapper.style.transform = "translateX(-50%)";
    slider.appendChild(indicatorWrapper);
  } else {
    indicatorWrapper.style.marginTop = "12px";
    slider.after(indicatorWrapper);
  }

  const indicators = [];

  slides.forEach((slide, i) => {
    const dot = document.createElement("div");
    dot.style.cursor = "pointer";
    dot.style.transition = "all 0.3s ease";

    if (indicatorType === "square") {
      dot.style.width = "12px";
      dot.style.height = "12px";
      dot.style.background = "#bbb";
    }
    else if (indicatorType === "number") {
      dot.textContent = i + 1;
      dot.style.padding = "4px 8px";
      dot.style.fontSize = "12px";
      dot.style.borderRadius = "4px";
      dot.style.background = "#e5e5e5";
      dot.style.color = "#555";
    }
    else if (indicatorType === "thumbnail") {
      dot.style.width = "50px";
      dot.style.height = "35px";
      dot.style.overflow = "hidden";
      dot.style.borderRadius = "4px";
      dot.style.border = "2px solid transparent";

      const thumbImg = slide.querySelector("img")?.src ||
        slide.style.backgroundImage.replace(/url\(["']?|["']?\)/g, "");

      dot.innerHTML = `<img src="${thumbImg}" style="width:100%;height:100%;object-fit:cover;">`;
    }
    else { // default circle
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.borderRadius = "50%";
      dot.style.background = "#ccc";
    }

    dot.onclick = () => goToSlide(i);
    indicatorWrapper.appendChild(dot);
    indicators.push(dot);
  });

  /* ================= ARROWS ================= */
  const leftArrow = document.createElement("div");
  const rightArrow = document.createElement("div");

  leftArrow.innerHTML = "&#10094;";
  rightArrow.innerHTML = "&#10095;";

  [leftArrow, rightArrow].forEach(arrow => {
    arrow.style.position = "absolute";
    arrow.style.top = "50%";
    arrow.style.transform = "translateY(-50%)";
    arrow.style.fontSize = "28px";
    arrow.style.cursor = "pointer";
    arrow.style.padding = "8px 12px";
    arrow.style.borderRadius = "8px";
    arrow.style.transition = "all 0.3s ease";
    arrow.style.userSelect = "none";
    arrow.style.zIndex = "6";
  });

  leftArrow.style.left = "10px";
  rightArrow.style.right = "10px";
  slider.appendChild(leftArrow);
  slider.appendChild(rightArrow);

  leftArrow.onclick = () => current > 0 && goToSlide(current - 1);
  rightArrow.onclick = () => current < slides.length - 1 && goToSlide(current + 1);

  function updateArrows() {
    if (current === 0) {
      leftArrow.style.background = "#ddd";
      leftArrow.style.color = "#888";
    } else {
      leftArrow.style.background = "#111";
      leftArrow.style.color = "#fff";
    }

    if (current === slides.length - 1) {
      rightArrow.style.background = "#ddd";
      rightArrow.style.color = "#888";
    } else {
      rightArrow.style.background = "#111";
      rightArrow.style.color = "#fff";
    }
  }

  function updateIndicators() {
    indicators.forEach((dot, i) => {
      if (indicatorType === "thumbnail") {
        dot.style.border = i === current ? "2px solid #000" : "2px solid transparent";
      }
      else if (indicatorType === "number") {
        dot.style.background = i === current ? "#333" : "#e5e5e5";
        dot.style.color = i === current ? "#fff" : "#555";
      }
      else {
        dot.style.background = i === current ? "#000" : "#bbb";
      }
    });
  }

  function goToSlide(index) {
    slides[current].style.opacity = "0";
    current = index;
    slides[current].style.opacity = "1";
    updateIndicators();
    updateArrows();
  }

  updateIndicators();
  updateArrows();

  if (autoPlay) {
    setInterval(() => {
      let next = current + 1;
      if (next >= slides.length) next = 0;
      goToSlide(next);
    }, duration);
  }
}
