const overlay = document.querySelector(".rg-nav-overlay");

const navs = {
  left: document.getElementById("rgNavLeft"),
  right: document.getElementById("rgNavRight"),
  top: document.getElementById("rgNavTop"),
  bottom: document.getElementById("rgNavBottom")
};

function rgOpenNav(side){
  rgCloseNav();
  navs[side].classList.add("active");
  overlay.classList.add("active");
}

function rgCloseNav(){
  Object.values(navs).forEach(nav=>{
    nav.classList.remove("active");
  });
  overlay.classList.remove("active");
}
