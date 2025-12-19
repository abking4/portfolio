
$(function() {
  const d = new Date();
  const hours = d.getHours();
  const night = hours >= 19 || hours <= 7; // between 7pm and 7am
  const body = document.querySelector('body');
  const toggle = document.getElementById('toggle');
  const input = document.getElementById('switch');

  const introLogo = document.querySelector('.introLogo');
  const footerLogo = document.querySelector('.footer_logo'); // make sure this matches your HTML exactly

  if (night) {
    input.checked = true;
    body.classList.add('night');
    if (introLogo) introLogo.src = 'img/LogoWhite.png';
    if (footerLogo) footerLogo.src = 'img/LogoKWhite.png';
  }

  toggle.addEventListener('click', function() {
    const isChecked = input.checked;

    if (introLogo) {
      introLogo.src = isChecked ? 'img/Logo.png' : 'img/LogoWhite.png';
    }
    if (footerLogo) {
      footerLogo.src = isChecked ? 'img/LogoK.png' : 'img/LogoKWhite.png';
    }

    body.classList.toggle('night', !isChecked);
  });

  // rest of your existing scroll, wave-hand, and ScrollReveal code here...
});






// --- Cursor dot logic ---
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (!isTouchDevice()) {
  const dot = document.createElement("div");
  dot.classList.add("cursor-dot");
  document.body.appendChild(dot);

  // Style the dot
  Object.assign(dot.style, {
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "yellow", // <-- your yellow dot
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translate(-50%, -50%)",
  });

  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
  const delay = 0.1;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    dotX += (mouseX - dotX) * delay;
    dotY += (mouseY - dotY) * delay;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();
}





document.querySelectorAll('.project__pic.rotating').forEach(fig => {
  const imgs = Array.from(fig.querySelectorAll('img'));
  let index = 0, interval;

  function show(i) {
    imgs.forEach((img, j) => {
      img.classList.toggle('active', j === i);
    });
  }

  function rotate() {
    index = (index + 1) % imgs.length;
    show(index);
  }

  const autoRotate = () => {
    interval = setInterval(rotate, 3000);
  };

  const stopRotate = () => {
    clearInterval(interval);
  };

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    fig.addEventListener('mouseenter', () => {
      rotate(); // show next immediately
      autoRotate();
    });
    fig.addEventListener('mouseleave', () => {
      stopRotate();
      show(0); // return to first
    });
  } else {
    autoRotate();
  }
});

const typed = new Typed(".autoType", {
  strings : [
      "clients crack a smile once in a while!", 
      "my mockups make the live site!", 
      "my code compiles on the first try!",
      "algorithms behave themselves!",
      "CSS grids don't collapse!",
      "a project inquiry says illustration!",
      "fonts match the brand tone!",
      "Photoshop doesn't overload my scratch disk."
    ],
  typeSpeed : 150,
  backSpeed : 150,
  loop : true,
  backDelay: 2000,
  loopCount: Infinity,
  showCursor: true,
  cursorChar: `|`,
});