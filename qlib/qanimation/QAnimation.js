document.addEventListener("DOMContentLoaded", function () {

  const targets = document.querySelectorAll("[animationType]");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        runAnimation(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  targets.forEach(el => observer.observe(el));

  function runAnimation(el){

    function getAttr(attr, fallback){
      return (el.getAttribute(attr) ?? fallback)
        .split(",")
        .map(v => v.trim());
    }

    function getVal(arr, i, def){
      return arr[i] ?? arr[0] ?? def;
    }

    function parseTime(v){
      if(!v) return 0;
      v = v.toLowerCase().trim();
      if(v.endsWith("ms")) return parseFloat(v);
      if(v.endsWith("s")) return parseFloat(v)*1000;
      return parseFloat(v)*1000;
    }

    function getEasing(style){
      if(!style) return "ease";

      style = style.toLowerCase().replace(/\s/g,'');

      switch(style){
        case "easein":
        case "ease-in": return "ease-in";

        case "easeout":
        case "ease-out": return "ease-out";

        case "easeinout":
        case "ease-in-out": return "ease-in-out";

        case "linear": return "linear";
        case "bounce": return "cubic-bezier(.34,1.56,.64,1)";
        case "back": return "cubic-bezier(.68,-0.55,.27,1.55)";
        case "smooth": return "cubic-bezier(.25,.1,.25,1)";
        default: return "ease";
      }
    }

    function getIteration(val){
      if(!val) return 1;
      val = val.toLowerCase();
      if(val === "infinite") return Infinity;
      return parseInt(val) || 1;
    }

    function getKeyframes(type, dir){

      type = type.toLowerCase().replace(/\s/g,'');
      dir = (dir || "left").toLowerCase();

      const OFFSET = 80;

      let x = 0, y = 0;

      if(dir === "left") x = -OFFSET;
      if(dir === "right") x = OFFSET;
      if(dir === "top") y = -OFFSET;
      if(dir === "bottom") y = OFFSET;

      switch(type){

        case "fade":
          return [
            {opacity:0, transform:`translate(${x}px,${y}px)`},
            {opacity:1, transform:`translate(0,0)`}
          ];

        case "blur":
          return [
            {filter:"blur(10px)", transform:`translate(${x}px,${y}px)`},
            {filter:"blur(0px)", transform:`translate(0,0)`}
          ];

        case "zoom":
          return [
            {transform:`translate(${x}px,${y}px) scale(0.5)`},
            {transform:`translate(0,0) scale(1)`}
          ];

        case "rotate":
          return [
            {transform:`translate(${x}px,${y}px) rotate(0deg)`},
            {transform:`translate(0,0) rotate(360deg)`}
          ];

        case "flip":
          return [
            {transform:`translate(${x}px,${y}px) rotateY(0deg)`},
            {transform:`translate(0,0) rotateY(360deg)`}
          ];

        case "shake":
          return [
            { transform: `translate(${x}px,${y}px)` },
            { transform: `translate(${x - 10}px,${y}px)` },
            { transform: `translate(${x + 10}px,${y}px)` },
            { transform: `translate(${x - 10}px,${y}px)` },
            { transform: `translate(${x + 10}px,${y}px)` },
            { transform: `translate(${x}px,${y}px)` }
          ];

        case "slideinleft":
          return [
            { transform:`translateX(-${OFFSET}px)` },
            { transform:`translateX(0)` }
          ];

        case "slideinright":
          return [
            { transform:`translateX(${OFFSET}px)` },
            { transform:`translateX(0)` }
          ];

        /* 🔥 FIXED (NO JUMP) */
        case "slideintop":
          return [
            { transform:`translateY(0)` },
            { transform:`translateY(-${OFFSET}px)` }
          ];

        case "slideinbottom":
          return [
            { transform:`translateY(0)` },
            { transform:`translateY(${OFFSET}px)` }
          ];

        case "slideoutbottom":
          return [
            { transform:`translateY(0)`, opacity:1 },
            { transform:`translateY(${OFFSET}px)`, opacity:0 }
          ];

        default:
          return [
            {opacity:0, transform:`translate(${x}px,${y}px)`},
            {opacity:1, transform:`translate(0,0)`}
          ];
      }
    }

    const types = getAttr("animationType","fade");
    const dirs = getAttr("animationDirection","left");
    const easings = getAttr("animationEasing","ease");
    const durations = getAttr("animationDuration","1s");
    const delays = getAttr("animationDelay","0s");
    const iterations = getAttr("animationIterations","1");

    let i = 0;

    function play(){

      if(i >= types.length) return;

      const type = getVal(types,i,"fade");
      const dir = getVal(dirs,i,"left");
      const iter = getVal(iterations,i,"1");

      const isInfinite = iter === "infinite";

      const options = {
          duration: parseTime(getVal(durations,i,"1s")),
          delay: parseTime(getVal(delays,i,"0s")),
          easing: getEasing(getVal(easings,i,"ease")),
          fill: "none"   
        };

      /* 🔥 INFINITE LOOP FIX */
      if(isInfinite){
        el.animate(
          getKeyframes(type, dir),
          {
            ...options,
            iterations: Infinity,
            direction: "alternate"
          }
        );
        return;
      }

      /* 🔁 NORMAL FLOW */
      const forward = el.animate(
        getKeyframes(type, dir),
        options
      );

      forward.onfinish = () => {

        const reverse = el.animate(
          getKeyframes(type, dir),
          {
            ...options,
            direction: "reverse"
          }
        );

        reverse.onfinish = () => {
          i++;
          play();
        };
      };
    }

    play();
  }

});