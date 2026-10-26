(() => {
  "use strict";
  const C = window.SITE_CONFIG, D = window.I18N;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lang = "en";
  try { const s = localStorage.getItem("dbs-lang"); if (s === "ta" || s === "en") lang = s; } catch (e) {}
  const t = k => (D[lang] && D[lang][k]) || D.en[k] || k;

  /* ---------- language ---------- */
  function wrapWords() {
    ["#bq1", "#bq2"].forEach(s => { const el = $(s); if (!el) return;
      el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(" "); });
    updateBand();
  }
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
    $$("[data-i18n-html]").forEach(el => el.innerHTML = t(el.dataset.i18nHtml));
    $$("[data-i18n-alt]").forEach(el => { el.alt = t(el.dataset.i18nAlt) + (el.dataset.n ? " " + el.dataset.n : ""); });
    $$("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
    $$("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$("[data-i18n-title]").forEach(el => el.title = t(el.dataset.i18nTitle));
    $$(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.title = t("meta.title");
    const md = $('meta[name="description"]'); if (md) md.content = t("meta.desc");
    $$(".err").forEach(e => e.hidden = true); $$(".field.bad").forEach(f => f.classList.remove("bad"));
    $("#status").textContent = "";
    wrapWords(); updateLightboxText();
  }
  $$(".lang button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang; try { localStorage.setItem("dbs-lang", lang); } catch (e) {} applyLang();
  }));

  /* ---------- links ---------- */
  $$("[data-ig]").forEach(a => a.href = C.instagram[a.dataset.ig]);
  $$("a[aria-label='Facebook']").forEach(a => { if (C.facebook) a.href = C.facebook; });
  ["#dir-link", "#loc-link"].forEach(s => { const a = $(s); if (a) a.href = C.directionsUrl; });
  $("#year").textContent = new Date().getFullYear();
  const waUrl = text => `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(text)}`;
  $$("[data-wa]").forEach(a => a.href = waUrl(t("wa.quick")));
  document.addEventListener("click", e => { const a = e.target.closest("[data-wa]"); if (a) a.href = waUrl(t("wa.quick")); });

  /* ---------- loader, progress, header ---------- */
  const loader = $(".loader");
  const hideLoader = () => loader && loader.classList.add("done");
  if (document.readyState === "complete") setTimeout(hideLoader, 500); else window.addEventListener("load", () => setTimeout(hideLoader, 700));
  const bar = $("#progress"), header = $(".site-header");
  function onScroll() {
    const h = document.documentElement, max = h.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    header.classList.toggle("scrolled", scrollY > 20);
    h.style.setProperty("--nav-top", Math.max(header.getBoundingClientRect().bottom, 0) + "px");
    updateBand();
  }
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);

  /* ---------- mobile nav ---------- */
  const menu = $(".menu-btn"), nav = $("#nav");
  const closeNav = () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => menu.setAttribute("aria-expanded", String(nav.classList.toggle("open"))));
  $$("a", nav).forEach(a => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeNav(); });

  /* ---------- hero: sparkles, slideshow, orbs, parallax ---------- */
  const sp = $("#sparkles");
  for (let i = 0; i < 22; i++) { const s = document.createElement("i"); s.className = "sp";
    s.style.cssText = `left:${Math.random() * 100}%;top:${20 + Math.random() * 75}%;--s:${4 + Math.random() * 7}px;--d:${4 + Math.random() * 5}s;--dl:${Math.random() * 6}s`; sp.appendChild(s); }
  const slides = $$(".slide"), dots = $$(".dot"); let cur = 0, timer = null; const DUR = 4800;
  $(".dots").style.setProperty("--dur", DUR + "ms");
  function go(n) { cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("on", i === cur));
    dots.forEach((d, i) => { d.classList.remove("on"); void d.offsetWidth; d.classList.toggle("on", i === cur); }); }
  function play() { clearInterval(timer); if (!reduce) timer = setInterval(() => go(cur + 1), DUR); }
  dots.forEach(d => d.addEventListener("click", () => { go(+d.dataset.slide); play(); }));
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : play());
  play();
  $$(".orb").forEach((o, k) => { const im = $$("img", o); if (reduce) return;
    setInterval(() => { const i = im.findIndex(x => x.classList.contains("on")); im[i].classList.remove("on"); im[(i + 1) % im.length].classList.add("on"); }, 5200 + k * 900); });
  const hero = $(".hero"), stage = $("#stage");
  if (matchMedia("(hover:hover)").matches && !reduce) {
    hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect();
      stage.style.setProperty("--mx", ((e.clientX - r.left) / r.width - .5) * 2); stage.style.setProperty("--my", ((e.clientY - r.top) / r.height - .5) * 2); });
    hero.addEventListener("pointerleave", () => { stage.style.setProperty("--mx", 0); stage.style.setProperty("--my", 0); });
  }

  /* ---------- scroll reveal ---------- */
  $$('[data-rv="stagger"]').forEach(p => [...p.children].forEach((c, i) => c.style.setProperty("--i", i)));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  $$("[data-rv]").forEach(el => io.observe(el));

  /* ---------- service panels ---------- */
  const panels = $$(".panel");
  function openPanel(p) { panels.forEach(x => { const on = x === p; x.classList.toggle("is-on", on); $(".panel-tab", x).setAttribute("aria-expanded", String(on)); }); }
  panels.forEach(p => { $(".panel-tab", p).addEventListener("click", () => openPanel(p));
    p.addEventListener("pointerenter", e => { if (e.pointerType === "mouse" && innerWidth >= 900) openPanel(p); }); });

  /* ---------- gallery filter + lightbox ---------- */
  const items = $$(".g-item");
  $$(".chip").forEach(c => c.addEventListener("click", () => {
    $$(".chip").forEach(x => { const on = x === c; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", String(on)); });
    items.forEach(i => { const hide = c.dataset.filter !== "all" && i.dataset.cat !== c.dataset.filter; i.hidden = hide; i.classList.remove("pop"); if (!hide) { void i.offsetWidth; i.classList.add("pop"); } });
  }));
  const lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap"); let list = [], idx = 0, opener = null;
  function updateLightboxText() { if (!list.length) return; const b = list[idx];
    lbImg.alt = `${t(b.dataset.altKey)} ${b.dataset.n}`; lbCap.textContent = `${t(b.dataset.catLabel)} · ${idx + 1} ${t("lb.of")} ${list.length}`; }
  const show = () => { lbImg.src = list[idx].dataset.full; updateLightboxText(); };
  const step = d => { idx = (idx + d + list.length) % list.length; show(); };
  $$(".g-btn").forEach(b => b.addEventListener("click", () => { list = $$(".g-item:not([hidden]) .g-btn"); idx = list.indexOf(b); opener = b; show(); lb.showModal(); $(".lb-close").focus(); }));
  lb.addEventListener("click", e => { const a = e.target.closest("[data-lb]"); if (a) { a.dataset.lb === "close" ? lb.close() : step(a.dataset.lb === "next" ? 1 : -1); } else if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", e => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });
  lb.addEventListener("close", () => { lbImg.removeAttribute("src"); if (opener) opener.focus(); });
  let sx = 0; lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); });

  /* ---------- before / after slider ---------- */
  const ba = $("#ba");
  if (ba) {
    const range = $(".ba-range", ba);
    if (range) {
      range.addEventListener("input", () => ba.style.setProperty("--pos", range.value + "%"));
    }
  }

  /* ---------- reels carousel ---------- */
  const rTrack = $("#reelsTrack"), rPrev = $("#reelsPrev"), rNext = $("#reelsNext");
  if (rTrack && rPrev && rNext) {
    rPrev.addEventListener("click", () => rTrack.scrollBy({ left: -320, behavior: "smooth" }));
    rNext.addEventListener("click", () => rTrack.scrollBy({ left: 320, behavior: "smooth" }));
  }

  /* ---------- floating polaroid reviews gallery & modal ---------- */
  const reviewModal = $("#reviewModal");
  let activeRevId = 1;
  let prevActiveElement = null;

  const reviewMap = {
    1: {
      captionKey: "rev.1.caption",
      metaKey: "rev.1.meta",
      altShotKey: "rev.alt.1",
      shot: "assets/images/review-1.webp",
      look: "assets/images/hair-purple-lg.webp",
      lookAltKey: "alt.hair"
    },
    2: {
      captionKey: "rev.2.caption",
      metaKey: "rev.2.meta",
      altShotKey: "rev.alt.2",
      shot: "assets/images/review-2.webp",
      look: "assets/images/hair-floral-back-lg.webp",
      lookAltKey: "alt.hair"
    },
    3: {
      captionKey: "rev.3.caption",
      metaKey: "rev.3.meta",
      altShotKey: "rev.alt.3",
      shot: "assets/images/review-3.webp",
      look: "assets/images/artist-at-work-lg.webp",
      lookAltKey: "alt.artist"
    }
  };

  function openReview(id) {
    const item = reviewMap[id];
    if (!item || !reviewModal) return;
    activeRevId = id;

    const rmTitle = $("#rmTitle"), rmSub = $("#rmSub"), rmShot = $("#rmShot"), rmLook = $("#rmLook");
    if (rmTitle) {
      rmTitle.dataset.i18n = item.captionKey;
      rmTitle.textContent = t(item.captionKey);
    }
    if (rmSub) {
      rmSub.dataset.i18n = item.metaKey;
      rmSub.textContent = t(item.metaKey);
    }
    if (rmShot) {
      rmShot.src = item.shot;
      rmShot.dataset.i18nAlt = item.altShotKey;
      rmShot.alt = t(item.altShotKey);
    }
    if (rmLook) {
      rmLook.src = item.look;
      rmLook.dataset.i18nAlt = item.lookAltKey;
      rmLook.alt = t(item.lookAltKey);
    }

    prevActiveElement = document.activeElement;
    if (typeof reviewModal.showModal === "function") {
      try { reviewModal.showModal(); } catch (e) { reviewModal.setAttribute("open", ""); }
    } else {
      reviewModal.setAttribute("open", "");
    }
    document.body.style.overflow = "hidden";
    const closeBtn = $(".rm-close", reviewModal);
    if (closeBtn) closeBtn.focus();
  }

  function closeReview() {
    if (!reviewModal) return;
    if (typeof reviewModal.close === "function") {
      try { reviewModal.close(); } catch (e) { reviewModal.removeAttribute("open"); }
    } else {
      reviewModal.removeAttribute("open");
    }
    document.body.style.overflow = "";
    if (prevActiveElement && typeof prevActiveElement.focus === "function") {
      prevActiveElement.focus();
    }
  }

  $$(".polaroid-card").forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    const id = card.dataset.revId;
    card.addEventListener("click", () => openReview(id));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openReview(id);
      }
    });
  });

  if (reviewModal) {
    reviewModal.addEventListener("click", e => {
      if (e.target.matches('[data-rm="close"]') || e.target.closest('[data-rm="close"]')) {
        closeReview();
      }
    });
    reviewModal.addEventListener("cancel", e => {
      e.preventDefault();
      closeReview();
    });
    window.addEventListener("keydown", e => {
      if (e.key === "Escape" && reviewModal.hasAttribute("open")) {
        closeReview();
      }
    });
  }

  /* ---------- quote band: words light up on scroll ---------- */
  const band = $("#band");
  function updateBand() { if (!band) return; const ws = $$(".w", band); if (!ws.length) return;
    const r = band.getBoundingClientRect(), p = reduce ? 1 : Math.max(0, Math.min(1, (innerHeight * .92 - r.top) / (r.height * .9 + innerHeight * .1)));
    const n = Math.ceil(ws.length * p); ws.forEach((w, i) => w.classList.toggle("lit", i < n)); }

  /* ---------- enquiry wizard ---------- */
  const form = $("#enquiry"), status = $("#status"), dateEl = $("#f-date"); let stepN = 1;
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  dateEl.min = iso(new Date());
  const checked = () => $$('input[name="svc"]:checked').map(i => i.value);
  function flag(input, bad) { const f = input.closest(".field"), err = $("#" + input.getAttribute("aria-describedby")); f.classList.toggle("bad", bad); if (err) err.hidden = !bad; input.setAttribute("aria-invalid", String(bad)); return bad; }
  function validate(n) {
    if (n === 1) { const bad = checked().length === 0; $("#e-service").hidden = !bad; return !bad; }
    if (n === 2) return !flag(dateEl, dateEl.value !== "" && dateEl.value < dateEl.min);
    const name = $("#f-name"), phone = $("#f-phone"), digits = phone.value.replace(/[\s\-+()]/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    const b1 = flag(name, name.value.trim().length < 2), b2 = flag(phone, phone.value.trim() !== "" && !/^[6-9]\d{9}$/.test(digits));
    if (b1 || b2) { (b1 ? name : phone).focus(); } return !(b1 || b2);
  }
  function showStep(n) { stepN = n;
    $$(".step", form).forEach(s => s.classList.toggle("on", +s.dataset.step === n));
    $$(".wiz-steps li", form).forEach(li => { const k = +li.dataset.s; li.classList.toggle("on", k === n); li.classList.toggle("done", k < n); });
    $("#wbar").style.transform = `scaleX(${n / 3})`;
    $("#w-back").hidden = n === 1; $("#w-next").hidden = n === 3; $("#w-send").hidden = n !== 3; status.textContent = "";
    const first = $(".step.on input:not([type=checkbox]), .step.on textarea", form); if (n > 1 && first && !reduce) setTimeout(() => first.focus({ preventScroll: true }), 350); }
  $("#w-next").addEventListener("click", () => { if (validate(stepN)) showStep(stepN + 1); });
  $("#w-back").addEventListener("click", () => showStep(stepN - 1));
  $$('input[name="svc"]').forEach(i => i.addEventListener("change", () => { if (checked().length) $("#e-service").hidden = true; }));
  $$("[data-add]").forEach(b => b.addEventListener("click", () => {
    const box = $(`input[name="svc"][value="${b.dataset.add}"]`); box.checked = true; showStep(1); $("#e-service").hidden = true;
    const s = $("span", b); s.dataset.i18n = "svc.added"; s.textContent = t("svc.added"); b.closest(".panel").classList.add("added");
  }));
  form.addEventListener("submit", e => {
    e.preventDefault(); status.className = "status"; status.textContent = "";
    if (stepN < 3) { if (validate(stepN)) showStep(stepN + 1); return; }
    if (!validate(1)) return showStep(1); if (!validate(2)) return showStep(2); if (!validate(3)) return;
    const names = checked().map(v => v === "unsure" ? t("f.notsure") : t(`svc.${v}.name`)).join(", ");
    const L = [`${t("wa.hello")} ${names}.`, "", `${t("wa.name")}: ${$("#f-name").value.trim()}`];
    if ($("#f-phone").value.trim()) L.push(`${t("wa.phone")}: ${$("#f-phone").value.trim()}`);
    if (dateEl.value) { const [y, m, d] = dateEl.value.split("-"); L.push(`${t("wa.date")}: ${d}/${m}/${y}`); }
    if ($("#f-loc").value.trim()) L.push(`${t("wa.location")}: ${$("#f-loc").value.trim()}`);
    if ($("#f-msg").value.trim()) L.push(`${t("wa.message")}: ${$("#f-msg").value.trim()}`);
    const url = waUrl(L.join("\n")), w = window.open(url, "_blank", "noopener");
    if (w) status.textContent = t("st.ok"); else { status.className = "status warn"; status.innerHTML = `${t("st.fail")} <a href="${url}" target="_blank" rel="noopener noreferrer">${t("st.link")}</a>`; }
  });
  ["#f-name", "#f-phone", "#f-date"].forEach(s => $(s).addEventListener("input", () => { if ($(s).closest(".field").classList.contains("bad")) validate(stepN); }));

  applyLang(); onScroll();
})();
