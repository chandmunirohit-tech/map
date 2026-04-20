window.addEventListener("load", function () {

  const sections = document.querySelectorAll(".rg-parallax");
  if (!sections.length) return;

  sections.forEach(section => {

    const bgImage = section.style.backgroundImage;
    if (!bgImage) return;

    // Original background hata ke layer banayenge
    section.style.backgroundImage = "none";
    section.style.position = "relative";
    section.style.overflow = "hidden";

    const layer = document.createElement("div");
    layer.style.position = "absolute";
    layer.style.top = "0";
    layer.style.left = "0";
    layer.style.width = "100%";
    layer.style.height = "140%";
    layer.style.backgroundImage = bgImage;
    layer.style.backgroundSize = "cover";
    layer.style.backgroundPosition = "center";
    layer.style.backgroundRepeat = "no-repeat";
    layer.style.zIndex = "-1";
    layer.style.willChange = "transform";

    section.prepend(layer);

    function updateParallax() {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      const offsetTop = section.offsetTop;
      const speed = 0.25; // 🔥 speed control

      const move = (scrollTop - offsetTop) * speed;
      layer.style.transform = `translateY(${move}px)`;
    }

    window.addEventListener("scroll", updateParallax);
    updateParallax();
  });
});


// horizental parallex effect with 3 imagesc
const wrapper = document.getElementById("hWrapper");
const strip = document.getElementById("hStrip");

window.addEventListener("scroll", () => {
    const rect = wrapper.getBoundingClientRect();
    const scrollArea = wrapper.offsetHeight - window.innerHeight;

    if(rect.top <= 0 && rect.bottom >= window.innerHeight){
        const progress = Math.min(
            Math.max(Math.abs(rect.top) / scrollArea, 0),
            1
        );

        const maxMove = window.innerWidth * 2; // 3 images
        strip.style.transform = `translateX(${-progress * maxMove}px)`;
    }
});