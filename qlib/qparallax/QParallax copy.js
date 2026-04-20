// vertical parallex effect
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".parallax");
    const bg = document.getElementById("parallaxBg");

    const speed = 0.4;
    const offset = parallax.offsetTop;

    if(scrolled > offset - window.innerHeight && scrolled < offset + parallax.offsetHeight){
        bg.style.transform = `translateY(${(scrolled - offset) * speed}px)`;
    }
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