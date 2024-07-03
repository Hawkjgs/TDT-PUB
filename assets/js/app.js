let lastScrollY;
window.addEventListener("load", () => {

});

window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  // HEADER
  header.init();
  // GNB
  gnb.init();
  // MODAL
  modal.init();
  // MODAL SLIDER
  modalSlider.init();

  if (body.classList.contains("main")) {
    // 메인 페이지
    pageMain.init();
  }
  // 섹션 이동 스크롤 탭
  scrollTab.init();
  // 굿즈 목록 비디오 플레이 버튼 클릭
  goods.init();

  // window.modalOpen = modal.open.bind(modal);
  // window.modalClose = modal.close.bind(modal);
  // window.modalSliderClear = modalSlider.destroy.bind(modalSlider);
  // window.modalSliderInit = modalSlider.init.bind(modalSlider);

  // modalOpen('matchPlayerGoods');
  // modalOpen('matchPlayer');
  // modal.open('confirmExample');
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY < lastScrollY) {
    document.documentElement.classList.remove("page-down");
    document.documentElement.classList.add("page-up");
  } else {
    document.documentElement.classList.remove("page-up");
    document.documentElement.classList.add("page-down");
  }

  scrollTab.scrollFloating(scrollY, lastScrollY);

  lastScrollY = window.scrollY;
});

window.addEventListener("resize", debounce(() => {
  scrollTab.setValues();
}, 300));