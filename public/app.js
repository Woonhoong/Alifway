(() => {
  "use strict";

  const FRAME_COUNT = 150;
  const FRAME_PAD = 4;
  const FRAME_ROOT = "/frames";
  const FRAME_FILE = (folder, index) =>
    `${FRAME_ROOT}/${folder}/frame_${String(index + 1).padStart(FRAME_PAD, "0")}.jpg`;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const useSequence = !reducedMotion && !mobile;
  const body = document.body;
  const loader = document.querySelector("#site-loader");
  const loaderPercent = document.querySelector("#loader-percent");
  const loaderProgress = document.querySelector("#loader-progress");
  const chapters = [...document.querySelectorAll(".scrub-chapter")];
  const totalFrames = chapters.length * FRAME_COUNT;

  body.classList.add("is-loading");

  const setProgress = (loaded) => {
    const ratio = Math.min(1, loaded / totalFrames);
    const percentage = Math.round(ratio * 100);
    if (loaderPercent) loaderPercent.textContent = `${percentage}%`;
    if (loaderProgress) loaderProgress.style.transform = `scaleX(${ratio})`;
  };

  const loadImage = (src) => new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

  async function preloadChapter(folder, onItem) {
    const frames = new Array(FRAME_COUNT).fill(null);
    const first = await loadImage(FRAME_FILE(folder, 0));
    frames[0] = first;
    onItem();

    // Empty folders are valid while the owner's sequences are being mapped.
    // A single probe avoids 149 unnecessary 404s and keeps the page usable.
    if (!first) {
      for (let i = 1; i < FRAME_COUNT; i += 1) onItem();
      return frames;
    }

    let cursor = 1;
    const workers = Array.from({ length: 12 }, async () => {
      while (cursor < FRAME_COUNT) {
        const index = cursor++;
        frames[index] = await loadImage(FRAME_FILE(folder, index));
        onItem();
      }
    });
    await Promise.all(workers);
    return frames;
  }

  function coverDraw(context, image, width, height) {
    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = width / height;
    let drawWidth;
    let drawHeight;
    let x;
    let y;

    if (imageRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imageRatio;
      x = (width - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imageRatio;
      x = 0;
      y = (height - drawHeight) / 2;
    }
    context.clearRect(0, 0, width, height);
    context.drawImage(image, x, y, drawWidth, drawHeight);
  }

  function setupSequence(chapter, frames) {
    const canvas = chapter.querySelector("canvas");
    const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
    const callouts = [...chapter.querySelectorAll(".service-callouts li")];
    let targetProgress = 0;
    let smoothedProgress = 0;
    let previousIndex = -1;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(window.innerWidth * ratio);
      height = Math.round(window.innerHeight * ratio);
      canvas.width = width;
      canvas.height = height;
      previousIndex = -1;
    };

    const findFrame = (index) => {
      if (frames[index]) return frames[index];
      for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
        if (frames[index - offset]) return frames[index - offset];
        if (frames[index + offset]) return frames[index + offset];
      }
      return null;
    };

    const updateTarget = () => {
      const rect = chapter.getBoundingClientRect();
      const travel = Math.max(1, chapter.offsetHeight - window.innerHeight);
      targetProgress = Math.max(0, Math.min(1, -rect.top / travel));
    };

    const render = () => {
      smoothedProgress += (targetProgress - smoothedProgress) * 0.085;
      const index = Math.min(FRAME_COUNT - 1, Math.round(smoothedProgress * (FRAME_COUNT - 1)));

      if (index !== previousIndex) {
        const frame = findFrame(index);
        if (frame) coverDraw(context, frame, width, height);
        previousIndex = index;
      }

      chapter.style.setProperty("--chapter-progress", smoothedProgress.toFixed(4));
      callouts.forEach((item, itemIndex) => {
        const threshold = 0.25 + itemIndex * 0.17;
        item.classList.toggle("is-active", smoothedProgress > threshold);
      });
      requestAnimationFrame(render);
    };

    resize();
    updateTarget();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", updateTarget, { passive: true });
    requestAnimationFrame(render);
  }

  function setupReveals() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
    }, { threshold: 0.62 });
    document.querySelectorAll("[data-reveal]").forEach((line) => observer.observe(line));
  }

  function setupSmoothScroll() {
    if (reducedMotion || !("Lenis" in window)) return;
    const lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.92 });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { duration: 1.3 });
      });
    });
  }

  function setupMobileVideos() {
    if (!mobile && !reducedMotion) return;
    document.querySelectorAll(".motion-fallback").forEach((video) => {
      video.play().catch(() => {});
    });
  }

  function setupContact() {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      status.textContent = "Opening Alifway Media on Instagram to continue your enquiry…";
      window.open("https://www.instagram.com/alifwaymedia.ae/", "_blank", "noopener,noreferrer");
    });
  }

  async function init() {
    let loaded = 0;
    const onItem = () => { loaded += 1; setProgress(loaded); };

    if (useSequence) {
      const sequences = await Promise.all(chapters.map((chapter) => preloadChapter(chapter.dataset.sequence, onItem)));
      chapters.forEach((chapter, index) => setupSequence(chapter, sequences[index]));
    } else {
      loaded = totalFrames;
      setProgress(loaded);
      setupMobileVideos();
    }

    setupReveals();
    setupSmoothScroll();
    setupContact();

    window.setTimeout(() => {
      loader?.classList.add("is-complete");
      body.classList.remove("is-loading");
    }, 350);
  }

  init();
})();
