  const slider = document.querySelector('.swiper-container');
  var mySwiper = new Swiper (slider, {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    initialSlide: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      grabCursor: true
    },

    breakpoints: {
      1000: {
        slidesPerView: 2,
        spaceBetween: 36,
        grabCursor: true,
      },
      1170: {
        slidesPerView: 3,
        spaceBetween: 30,
        grabCursor: true,
        // pagination: true,
        navigation: {
        nextEl: '.portfolio__button-right',
        prevEl: '.portfolio__button-left',
        }
      },
    }
    },
  );

  $(window).resize(function(event) { mySwiper.update(); });