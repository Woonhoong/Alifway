(() => {
  "use strict";

  const FRAME_PAD = 4;
  const FRAME_FILE = (config, index) =>
    `${config.root}/frame_${String(index + 1).padStart(FRAME_PAD, "0")}.jpg`;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const useSequence = !reducedMotion;
  const body = document.body;
  const loader = document.querySelector("#site-loader");
  const loaderPercent = document.querySelector("#loader-percent");
  const loaderProgress = document.querySelector("#loader-progress");
  const chapters = [...document.querySelectorAll(".scrub-chapter")];
  const chapterConfigs = chapters.map((chapter) => ({
    chapter,
    count: Number.parseInt(chapter.dataset.frameCount || "0", 10),
    root: chapter.dataset.frameRoot || `/frames/${chapter.dataset.sequence || ""}`,
  }));
  const totalFrames = Math.max(1, chapterConfigs.reduce((sum, config) => sum + config.count, 0));

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

  async function preloadChapter(config, onItem) {
    if (!config.count) return [];

    const frames = new Array(config.count).fill(null);
    const first = await loadImage(FRAME_FILE(config, 0));
    frames[0] = first;
    onItem();

    // Empty folders are valid while the owner's sequences are being mapped.
    // A single probe avoids 149 unnecessary 404s and keeps the page usable.
    if (!first) {
      for (let i = 1; i < config.count; i += 1) onItem();
      return frames;
    }

    let cursor = 1;
    const workers = Array.from({ length: 12 }, async () => {
      while (cursor < config.count) {
        const index = cursor++;
        frames[index] = await loadImage(FRAME_FILE(config, index));
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
    const heroPanels = [...chapter.querySelectorAll("[data-hero-panel]")];
    const heroMark = chapter.querySelector("[data-hero-mark]");
    const meter = chapter.querySelector(".hero-scroll-meter b");
    const frameCount = frames.length;
    let targetProgress = 0;
    let smoothedProgress = 0;
    let previousIndex = -1;
    let width = 0;
    let height = 0;

    const drawFrame = (image) => {
      if (mobile && chapter.classList.contains("hero-chapter")) {
        const imageRatio = image.naturalWidth / image.naturalHeight;
        const drawWidth = width * 1.72;
        const drawHeight = drawWidth / imageRatio;
        context.fillStyle = "#f7f4fa";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
        return;
      }
      coverDraw(context, image, width, height);
    };

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
      for (let offset = 1; offset < frameCount; offset += 1) {
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
      const index = Math.min(frameCount - 1, Math.round(smoothedProgress * (frameCount - 1)));

      if (index !== previousIndex) {
        const frame = findFrame(index);
        if (frame) drawFrame(frame);
        previousIndex = index;
      }

      chapter.style.setProperty("--chapter-progress", smoothedProgress.toFixed(4));
      callouts.forEach((item, itemIndex) => {
        const threshold = 0.25 + itemIndex * 0.17;
        item.classList.toggle("is-active", smoothedProgress > threshold);
      });
      heroPanels.forEach((panel) => {
        const start = Number.parseFloat(panel.dataset.phaseStart || "0");
        const end = Number.parseFloat(panel.dataset.phaseEnd || "1");
        const entry = Math.max(0, Math.min(1, (smoothedProgress - start) / 0.065));
        const exit = Math.max(0, Math.min(1, (end - smoothedProgress) / 0.07));
        const reveal = Math.min(entry, exit);
        const direction = panel.classList.contains("hero-story-panel-right") ? 1 : -1;
        panel.style.setProperty("--panel-reveal", reveal.toFixed(4));
        panel.style.setProperty("--panel-x", `${(direction * (1 - reveal) * 120).toFixed(2)}px`);
        panel.style.setProperty("--panel-scale", (0.96 + reveal * 0.04).toFixed(4));
      });
      if (heroMark) {
        const markReveal = Math.max(0, Math.min(1, (smoothedProgress - 0.9) / 0.075));
        heroMark.style.setProperty("--mark-reveal", markReveal.toFixed(4));
        heroMark.style.setProperty("--mark-opacity", (markReveal * 0.92).toFixed(4));
        heroMark.style.setProperty("--mark-scale", (0.54 + markReveal * 0.46).toFixed(4));
        heroMark.style.setProperty("--mark-spacing", `${(0.14 - markReveal * 0.1).toFixed(3)}em`);
      }
      if (meter) meter.style.transform = `scaleX(${smoothedProgress.toFixed(4)})`;
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

  function setupMediaJourney() {
    const journey = document.querySelector("[data-media-journey]");
    if (!journey) return;
    const glyphs = [...journey.querySelectorAll("[data-media-glyph]")];
    const steps = [...journey.querySelectorAll("[data-media-step]")];
    const backgrounds = [...journey.querySelectorAll("[data-media-background]")];
    const counter = journey.querySelector("#media-step-number");
    let target = 0;
    let current = reducedMotion ? 0 : 0;
    let activeIndex = -1;

    const updateTarget = () => {
      if (reducedMotion) return;
      const rect = journey.getBoundingClientRect();
      const travel = Math.max(1, journey.offsetHeight - window.innerHeight);
      target = Math.max(0, Math.min(1, -rect.top / travel));
    };

    const setActive = (index) => {
      if (index === activeIndex) return;
      activeIndex = index;
      glyphs.forEach((glyph, glyphIndex) => glyph.classList.toggle("is-active", glyphIndex === index));
      steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
      backgrounds.forEach((background, backgroundIndex) => background.classList.toggle("is-active", backgroundIndex === index));
      if (counter) counter.textContent = String(index + 1).padStart(2, "0");
    };

    const render = () => {
      current += (target - current) * 0.09;
      journey.style.setProperty("--media-progress", current.toFixed(4));
      journey.style.setProperty("--media-x", `${10 + current * 80}%`);
      setActive(Math.min(glyphs.length - 1, Math.floor(current * glyphs.length)));
      if (!reducedMotion) requestAnimationFrame(render);
    };

    updateTarget();
    setActive(0);
    render();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget, { passive: true });
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
      const sequences = await Promise.all(chapterConfigs.map((config) => preloadChapter(config, onItem)));
      chapterConfigs.forEach((config, index) => {
        if (sequences[index].length) setupSequence(config.chapter, sequences[index]);
        else config.chapter.classList.add("sequence-missing");
      });
    } else {
      loaded = totalFrames;
      setProgress(loaded);
      setupMobileVideos();
    }

    setupReveals();
    setupMediaJourney();
    setupSmoothScroll();
    setupContact();

    window.setTimeout(() => {
      loader?.classList.add("is-complete");
      body.classList.remove("is-loading");
    }, 350);
  }

  init();
})();
