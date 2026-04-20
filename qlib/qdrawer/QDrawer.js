// const overlay = document.querySelector(".rg-nav-overlay");

// const navs = {
//   left: document.getElementById("rgNavLeft"),
//   right: document.getElementById("rgNavRight"),
//   top: document.getElementById("rgNavTop"),
//   bottom: document.getElementById("rgNavBottom")
// };

// function rgOpenNav(side){
//   rgCloseNav();
//   navs[side].classList.add("active");
//   overlay.classList.add("active");
// }

// function rgCloseNav(){
//   Object.values(navs).forEach(nav=>{
//     nav.classList.remove("active");
//   });
//   overlay.classList.remove("active");
// }




// document.addEventListener("DOMContentLoaded", function () {
//   const buttons = document.querySelectorAll(".drawer-open");
//   buttons.forEach(function (btn) {
//     btn.addEventListener("click", function () {

//       const direction = this.dataset.direction;
//       const target = this.dataset.target;
//       const drawer = document.querySelector(target);
//       if (!drawer) return;
//       toggleDrawer(drawer, direction);

//     });
//   });


//   document.querySelectorAll(".drawer-close").forEach(function (btn) {
//     btn.addEventListener("click", function () {
//       const drawer = this.closest(".drawerBody");
//       if (!drawer) return;

//       const direction = getDrawerDirection(drawer);
//       closeDrawer(drawer, direction);

//     });
//   });


//   function toggleDrawer(drawer, direction) {
//     const isOpen = drawer.classList.contains("active");
//     if (isOpen) {
//       closeDrawer(drawer, direction);
//     } else {
//       openDrawer(drawer, direction);
//     }
//   }


//   function openDrawer(drawer, direction) {
//     drawer.classList.add("active");
//     if (direction === "left") drawer.style.left = "0";
//     if (direction === "right") drawer.style.right = "0";
//     if (direction === "top") drawer.style.top = "0";
//     if (direction === "bottom") drawer.style.bottom = "0";
//   }


//   function closeDrawer(drawer, direction) {
//     drawer.classList.remove("active");
//     if (direction === "left") drawer.style.left = "-100%";
//     if (direction === "right") drawer.style.right = "-100%";
//     if (direction === "top") drawer.style.top = "-100%";
//     if (direction === "bottom") drawer.style.bottom = "-100%";
//   }


//   function getDrawerDirection(drawer) {
//     if (drawer.classList.contains("leftDrawer")) return "left";
//     if (drawer.classList.contains("rightDrawer")) return "right";
//     if (drawer.classList.contains("topDrawer")) return "top";
//     if (drawer.classList.contains("bottomDrawer")) return "bottom";
//   }
// });


// document.addEventListener("DOMContentLoaded", function () {

//   const openBtn = document.querySelector(".drawer-open");
//   const drawer = document.querySelector(".topDrawer");
//   const closeBtn = document.querySelector(".drawer-close");

//   let isOpen = false;

//   openBtn.addEventListener("click", function () {

//     if (!isOpen) {
//       drawer.style.top = "0";   // open
//       isOpen = true;
//     } 
//     else {
//       drawer.style.top = "-80vh"; // close
//       isOpen = false;
//     }

//   });

//   closeBtn.addEventListener("click", function () {

//     drawer.style.top = "-80vh";
//     isOpen = false;

//   });

// });



document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".drawer").forEach(function(drawerWrapper){

    const drawerBody = drawerWrapper.querySelector(".drawerBody");
    const direction = drawerBody.getAttribute("drawer-direction") || "top";

    let isOpen = false;

    const positionMap = {
      top: {
        open: () => { drawerBody.style.top = "0";},
        close: () => { drawerBody.style.top = "-100vh";},
        init: () => {
          drawerBody.style.top = "-100vh";
          drawerBody.style.left = "0";
          drawerBody.style.right = "auto";
          drawerBody.style.bottom = "auto";
        }
      },

      bottom: {
        open: () => { drawerBody.style.bottom = "0"; },
        close: () => { drawerBody.style.bottom = "-100vh"; },
        init: () => {
          drawerBody.style.bottom = "-100vh";
          drawerBody.style.left = "0";
          drawerBody.style.top = "auto";
          drawerBody.style.right = "auto";
        }
      },

      left: {
        open: () => { drawerBody.style.left = "0"; },
        close: () => { drawerBody.style.left = "-90%"; },
        init: () => {
          drawerBody.style.left = "-90%";
          drawerBody.style.top = "0";
          drawerBody.style.right = "auto";
          drawerBody.style.bottom = "auto";
        }
      },

      right: {
        open: () => { drawerBody.style.right = "0"; },
        close: () => { drawerBody.style.right = "-90%"; },
        init: () => {
          drawerBody.style.right = "-90%";
          drawerBody.style.top = "0";
          drawerBody.style.left = "auto";
          drawerBody.style.bottom = "auto";
        }
      }
    };

    const config = positionMap[direction];

    config.init();
    function openDrawer(){
      config.open();
      isOpen = true;
    }

    function closeDrawer(){
      config.close();
      isOpen = false;
    }

    const clickableSections = [...drawerWrapper.children].filter(
      el => !el.classList.contains("drawerBody")
    );

    clickableSections.forEach(function(section){
      section.addEventListener("click", function(){
        isOpen ? closeDrawer() : openDrawer();
      });
    });


    /* CROSS ICON CLICK → CLOSE DRAWER */
    const closeIcon = drawerBody.querySelector("img");
    
    if(closeIcon){
      closeIcon.addEventListener("click", function(e){
        e.stopPropagation(); 
        closeDrawer();
      });
    }

  });

});