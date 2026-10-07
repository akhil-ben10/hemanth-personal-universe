// Scroll scenes and pointer effects from the original portfolio, with lifecycle cleanup.
export function initMotion(root) {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches,
    desktop = matchMedia("(min-width: 601px)"),
    fine = matchMedia("(pointer: fine)").matches;
  const find = (s) => root.querySelector(s),
    all = (s) => [...root.querySelectorAll(s)],
    clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const hero = find(".hero"),
    heroWrap = find(".hero-scroll"),
    wisdom = find(".wisdom"),
    wisdomWrap = find(".wisdom-scroll"),
    moments = find(".moments"),
    galleryWrap = find(".gallery-scroll"),
    gallery = find(".gallery");
  const progress = find(".scroll-progress"),
    cursor = find(".motion-cursor"),
    heroTitle = find(".hero-title"),
    heroBottom = find(".hero-bottom"),
    photos = all(".hero .photo"),
    wisdomImage = wisdom.querySelector("img"),
    wisdomCopy = find(".wisdom-copy"),
    galleryBar = find(".track span"),
    galleryNumber = find(".gallery-number"),
    closing = find(".closing"),
    journey = find(".journey-banner img"),
    loadout = find(".loadout");
  const disposers = [];
  let active = true,
    frame = 0,
    cursorFrame = 0,
    metrics = {},
    px = 0,
    py = 0,
    cx = 0,
    cy = 0,
    tx = 0,
    ty = 0;
  function listen(el, type, handler, options) {
    el.addEventListener(type, handler, options);
    disposers.push(() => el.removeEventListener(type, handler, options));
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  all(".split-heading,.section-label").forEach((el) => observer.observe(el));
  if (!reduce) document.documentElement.classList.add("motion-ready");
  function measure() {
    const y = scrollY;
    metrics = {
      heroTop: heroWrap.getBoundingClientRect().top + y,
      heroRange: heroWrap.offsetHeight - hero.offsetHeight,
      wisdomTop: wisdomWrap.getBoundingClientRect().top + y,
      wisdomRange: wisdomWrap.offsetHeight - wisdom.offsetHeight,
      galleryTop: galleryWrap.getBoundingClientRect().top + y,
      galleryRange: galleryWrap.offsetHeight - moments.offsetHeight,
      galleryDistance: Math.max(0, gallery.scrollWidth - moments.clientWidth),
    };
    find(".gallery-hint").textContent = desktop.matches
      ? "Scroll to wander. Tap to step closer."
      : "Swipe to wander. Tap to step closer.";
  }
  function phase(top, range) {
    return clamp((scrollY - top) / Math.max(1, range));
  }
  const count = gallery.children.length;
  function updateGallery(p) {
    galleryBar.style.transform = `scaleX(${1 / count + p * (1 - 1 / count)})`;
    galleryNumber.textContent = `${String(Math.min(count, 1 + Math.floor(p * (count - 0.01)))).padStart(2, "0")} / ${count}`;
  }
  function render() {
    frame = 0;
    progress.style.transform = `scaleX(${clamp(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight))})`;
    if (reduce) return;
    const hp = phase(metrics.heroTop, metrics.heroRange),
      wp = phase(metrics.wisdomTop, metrics.wisdomRange),
      gp = phase(metrics.galleryTop, metrics.galleryRange),
      mobile = !desktop.matches;
    heroTitle.style.transform = `translateY(${-hp * 130}px) scale(${1 - hp * 0.14})`;
    heroTitle.style.opacity = String(1 - hp * 0.82);
    heroBottom.style.opacity = String(1 - hp * 0.7);
    photos.forEach((photo, i) => {
      const base = [-9, 4, 10][i],
        side = [-1, 0, 1][i];
      photo.style.transform = `translate3d(${side * hp * (mobile ? 45 : 130) + px * (i + 1) * 7}px,${-hp * (mobile ? 30 : 65) + py * (i + 1) * 5}px,0) rotate(${base * (1 - hp) + px * 1.5}deg) scale(${1 + hp * (mobile ? 0.16 : 0.34)})`;
    });
    wisdom.style.clipPath = `inset(${(1 - wp) * 8}% ${(1 - wp) * 7}% round ${(1 - wp) * 35}px)`;
    wisdomImage.style.transform = `scale(${1.16 - wp * 0.16})`;
    wisdomCopy.style.transform = `translateY(${(1 - wp) * 80}px)`;
    wisdomCopy.style.opacity = String(0.2 + wp * 0.8);
    if (desktop.matches) {
      gallery.style.transform = `translateX(${-gp * metrics.galleryDistance}px)`;
      updateGallery(gp);
    } else gallery.style.transform = "";
    const cr = closing.getBoundingClientRect();
    closing.style.borderRadius = `${clamp(cr.top / innerHeight) * 55}px ${clamp(cr.top / innerHeight) * 55}px 0 0`;
    const jr = journey.getBoundingClientRect();
    journey.style.transform = `scale(1.08) translateY(${clamp((jr.top - innerHeight / 2) / innerHeight, -0.5, 0.5) * 35}px)`;
    loadout.style.setProperty("--glow-x", `${50 + px * 20}%`);
    loadout.style.setProperty("--glow-y", `${50 + py * 20}%`);
  }
  function schedule() {
    if (active && !frame) frame = requestAnimationFrame(render);
  }
  listen(window, "scroll", schedule, { passive: true });
  listen(window, "resize", () => {
    measure();
    schedule();
  });
  listen(window, "load", () => {
    measure();
    schedule();
  });
  document.fonts.ready.then(() => {
    if (active) {
      measure();
      schedule();
    }
  });
  listen(
    gallery,
    "scroll",
    () => {
      if (!desktop.matches)
        updateGallery(
          clamp(
            gallery.scrollLeft /
              Math.max(1, gallery.scrollWidth - gallery.clientWidth),
          ),
        );
    },
    { passive: true },
  );
  if (fine && !reduce) {
    function animateCursor() {
      cursorFrame = 0;
      if (!active || document.hidden) return;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5)
        cursorFrame = requestAnimationFrame(animateCursor);
    }
    listen(document, "pointermove", (e) => {
      px = (e.clientX / innerWidth - 0.5) * 2;
      py = (e.clientY / innerHeight - 0.5) * 2;
      tx = e.clientX;
      ty = e.clientY;
      cursor.classList.add("active");
      if (!cursorFrame) cursorFrame = requestAnimationFrame(animateCursor);
      schedule();
    });
    listen(document, "pointerout", (e) => {
      if (!e.relatedTarget) cursor.classList.remove("active");
    });
    all("[data-image],[data-project],model-viewer").forEach((el) => {
      listen(el, "pointerenter", () => {
        cursor.classList.add("large");
        cursor.textContent = el.matches("model-viewer")
          ? "DRAG"
          : el.hasAttribute("data-project")
            ? "EXPLORE"
            : "VIEW";
      });
      listen(el, "pointerleave", () => {
        cursor.classList.remove("large");
        cursor.textContent = "";
      });
    });
    all(".project-cover").forEach((cover) => {
      listen(cover.parentElement, "pointermove", (e) => {
        const r = cover.getBoundingClientRect(),
          x = clamp((e.clientX - r.left) / r.width) - 0.5,
          y = clamp((e.clientY - r.top) / r.height) - 0.5;
        cover.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 9}deg) translateY(-6px)`;
      });
      listen(
        cover.parentElement,
        "pointerleave",
        () => (cover.style.transform = ""),
      );
    });
    all(".round-link,.closing-bottom a").forEach((link) => {
      listen(link, "pointermove", (e) => {
        const r = link.getBoundingClientRect();
        link.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
      });
      listen(link, "pointerleave", () => (link.style.transform = ""));
    });
  }
  measure();
  schedule();
  return () => {
    active = false;
    observer.disconnect();
    cancelAnimationFrame(frame);
    cancelAnimationFrame(cursorFrame);
    disposers.forEach((f) => f());
    document.documentElement.classList.remove("motion-ready");
  };
}
