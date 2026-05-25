window.addEventListener("scroll", function () {
  var header = document.querySelector(".header-sticky");
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 0);
  }
});

$(document).ready(function() {
    $('.popup-gallery').magnificPopup({
  delegate: 'a',
  type: 'image',
  gallery: {
    enabled: true
  },
  mainClass: 'mfp-fade',
  removalDelay: 300,
  image: {
    titleSrc: 'title'
  }
});

  });
  
  const servicesSwiper = new Swiper('.services-slider', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 3,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    991: {
      slidesPerView: 4
    },
    768: {
      slidesPerView: 3
    },
    480: {
      slidesPerView: 2
    }
  }
});

// Swiper Slider Init
var gallerySwiper = new Swiper(".gallery-slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 4 },
  }
});