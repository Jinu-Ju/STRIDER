(() => {
  "use strict";
  const config = window.STRIDER_CONFIG || {};
  const byId = (id) => document.getElementById(id);
  const text = (id, value) => { if (value) byId(id).textContent = value; };

  // Accept normal website URLs and relative assets, never executable schemes.
  function safeUrl(value, allowMail = false) {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value, window.location.href);
      const protocols = allowMail ? ["https:", "http:", "mailto:"] : ["https:", "http:"];
      if (protocols.includes(url.protocol)) return value;
      if (location.protocol === "file:" && url.protocol === "file:") return value;
    } catch (_) { /* Invalid configuration values remain hidden. */ }
    return "";
  }
  function optionalLink(id, value, allowMail = false) {
    const link = byId(id);
    const url = safeUrl(value, allowMail);
    link.hidden = !url;
    if (url) link.href = url;
  }

  text("hero-heading", config.headline);
  text("paper-subtitle", config.subtitle);
  if (config.headline) {
    document.title = `${config.projectName || "STRIDER"} — ${config.headline}`;
    document.querySelector('meta[property="og:title"]').content = document.title;
  }
  const siteUrl = safeUrl(config.siteUrl);
  if (siteUrl) {
    document.querySelector('link[rel="canonical"]').href = siteUrl;
    document.querySelector('meta[property="og:url"]').content = siteUrl;
    document.querySelector('meta[property="og:image"]').content = new URL("assets/images/flight.webp", siteUrl).href;
  }
  const links = config.links || {};
  const codeUrl = safeUrl(links.codeUrl);
  if (codeUrl) document.querySelectorAll("[data-code-link]").forEach((link) => { link.href = codeUrl; });
  optionalLink("documentation-link", links.documentationUrl);
  optionalLink("contact-link", links.contactUrl, true);
  optionalLink("lab-link", links.labUrl);
  const authors = Array.isArray(config.authors) ? config.authors : [];
  byId("authors").replaceChildren();
  for (const author of authors) {
    if (!author.name) continue;
    const url = safeUrl(author.url);
    const item = document.createElement(url ? "a" : "span");
    item.textContent = author.name;
    if (url) { item.href = url; item.target = "_blank"; item.rel = "noopener"; }
    const marker = [author.affiliation, author.equalContribution ? "*" : "", author.corresponding ? "†" : ""].filter(Boolean).join("");
    if (marker) {
      const sup = document.createElement("sup");
      sup.textContent = marker;
      item.append(sup);
    }
    byId("authors").append(item);
  }
  byId("authors").hidden = !byId("authors").children.length;
  byId("affiliations").replaceChildren();
  for (const affiliation of config.affiliations || []) {
    const item = document.createElement("span");
    if (typeof affiliation === "string") {
      item.textContent = affiliation;
    } else {
      const sup = document.createElement("sup");
      sup.textContent = affiliation.id;
      item.append(sup, document.createTextNode(affiliation.name));
    }
    byId("affiliations").append(item);
  }
  byId("affiliations").hidden = !byId("affiliations").children.length;
  text("author-notes", config.authorNotes);
  byId("author-notes").hidden = !config.authorNotes;

  const publication = config.publication || {};
  text("publication-venue", [publication.venue, publication.year].filter(Boolean).join(" · "));
  const paperUrl = safeUrl(publication.paperUrl) || safeUrl(publication.doiUrl);
  if (paperUrl) {
    document.querySelectorAll("[data-paper-link]").forEach((link) => {
      link.href = paperUrl;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", "Read the paper");
    });
    document.querySelectorAll("[data-paper-note]").forEach((note) => { note.hidden = true; });
  }
  if (publication.bibtex) {
    byId("bibtex-code").textContent = publication.bibtex.trim();
  }
  byId("copy-citation").addEventListener("click", async () => {
    byId("copy-status").hidden = false;
    try {
      await navigator.clipboard.writeText(byId("bibtex-code").textContent.trim());
      text("copy-status", "BibTeX copied.");
    } catch (_) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(byId("bibtex-code"));
      selection.removeAllRanges();
      selection.addRange(range);
      text("copy-status", "BibTeX selected. Press Ctrl+C or Command+C to copy.");
    }
  });
  const release = config.release || {};
  text("release-note", release.status === "available" ? release.availableText : release.preparationText);

  const hero = config.hero || {};
  const heroImage = safeUrl(hero.image);
  const image = byId("hero-image");
  const video = byId("hero-video");
  if (heroImage) image.src = heroImage;
  if (video) {
    const heroVideoSrc = safeUrl(hero.videoSrc);
    if (heroVideoSrc && video.getAttribute("src") !== heroVideoSrc) {
      video.src = heroVideoSrc;
    }
    const fallback = () => { video.hidden = true; image.hidden = false; };
    video.addEventListener("error", fallback);
    if (video.error) fallback();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.autoplay = false;
      video.pause();
    } else if (!video.hidden) {
      video.play().catch(() => { /* Native controls allow manual playback. */ });
    }
  }

  // A full URL is accepted so the owner can paste a YouTube share link.
  function youtubeId(input) {
    if (typeof input !== "string") return "";
    const value = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase().replace(/^www\./, "");
      let id = "";
      if (host === "youtu.be") id = url.pathname.split("/")[1];
      else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
        id = url.searchParams.get("v") || (/^\/(embed|shorts|live)\//.test(url.pathname) ? url.pathname.split("/")[2] : "");
      }
      return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : "";
    } catch (_) { return ""; }
  }
  const videoConfig = config.video || {};
  const videoId = youtubeId(videoConfig.youtubeId);
  const mp4Src = safeUrl(videoConfig.src);
  const isYoutube = videoConfig.provider === "youtube" && videoId;
  const isMp4 = videoConfig.provider === "mp4" && mp4Src;
  const videoFrame = byId("video-frame");
  const poster = safeUrl(videoConfig.poster);
  if (poster) videoFrame.querySelector("img").src = poster;
  let localVideo;
  function playVideo(start = 0) {
    if (isYoutube) {
      const iframe = document.createElement("iframe");
      const src = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
      src.searchParams.set("autoplay", "1");
      src.searchParams.set("playsinline", "1");
      src.searchParams.set("start", String(Math.floor(start)));
      iframe.src = src.href;
      iframe.title = "STRIDER supplementary experiment video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      videoFrame.replaceChildren(iframe);
    } else if (isMp4) {
      if (!localVideo) {
        localVideo = document.createElement("video");
        localVideo.controls = true;
        localVideo.playsInline = true;
        localVideo.preload = "metadata";
        if (poster) localVideo.poster = poster;
        localVideo.setAttribute("aria-label", "STRIDER supplementary experiment video");
        const source = document.createElement("source");
        source.src = mp4Src;
        source.type = videoConfig.mimeType || "video/mp4";
        localVideo.append(source);
        localVideo.addEventListener("error", () => text("video-status", "The video could not be loaded. Try the direct video link below."));
        source.addEventListener("error", () => text("video-status", "The video could not be loaded. Try the direct video link below."));
        videoFrame.replaceChildren(localVideo);
      }
      const seek = () => {
        const target = Number.isFinite(localVideo.duration) ? Math.min(start, Math.max(0, localVideo.duration - .1)) : start;
        localVideo.currentTime = target;
      };
      if (localVideo.readyState >= 1) seek(); else localVideo.addEventListener("loadedmetadata", seek, { once: true });
      localVideo.play().catch(() => text("video-status", "Use the player controls to start playback."));
    }
    byId("chapter-buttons").querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.start) === start));
    });
  }
  if (isYoutube || isMp4) {
    byId("video-placeholder").remove();
    videoFrame.querySelector("img").alt = "Preview of STRIDER's experiment video.";
    const play = document.createElement("button");
    play.type = "button";
    play.className = "video-play";
    play.setAttribute("aria-label", "Play the STRIDER experiment video");
    play.innerHTML = '<span class="play-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 3v18l16-9z"/></svg></span><span>Watch the experiment video</span>';
    play.addEventListener("click", () => playVideo(0));
    videoFrame.append(play);
    text("video-status", "Watch the supplementary experiment video.");
    optionalLink("external-video-link", isYoutube ? `https://www.youtube.com/watch?v=${videoId}` : mp4Src);
    byId("external-video-link").textContent = isYoutube ? "Watch on YouTube" : "Open video directly";
    for (const chapter of videoConfig.chapters || []) {
      if (typeof chapter.start !== "number" || !Number.isFinite(chapter.start) || chapter.start < 0) continue;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = chapter.label;
      button.dataset.start = String(Math.floor(chapter.start));
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => {
        playVideo(Math.floor(chapter.start));
        text("video-status", `Playing: ${chapter.label}.`);
      });
      byId("chapter-buttons").append(button);
    }
    byId("chapter-buttons").hidden = !byId("chapter-buttons").children.length;
  }

  // Roving tabindex supports arrow-key navigation in both sets of tabs.
  function bindTabKeys(tablist, select) {
    tablist.addEventListener("keydown", (event) => {
      const tabs = [...tablist.querySelectorAll('[role="tab"]')];
      const index = tabs.indexOf(document.activeElement);
      if (index < 0) return;
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      select(tabs[next]);
    });
  }
  function updateTabs(tablist, selected) {
    tablist.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab === selected));
      tab.tabIndex = tab === selected ? 0 : -1;
    });
  }
  const gallery = config.gallery || {};
  const galleryTabs = document.querySelector(".gallery-tabs");
  const simulationVideo = byId("simulation-video");
  const simulationImageButton = byId("image-zoom");
  let sceneVisible = false;
  function syncSimulationPlayback() {
    if (!simulationVideo.hidden && sceneVisible) {
      simulationVideo.play().catch(() => {});
    } else {
      simulationVideo.pause();
    }
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      sceneVisible = entry.isIntersecting;
      syncSimulationPlayback();
    }, { threshold: 0.2 }).observe(byId("gallery-panel"));
  } else {
    sceneVisible = true;
  }
  simulationVideo.addEventListener("error", () => {
    simulationVideo.hidden = true;
    simulationImageButton.hidden = false;
  });
  function selectGallery(tab) {
    const item = gallery[tab.dataset.gallery];
    if (!item || !safeUrl(item.src)) return;
    updateTabs(galleryTabs, tab);
    byId("simulation-image").src = item.src;
    byId("simulation-image").alt = item.alt;
    const videoSrc = safeUrl(item.videoSrc);
    simulationVideo.hidden = !videoSrc;
    simulationImageButton.hidden = Boolean(videoSrc);
    if (videoSrc) {
      simulationVideo.poster = item.src;
      if (simulationVideo.getAttribute("src") !== item.videoSrc) {
        simulationVideo.src = item.videoSrc;
      }
    }
    syncSimulationPlayback();
    text("simulation-caption", item.caption);
    byId("gallery-panel").setAttribute("aria-labelledby", tab.id);
    byId("image-zoom").setAttribute("aria-label", `Enlarge the ${tab.textContent} screenshot`);
  }
  galleryTabs.querySelectorAll("button").forEach((tab) => tab.addEventListener("click", () => selectGallery(tab)));
  bindTabKeys(galleryTabs, selectGallery);
  selectGallery(byId("gallery-tab-scene"));
  const dialog = byId("image-dialog");
  byId("image-zoom").addEventListener("click", () => {
    const img = byId("simulation-image");
    byId("dialog-image").src = img.src;
    byId("dialog-image").alt = img.alt;
    text("dialog-caption", byId("simulation-caption").textContent);
    dialog.showModal();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  const controllerTabs = byId("controller-tabs");
  const controllers = Array.isArray(config.controllers) ? config.controllers : [];
  const controllerPanel = byId("controller-panel");
  const controllerMedia = byId("controller-media");
  const controllerVideo = byId("controller-video");
  const controllerVideoStatus = byId("controller-video-status");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let controllerVisible = !("IntersectionObserver" in window);
  function syncControllerPlayback() {
    if (controllerMedia.hidden || !controllerVisible || document.hidden) {
      controllerVideo.pause();
    } else if (!reducedMotion.matches) {
      controllerVideo.play().catch(() => {});
    }
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      controllerVisible = entry.isIntersecting;
      syncControllerPlayback();
    }, { threshold: 0.2 }).observe(controllerVideo);
  }
  document.addEventListener("visibilitychange", syncControllerPlayback);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) controllerVideo.pause();
    else syncControllerPlayback();
  });
  controllerVideo.addEventListener("error", () => {
    controllerVideoStatus.hidden = false;
  });
  function selectController(tab) {
    const controller = controllers[Number(tab.dataset.index)];
    if (!controller) return;
    updateTabs(controllerTabs, tab);
    byId("reference-note").hidden = controller.id !== "reference";
    controllerPanel.setAttribute("aria-labelledby", tab.id);
    const videoSrc = safeUrl(controller.videoSrc);
    controllerPanel.classList.toggle("has-controller-video", Boolean(videoSrc));
    controllerMedia.hidden = !videoSrc;
    controllerVideo.setAttribute("aria-label", `${controller.name} simulation video`);
    if (videoSrc && controllerVideo.getAttribute("src") !== videoSrc) {
      controllerVideo.pause();
      controllerVideoStatus.hidden = true;
      controllerVideo.src = videoSrc;
      controllerVideo.load();
    } else if (!videoSrc) {
      controllerVideo.pause();
      controllerVideo.removeAttribute("src");
      controllerVideo.load();
    }
    syncControllerPlayback();
    text("controller-kicker", controller.kicker);
    text("controller-name", controller.name);
    text("controller-description", controller.description);
    byId("controller-properties").replaceChildren();
    for (const [label, value] of controller.properties) {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value;
      row.append(dt, dd);
      byId("controller-properties").append(row);
    }
  }
  controllers.forEach((controller, index) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.id = `controller-tab-${index}`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "controller-panel");
    tab.dataset.index = String(index);
    tab.textContent = controller.name;
    tab.addEventListener("click", () => selectController(tab));
    controllerTabs.append(tab);
  });
  bindTabKeys(controllerTabs, selectController);
  const defaultIndex = Math.max(0, controllers.findIndex((controller) => controller.id === "proposed"));
  if (controllerTabs.children.length) selectController(controllerTabs.children[defaultIndex]);
  text("reference-note", config.referenceNote);
})();
