import { gnb, header, scrollTab } from "./components.js";
import { pageMain } from "./pages/main.js";
import { debounce } from "./utils.js";

let lastScrollY;

window.addEventListener("load", () => {

});

window.addEventListener("DOMContentLoaded", () => {
  header.init();
  gnb.init();
  pageMain.init();
  scrollTab.init();
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