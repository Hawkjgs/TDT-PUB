import { scrollLock, scrolled, smoothScrollTo } from "./utils.js";

export const header = {
  elements: {
    container: undefined,
    btnSounds: undefined,
  },
  bindEvents() {
    this.elements.btnSounds.forEach(el => {
      el.addEventListener("click", (e) => {
        const target = e.currentTarget;
        if (!target.classList.contains("is-muted")) {
          // 사운드 ON
          this.elements.btnSounds.forEach(btn => btn.classList.add("is-muted"));
        } else {
          // 사운드 OFF
          this.elements.btnSounds.forEach(btn => btn.classList.remove("is-muted"));
        }
      });
    });
  },
  init() {
    if (!this.elements.container) this.elements.container = document.querySelector(".header");
    if (!this.elements.btnSounds) this.elements.btnSounds = Array.from(this.elements.container.querySelectorAll(".btn-sound"));

    this.bindEvents();
  },
};

export const gnb = {
  scrollY: 0,
  elements: {
    header: undefined,
    container: undefined,
    dim: undefined,
    btnMenu: undefined,
    btnClose: undefined,
  },
  activate() {
    this.scrollY = window.scrollY;
    scrollLock(this.scrollY);
    this.elements.container.classList.add("is-active");
  },
  closed() {
    scrolled(this.scrollY);
    this.elements.container.classList.remove("is-active");
  },
  bindEvents() {
    this.elements.btnMenu.addEventListener("click", () => this.activate());
    this.elements.btnClose.addEventListener("click", () => this.closed());
    this.elements.dim.addEventListener("click", () => this.closed());
  },
  init() {
    if (!this.elements.header) this.elements.header = document.querySelector(".header");
    if (!this.elements.container) this.elements.container = document.querySelector(".gnb-mo");
    if (!this.elements.dim) this.elements.dim = this.elements.container.querySelector(".dim");
    if (!this.elements.btnMenu) this.elements.btnMenu = this.elements.header.querySelector(".btn-menu");
    if (!this.elements.btnClose) this.elements.btnClose = this.elements.container.querySelector(".btn-gnb-close");

    this.bindEvents();
  }
}

export const scrollTab = {
  values: {
    parentRect: {},
  },
  elements: {
    container: undefined,
    tabInner: undefined,
    tabBtns: undefined,
    sections: undefined,
  },
  observer: undefined,
  handlers: {
    observerCallback(entries, observer) {
      const lastSection = entries[entries.length - 1];

      // 마지막 앵커 섹션 아래로 콘텐츠가 더 있을 경우 마지막 탭 active 처리
      if (
        lastSection.boundingClientRect.top +
          lastSection.boundingClientRect.height <
        0
      ) {
        const id = lastSection.target.dataset.anchorId;
        this.activateTab(id);
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.anchorId;
          this.activateTab(id);
        }
      });
    },
    tabBtnClick(e) {
      const id = e.currentTarget.dataset.anchorId;
      const sectionIdx = this.elements.sections.findIndex(
        (el) => el.dataset.anchorId === id
      );

      const offsetTop = this.elements.sections[sectionIdx].offsetTop;
      // 이동할 섹션이 위에 있는지 아래에 있는지에 따라 위치 값 변경

      const moveTop =
        offsetTop -
        (window.scrollY > offsetTop
          ? this.values.parentRect.height
          : this.values.parentRect.height);

      if (sectionIdx > -1) {
        smoothScrollTo(0, moveTop, 500);
      }
    },
  },
  scrollFloating(scrollY, lastScrollY) {
    if (!this.elements.container) return;

    const { headerHeight } = this.values;
    const { offsetTop } = this.values.parentRect;

    // const triggerY = lastScrollY > scrollY ? offsetTop - headerHeight : offsetTop;
    const triggerY = lastScrollY > scrollY ? offsetTop : offsetTop;

    if (scrollY > triggerY) {
      this.elements.container.classList.add("is-floating");
    } else {
      this.elements.container.classList.remove("is-floating");
    }
  },
  activateTab(id) {
    this.elements.tabBtns.forEach((btn) => {
      btn.classList.remove("is-active");
      if (btn.dataset.anchorId === id) {
        btn.classList.add("is-active");
      }

      // 모바일에서 active 된 탭 위치에 따라 가로 스크롤 이동
      if (window.innerWidth < 1120 && btn.dataset.anchorId === id) {
        const { tabInner } = this.elements;
        tabInner.scrollLeft = btn.offsetLeft;
      }
    });
  },
  setValues() {
    if (!this.elements.container) return;

    this.values.parentRect = this.elements.container.getBoundingClientRect();
    this.values.parentRect.offsetTop = this.elements.container.offsetTop;
    this.values.headerHeight = document.querySelector(".header")?.clientHeight || 0;
  },
  bindEvents() {
    const handleTabBtnClick = this.handlers.tabBtnClick.bind(this);

    this.elements.tabBtns.forEach((el) => {
      el.addEventListener("click", handleTabBtnClick);
    });
  },
  init() {
    if (!this.elements.container) this.elements.container = document.querySelector("[data-scroll-tab]");

    if (!this.elements.container) return;

    if (!this.elements.tabInner) this.elements.tabInner = this.elements.container.querySelector("ul");
    if (!this.elements.tabBtns) this.elements.tabBtns = Array.from(this.elements.container.querySelectorAll(".tab-btn"));
    if (!this.elements.sections) this.elements.sections = Array.from(document.querySelectorAll("[data-anchor-id]:not(.tab-btn)"));
    if (!this.observer) this.observer = new IntersectionObserver(this.handlers.observerCallback.bind(this), { rootMargin: "-40% 0px -60% 0px" });

    this.elements.sections.forEach((el) => this.observer.observe(el));

    this.setValues();
    this.bindEvents();
    this.scrollFloating(window.scrollY, 0);
  },
};

