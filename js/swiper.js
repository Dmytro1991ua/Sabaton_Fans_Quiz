"use strict"

export function swiper() {
   const swiper = new Swiper(".hero__slider", {
      slidesPerView: 1,
      spaceBetween: 10,
      grabCursor: true,
      //slideToClickedSlide: true,
      preloadImages: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      loop: true,
      lazy: {
         loadPrevNext: true,
         loadOnTransitionStart: true,
      },
      autoplay: {
         delay: 3000,
         disableOnInteraction: false
      },
      keyboard: {
         enabled: true,
         onlyInViewport: true,
      },
      breakpoints: {
         620: {
            slidesPerView: 2,
            spaceBetween: 20,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 35,
         },
         1200: {
            slidesPerView: 4,
            spaceBetween: 40,
         },

         1600: {
            slidesPerView: 5,
            spaceBetween: 45,
         },
      },
      observer: true,
      observeParents: true,
   });
}