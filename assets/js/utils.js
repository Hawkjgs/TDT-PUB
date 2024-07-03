function debounce(func, wait) {
  let timeout;
  return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

let scrollAnimationId = null;
function smoothScrollTo(endX, endY, duration) {
  if (scrollAnimationId !== null) {
      cancelAnimationFrame(scrollAnimationId);
      scrollAnimationId = null;
  }

  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = performance.now();

  function scroll() {
      const now = performance.now();
      const elapsedTime = now - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Ensure progress does not exceed 1

      // Ease function (easeInOutQuad)
      const easeOutQuad = (t) => t * (2 - t);
      // const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const easedProgress = easeOutQuad(progress);

      const currentX = startX + distanceX * easedProgress;
      const currentY = startY + distanceY * easedProgress;

      window.scrollTo(currentX, currentY);

      if (progress < 1) {
          scrollAnimationId = requestAnimationFrame(scroll);
      } else {
          scrollAnimationId = null;
      }
  }

  scrollAnimationId = requestAnimationFrame(scroll);
}

function scrollLock (scrollY) {
  document.documentElement.setAttribute("data-page-scroll", "false");
  document.body.style.marginTop = `-${scrollY}px`;
}

function scrolled (scrollY) {
  document.documentElement.removeAttribute("data-page-scroll");
  document.body.removeAttribute("style");
  window.scrollTo(0, scrollY);
}