document.addEventListener("DOMContentLoaded",()=>{

  let currentPopup = null;
  let images = [];
  let index = 0;

  function show(){
    currentPopup.querySelector("img").src = images[index].src;
  }

  document.addEventListener("click",(e)=>{

    /* IMAGE CLICK */
    if(e.target.matches(".rg-gallery img")){
      const gallery = e.target.closest(".rg-gallery");
      currentPopup = document.getElementById(gallery.dataset.popup);

      images = [...gallery.querySelectorAll("img")];
      index = images.indexOf(e.target);

      /* SET CLOSE ICON */
      currentPopup.querySelector(".rg-close").innerHTML =
        currentPopup.dataset.close || "✖";

      show();
      currentPopup.classList.add("active");
      document.body.style.overflow="hidden";
    }

    /* CLOSE */
    if(e.target.classList.contains("rg-close")){
      currentPopup.classList.remove("active");
      document.body.style.overflow="";
    }

    /* NEXT / PREV */
    if(e.target.classList.contains("rg-arrow")){
      if(e.target.classList.contains("right")){
        index = (index+1) % images.length;
      }else{
        index = (index-1+images.length) % images.length;
      }
      show();
    }

    /* OUTSIDE CLICK */
    if(e.target.classList.contains("rg-popup")){
      currentPopup.classList.remove("active");
      document.body.style.overflow="";
    }

  });

  document.addEventListener("keydown",(e)=>{
    if(!currentPopup || !currentPopup.classList.contains("active")) return;
    if(e.key==="Escape"){
      currentPopup.classList.remove("active");
      document.body.style.overflow="";
    }
  });

});
