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

// Cursor effect code separate to keep it safe and intact
document.addEventListener('DOMContentLoaded', () => {
  const blob = document.querySelector('.blob-cursor');
  if (!blob) return; // avoid errors if element missing

  blob.style.top = '50vh';
  blob.style.left = '50vw';

  window.addEventListener('mousemove', e => {
    blob.style.top = `${e.clientY}px`;
    blob.style.left = `${e.clientX}px`;
  });

  window.addEventListener('mousedown', () => {
    blob.classList.add('active');
  });

  window.addEventListener('mouseup', () => {
    blob.classList.remove('active');
  });
});


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