export const modal = {
  scrollY: 0,
  elements: {
    modals: undefined,
    modalBtns: undefined,
  },
  modalFind(id) {
    return this.elements.modals.findIndex(el => el.dataset.modalId === id);
  },
  open(id) {
    const findIdx = this.modalFind(id);
    if (findIdx > -1) {
      this.scrollY = window.scrollY;
      scrollLock(this.scrollY);
      this.elements.modals[findIdx].classList.add("is-active");
      this.elements.modals[findIdx].scrollTop = 0;
    };
  },
  close(id) {
    const findIdx = this.modalFind(id);
    if (findIdx > -1) {
      scrolled(this.scrollY);
      this.elements.modals[findIdx].classList.remove("is-active");
    };
  },
  bindEvents() {
    this.elements.modalBtns.forEach(el => {
      const id = el.dataset.modalId;
      el.addEventListener("click", () => {
        this.open(id);
      });
    });
    this.elements.modals.forEach(el => {
      const id = el.dataset.modalId;
      el.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          // 모달 여백 클릭 시 닫기
          this.close(id);
          return;
        }
        if (e.target.classList.contains("btn-modal-close") || e.target.closest(".btn-modal-close")) {
          // 모달안에 btn-modal-close 클래스 요소 클릭 시 닫기
          this.close(id);
          return;
        }
      });
    })
  },
  init() {
    this.elements.modals = Array.from(document.querySelectorAll(":not(.modal-btn)[data-modal-id]"));
    this.elements.modalBtns = Array.from(document.querySelectorAll(".modal-btn[data-modal-id]"));

    this.bindEvents();
  }
}

export const goods = {
  elements: {
    items: undefined,
  },
  bindEvents() {
    if (this.elements.items.length > 1) {
      this.elements.items.forEach(el => {
        const btnPlay = el.querySelector(".btn-play");
        const video = el.querySelector("video");
        if (video) {
          btnPlay.addEventListener("click", () => {
            el.classList.add("is-play");
            video.play();
            video.onended = () => {
              el.classList.remove("is-play");
            }
          })
        }
      });
    }
  },
  init() {
    this.elements.items = Array.from(document.querySelectorAll(".component-goods-list .goods-item"));
    this.bindEvents();
  }
}