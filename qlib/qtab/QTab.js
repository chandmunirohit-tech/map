// document.addEventListener("DOMContentLoaded", function () {

//   document.querySelectorAll("[data-direction]").forEach(section => {

//     const direction = section.getAttribute("data-direction");
//     const items = Array.from(section.querySelectorAll(".tab-item"));

//     const activeClasses = ["bg-blue-600", "text-white", "shadow-md"];
//     const inactiveClasses = ["bg-gray-200", "text-black"];

//     // ====== LAYOUT CONTROL ======
//     if (direction === "top" || direction === "bottom") {
//       section.style.display = "flex";
//       section.style.flexDirection = direction === "top" ? "column" : "column-reverse";
//     }

//     if (direction === "left" || direction === "right") {
//       section.style.display = "flex";
//       section.style.flexDirection = direction === "left" ? "row" : "row-reverse";
//       section.style.alignItems = "flex-start";
//     }

//     // ====== CREATE HEADER & BODY WRAPPERS ======
//     const headerWrap = document.createElement("div");
//     const bodyWrap = document.createElement("div");

//     headerWrap.style.display = "flex";
//     bodyWrap.style.width = "100%";

//     if (direction === "top" || direction === "bottom") {
//       headerWrap.style.flexDirection = "row";
//       headerWrap.style.gap = "10px";
//     } else {
//       headerWrap.style.flexDirection = "column";
//       headerWrap.style.minWidth = "150px";
//       headerWrap.style.textAlign = "centre";
//       headerWrap.style.padding = "0 25px 0 0";
//       headerWrap.style.gap = "10px";
//     }

//     section.innerHTML = "";
//     section.appendChild(headerWrap);
//     section.appendChild(bodyWrap);

//     // ====== TAB LOGIC ======
//     items.forEach((item, index) => {
//       const header = item.querySelector(".tab-header");
//       const body = item.querySelector(".tab-body");

//       body.style.display = "none";
//       header.style.cursor = "pointer";

//       // Base Tailwind style
//       header.classList.add(
//         "px-0",        // mobile
//         "sm:px-4",     // small screens
//         "md:px-6",     // tablets
//         "lg:px-10",    // desktop
//         "py-2",
//         "rounded",
//         "transition",
//         "duration-200"
//       );
//       header.classList.add(...inactiveClasses);
//       headerWrap.style.textAlign = "center";
//       headerWrap.appendChild(header);
//       bodyWrap.appendChild(body);

//       // Default active tab
//       if (index === 0) {
//         body.style.display = "block";
//         header.classList.remove(...inactiveClasses);
//         header.classList.add(...activeClasses);
//       }

//       header.addEventListener("click", () => {
//         bodyWrap.querySelectorAll(".tab-body").forEach(b => b.style.display = "none");

//         headerWrap.querySelectorAll(".tab-header").forEach(h => {
//           h.classList.remove(...activeClasses);
//           h.classList.add(...inactiveClasses);
//         });

//         body.style.display = "block";
//         header.classList.remove(...inactiveClasses);
//         header.classList.add(...activeClasses);
//       });
//     });

//   });

// });


