/* ============================================================
   MAIN — header scroll, mobile menu, language, scroll reveal
   ============================================================ */
(function () {
  // Language init
  let lang = "pt";
  try { lang = localStorage.getItem("dl_lang") || "pt"; } catch (e) {}
  if (window.applyLang) window.applyLang(lang);

  document.querySelectorAll(".lang button").forEach((b) => {
    b.addEventListener("click", () => window.applyLang(b.dataset.lang));
  });

  // Header scroll state
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const burger = document.querySelector(".burger");
  const sheet = document.querySelector(".sheet");
  const toggleMenu = (open) => {
    const willOpen = open ?? !sheet.classList.contains("open");
    sheet.classList.toggle("open", willOpen);
    burger.classList.toggle("open", willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu());
  sheet.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

  // Inline YouTube — click to play without leaving the site
  const vid = document.getElementById("instVideo");
  if (vid) {
    vid.addEventListener("click", () => {
      if (vid.classList.contains("playing")) return;
      const id = vid.dataset.yt;
      const iframe = document.createElement("iframe");
      iframe.className = "yt-embed";
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
      iframe.title = "Dalton Lab — Vídeo institucional";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      vid.classList.add("playing");
      vid.appendChild(iframe);
    });
  }

  // Generic carousel helper
  function initCarousel(track, arrowSelector) {
    if (!track) return;
    const arrows = [...document.querySelectorAll(arrowSelector)];
    const step = () => {
      const card = track.firstElementChild;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16") || 16;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.85;
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      arrows.forEach((a) => {
        const atEnd = +a.dataset.dir > 0 ? track.scrollLeft >= max : track.scrollLeft <= 2;
        a.toggleAttribute("disabled", atEnd);
      });
    };
    arrows.forEach((a) =>
      a.addEventListener("click", () => {
        track.scrollBy({ left: step() * (+a.dataset.dir), behavior: "smooth" });
      })
    );
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  initCarousel(document.getElementById("solTrack"), ".sol-controls .sol-arrow");
  initCarousel(document.querySelector(".ins-grid"), ".ins-controls .ins-arrow");
  initCarousel(document.querySelector(".case-cards"), ".cases-controls .cases-arrow");

  // Drag-to-scroll for carousels (mouse/trackpad). Touch keeps native momentum + snap.
  function makeDraggable(track) {
    if (!track) return;
    let down = false, startX = 0, startScroll = 0, moved = false, pid = null;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return; // let touch use native scroll
      down = true; moved = false;
      startX = e.clientX; startScroll = track.scrollLeft; pid = e.pointerId;
    });
    track.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      // Only enter drag mode after a real movement — otherwise a plain click must
      // pass straight through to the card link.
      if (!moved && Math.abs(dx) > 8) {
        moved = true;
        track.classList.add("dragging");
        try { track.setPointerCapture(pid); } catch (_) {}
      }
      if (moved) track.scrollLeft = startScroll - dx;
    });
    const end = () => {
      if (!down) return;
      down = false;
      track.classList.remove("dragging"); // re-enables scroll-snap → settles to nearest card
      try { if (pid != null) track.releasePointerCapture(pid); } catch (_) {}
      pid = null;
    };
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    // Swallow the click that follows a real drag so cards don't navigate mid-swipe
    track.addEventListener("click", (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
    track.addEventListener("dragstart", (e) => e.preventDefault());
  }
  makeDraggable(document.getElementById("solTrack"));
  makeDraggable(document.querySelector(".ins-grid"));
  makeDraggable(document.querySelector(".case-cards"));

  // Scroll reveal — robust against sections taller than the viewport.
  const revealEls = [...document.querySelectorAll(".reveal")];
  const reveal = (el) => el.classList.add("in");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          reveal(en.target);
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -5% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  // Fallbacks: reveal anything already in view on load, and force-reveal
  // everything after a timeout so no section can ever stay invisible.
  const revealInView = () => {
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
    });
  };
  window.addEventListener("load", revealInView);
  revealInView();
  setTimeout(() => revealEls.forEach(reveal), 3500);
})();
