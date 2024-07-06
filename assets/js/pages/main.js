const mainVisual = {
  timeoutInstance: undefined,
  currentVideoInstance: undefined,
  swiper: undefined,
  elements: {
    conatiner: undefined,
    slider: undefined
  },
  init() {
    if (!this.elements.conatiner) this.elements.conatiner = document.querySelector(".main-section.main-visual");
    if (!this.elements.slider) this.elements.slider = this.elements.conatiner.querySelector(".main-visual-slider");

    if (!this.swiper) {
      this.swiper = new Swiper(this.elements.slider, {
        loop: true,
        speed: 450,
        spaceBetween: 0,
        slidesPerView: 1,
        // autoplay: {
        //   delay: 4500,
        //   disableOnInteraction: false,
        // },
        pagination: {
          el: this.elements.conatiner.querySelector(".swiper-pagination"),
          clickable: true,
        },
        on: {
          init(v) {

          },
          slideChange(v) {
            if (this.timeoutInstance) {
              clearTimeout(this.timeoutInstance);
              this.timeoutInstance = undefined;
            }

            const item = v.slides[v.activeIndex];
            const mediaType = item.dataset.mediaType;

            if (this.currentVideoInstance) {
              // 슬라이드 넘어갈 때 영상 450ms 뒤에 초기화
              const prevVideo = this.currentVideoInstance;
              setTimeout(() => {
                  prevVideo.pause();
                  prevVideo.style.zIndex = null;
                  prevVideo.currentTime = 0;
              }, 450);
            }
            if (mediaType === "video") {
              this.currentVideoInstance = item.querySelector("video");
            } else {
              this.currentVideoInstance = undefined;
            }

          },
          slideChangeTransitionEnd(v) {
            if (this.currentVideoInstance) {
              this.currentVideoInstance.style.zIndex = 2;
              this.currentVideoInstance.volume = 0;
              this.currentVideoInstance.play();
              this.currentVideoInstance.onended = () => {
                v.slideNext();
              }
            } else {
              this.timeoutInstance = setTimeout(() => {
                v.slideNext();
              }, 4500);
            }
          }
        }
      })
    }
  }
}

const notice = {
  swiper: undefined,
  elements: {
    conatiner: undefined,
    slider: undefined
  },
  init() {
    if (!this.elements.conatiner) this.elements.conatiner = document.querySelector(".main-wrapper .notice-banner");
    if (!this.elements.slider) this.elements.slider = this.elements.conatiner.querySelector(".notice-slider");

    if (!this.swiper) {
      this.swiper = new Swiper(this.elements.slider, {
        loop: true,
        direction: "vertical",
        speed: 450,
        spaceBetween: 0,
        slidesPerView: 1,
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
        },
      })
    }
  }
}

const match = {
  slotSwiper: undefined,
  playerSwiper: undefined,
  goodsSwiper: undefined,
  elements: {
    conatiner: undefined,
    slotSlider: undefined,
    playerSlider: undefined,
    goodsSlider: undefined
  },
  init() {
    if (!this.elements.conatiner) this.elements.conatiner = document.querySelector(".main-wrapper .match-section");
    if (!this.elements.slotSlider) this.elements.slotSlider = this.elements.conatiner.querySelector(".slot-slider");
    if (!this.elements.playerSlider) this.elements.playerSlider = this.elements.conatiner.querySelector(".player-slider");
    if (!this.elements.goodsSlider) this.elements.goodsSlider = this.elements.conatiner.querySelector(".goods-slider");
    const btns = this.elements.conatiner.querySelectorAll(".slider-btn");
    const progress = this.elements.conatiner.querySelector(".progress .bar");

    if (!this.playerSwiper) {
      this.playerSwiper = new Swiper(this.elements.playerSlider, {
        speed: 450,
        spaceBetween: 20,
        // slidesPerView: "auto",
        slidesPerView: 1,
        navigation: {
          nextEl: btns[1],
          prevEl: btns[0],
        },
        breakpoints: {
          1024: {
            spaceBetween: 30,
            slidesPerView: 3,
          }
        },
        on: {
          init(v) {
            progress.style.scale = `${(v.activeIndex + 1) / v.slides.length} 1`;
          },
          slideChange(v) {
            progress.style.scale = `${(v.activeIndex + 1) / v.slides.length} 1`;
          }
        }
      })
    }

    if (!this.slotSwiper) {
      this.slotSwiper = new Swiper(this.elements.slotSlider, {
        speed: 450,
        spaceBetween: 20,
        slidesPerView: "auto",
        centeredSlides: true,
        breakpoints: {
          1024: {
            spaceBetween: 40,
            slidesPerView: 5,
            centeredSlides: false,
          }
        }
      });
    }

    if (!this.goodsSwiper) {
      this.goodsSwiper = new Swiper(this.elements.goodsSlider, {
        speed: 450,
        spaceBetween: 20,
        slidesPerView: "auto",
        centeredSlides: true,
        breakpoints: {
          1024: {
            spaceBetween: 34,
            slidesPerView: 5,
            centeredSlides: false,
          }
        }
      });
    }
  }
}

const pageMain = {
  init() {
    mainVisual.init();
    notice.init();
    match.init();
  }
}