document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll("[data-direction]").forEach(section => {

    const direction = section.getAttribute("data-direction");
    const indicatorType = section.getAttribute("indicatorType");
    let indicatorSize = section.getAttribute("indicatorSize");

    // 🔥 NEW ATTRIBUTES
    const indicatorColor = section.getAttribute("indicatorColor") || "black";
    let tabHeaderSize = section.getAttribute("tabHeaderSize") || "45px";

    const items = Array.from(section.querySelectorAll(".tab-item"));

    if (indicatorSize && !indicatorSize.includes("px")) {
      indicatorSize = indicatorSize + "px";
    }

    if (tabHeaderSize && !tabHeaderSize.includes("px")) {
      tabHeaderSize = tabHeaderSize + "px";
    }

    section.style.display = "flex";

    if (direction === "top") section.style.flexDirection = "column";
    if (direction === "bottom") section.style.flexDirection = "column-reverse";
    if (direction === "left") section.style.flexDirection = "row";
    if (direction === "right") section.style.flexDirection = "row-reverse";

    const headerWrap = document.createElement("div");
    const bodyWrap = document.createElement("div");
    bodyWrap.style.flex = "1";

    headerWrap.style.boxSizing = "border-box";
    headerWrap.style.position = "relative";

    if (direction === "top" || direction === "bottom") {
      headerWrap.style.display = "flex";
      headerWrap.style.gap = "15px";
      headerWrap.style.borderBottom = "1px solid #000";
      headerWrap.style.padding = "0 10px";
      headerWrap.style.height = tabHeaderSize;
      headerWrap.style.minHeight = tabHeaderSize;
      headerWrap.style.alignItems = "center";
      headerWrap.style.justifyContent = "flex-start";
      headerWrap.style.width = "100%";
      headerWrap.style.margin = "0";
      headerWrap.style.flexWrap = "nowrap";
    }

    if (direction === "left" || direction === "right") {
      headerWrap.style.display = "flex";
      headerWrap.style.flexDirection = "column";
      headerWrap.style.gap = "10px";
      headerWrap.style.padding = "10px 0";
      headerWrap.style.alignItems = "stretch";
    }

    if (direction === "left") headerWrap.style.borderRight = "1px solid #000";
    if (direction === "right") headerWrap.style.borderLeft = "1px solid #000";

    section.innerHTML = "";
    section.appendChild(headerWrap);
    section.appendChild(bodyWrap);

    let slider = null;

    if (indicatorType === "capsule" || indicatorType === "Dote" || indicatorSize) {

      slider = document.createElement("div");
      slider.style.position = "absolute";
      slider.style.transition = "all 0.35s ease";
      slider.style.zIndex = "0";
      slider.style.left = "0";
      slider.style.bottom = "0";

      // 🔥 Capsule indicator
      function applyCapsuleIndicator(slider, indicatorSize, color) {

  slider.style.background = "transparent";
  slider.style.border = "none";
  slider.style.overflow = "visible";

  // remove old
  let old = slider.querySelector(".capsule-solid");
  if (old) old.remove();

  let capsule = document.createElement("div");
  capsule.className = "capsule-solid";

  capsule.style.position = "absolute";
  capsule.style.top = "0";
  capsule.style.left = "0";
  capsule.style.width = "100%";
  capsule.style.height = "100%";
  capsule.style.pointerEvents = "none";

  // 🔥 INNER SOLID LINE (main requirement)
  let solidLine = document.createElement("div");

  const size = parseInt(indicatorSize) || 4;

  solidLine.style.position = "absolute";
  solidLine.style.bottom = "0";
  solidLine.style.left = "0%";
  solidLine.style.width = "100%";
  solidLine.style.height = size + "px";
  solidLine.style.background = color;

  // 🔥 AUTO PILL RADIUS (thickness ke hisab se)
  solidLine.style.borderRadius = size + "px";

  capsule.appendChild(solidLine);
  slider.appendChild(capsule);
}

      headerWrap.appendChild(slider);
    }

    items.forEach((item, index) => {

      const header = item.querySelector(".tab-header");
      const body = item.querySelector(".tab-body");

      body.style.display = "none";

      header.style.cursor = "pointer";
      header.style.padding = "0 40px";
      header.style.display = "flex";
      header.style.alignItems = "center";
      header.style.justifyContent = "center";
      header.style.transition = "0.3s ease";
      header.style.border = "none";
      header.style.boxSizing = "border-box";
      header.style.position = "relative";
      header.style.zIndex = "1";

      if (direction === "left" || direction === "right") {
        header.style.height = tabHeaderSize;
      }

      headerWrap.appendChild(header);
      bodyWrap.appendChild(body);

      if (index === 0) {
        body.style.display = "block";
        applyIndicator(header);
      }

      header.addEventListener("click", () => {
        bodyWrap.querySelectorAll(".tab-body").forEach(b => b.style.display = "none");
        body.style.display = "block";
        applyIndicator(header);
      });

    });

    function applyIndicator(el) {

      if (!slider) return;

      slider.style.border = "none";
      slider.style.background = "transparent";

      //  Default line indicator
      if (!indicatorType && indicatorSize) {

        slider.style.background = indicatorColor;

        if (direction === "top" || direction === "bottom") {

          slider.style.height = indicatorSize;
          slider.style.width = el.offsetWidth + "px";
          slider.style.left = el.offsetLeft + "px";
          slider.style.bottom = "0px";
          slider.style.top = "auto";

        } else {

          slider.style.width = indicatorSize;
          slider.style.height = el.offsetHeight + "px";
          slider.style.top = el.offsetTop + "px";

          if (direction === "left") {
            slider.style.right = "0px";
            slider.style.left = "auto";
          }

          if (direction === "right") {
            slider.style.left = "0px";
            slider.style.right = "auto";
          }
        }

        return;
      }

      // Capsule & Dote positioning
      if (direction === "top" || direction === "bottom") {

      slider.style.width = el.offsetWidth + "px";
      slider.style.left = el.offsetLeft + "px";
      slider.style.height = el.offsetHeight + "px";

      if (direction === "top") slider.style.top = "0px";

      if (direction === "bottom") {
        slider.style.bottom = "0px";
        slider.style.top = "auto";
      }
    } else {

        slider.style.width = "100%";
        slider.style.height = tabHeaderSize;
        slider.style.top = el.offsetTop + "px";
        slider.style.left = "0px";
      }

      // Dote indicator
        if (indicatorType === "Dote") {

          const size = indicatorSize || "3px";
          const color = section.getAttribute("indicatorColor") || "black";

          if (direction === "top" || direction === "bottom") {
            slider.style.borderBottom = size + " dotted " + color;
          } else {
            if (direction === "left") slider.style.borderRight = size + " dotted " + color;
            if (direction === "right") slider.style.borderLeft = size + " dotted " + color;
          }

          return;
        }

      // Capsule indicator
      if (indicatorType === "capsule") {

        headerWrap.querySelectorAll(".tab-header").forEach(h => {
          h.style.color = "black";
        });

        if (direction !== "bottom") {

          slider.style.background = indicatorColor;
          el.style.color = "white";

        } else {

          applyCapsuleIndicator(slider, indicatorSize || "3px", indicatorColor);
        }
      }
    }
  });
});







