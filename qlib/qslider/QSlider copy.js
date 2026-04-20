document.querySelectorAll(".slider").forEach(slider=>{
  const slides = slider.querySelectorAll(".slide");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");
  const dotsBox = slider.querySelector(".dots");

  let index = 0;
  let timer;

  /* create bullets dynamically */
  slides.forEach((_,i)=>{
    const dot = document.createElement("span");
    dot.className = "dot" + (i===0 ? " active" : "");
    dot.addEventListener("click",()=>goTo(i));
    dotsBox.appendChild(dot);
  });

  const dots = dotsBox.querySelectorAll(".dot");

  function goTo(i){
    slides[index].classList.remove("active");
    dots[index].classList.remove("active");

    index = i;

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    resetAuto();
  }

  next.onclick = ()=>goTo((index+1)%slides.length);
  prev.onclick = ()=>goTo((index-1+slides.length)%slides.length);

  function autoSlide(){
    timer = setInterval(()=>{
      goTo((index+1)%slides.length);
    },4000);
  }

  function resetAuto(){
    clearInterval(timer);
    autoSlide();
  }

  autoSlide();
});
