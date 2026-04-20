/* ================= PERCENTAGE BAR JS ================= */
(function(){
  const bars = document.querySelectorAll(".pb-wrapper");
  if(!bars.length) return;

  function animate(bar){
    if(bar.classList.contains("done")) return;

    bar.classList.add("done");
    const percent = +bar.dataset.percent;
    const fill = bar.querySelector(".pb-fill");
    const text = bar.querySelector(".pb-text");

    let count = 0;
    const timer = setInterval(()=>{
      if(count >= percent){
        clearInterval(timer);
      }else{
        count++;
        fill.style.width = count + "%";
        text.textContent = count + "%";
      }
    },15);
  }

  function onScroll(){
    bars.forEach(bar=>{
      if(bar.getBoundingClientRect().top < window.innerHeight){
        animate(bar);
      }
    });
  }

  window.addEventListener("scroll", onScroll);
})();


/* ================= STEPPER JS ================= */
(function(){
  const wrapper = document.querySelector(".st-wrapper");
  if(!wrapper) return;

  const steps = wrapper.querySelectorAll(".st-step");
  const fill = wrapper.querySelector(".st-fill");
  const next = document.getElementById("stNext");
  const prev = document.getElementById("stPrev");

  let current = 0;

  function update(){
    steps.forEach((s,i)=>{
      s.classList.toggle("active",i===current);
      s.classList.toggle("done",i<current);
    });

    fill.style.width = (current/(steps.length-1))*100 + "%";

    prev.disabled = current===0;
    next.disabled = current===steps.length-1;
  }

  next.onclick=()=>{ if(current<steps.length-1){current++;update();}};
  prev.onclick=()=>{ if(current>0){current--;update();}};

  update();
})();


/* ================= Dashed Progress Bar JS ================= */
(function(){
  const bars = document.querySelectorAll(".dp-wrapper");
  if(!bars.length) return;

  function animate(bar){
    if(bar.classList.contains("done")) return;
    bar.classList.add("done");

    const percent = +bar.dataset.percent;
    const fill = bar.querySelector(".dp-fill");
    const text = bar.querySelector(".dp-text");

    let count = 0;
    const timer = setInterval(()=>{
      if(count >= percent){
        clearInterval(timer);
      }else{
        count++;
        fill.style.width = count + "%";
        text.textContent = count + "%";
      }
    },15);
  }

  function onScroll(){
    bars.forEach(bar=>{
      const rect = bar.getBoundingClientRect();
      if(rect.top < window.innerHeight - 40){
        animate(bar);
      }
    });
  }

  window.addEventListener("scroll", onScroll);
})();