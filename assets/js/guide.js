// Edition chrome for the user guide (immersive#1211).
//
// 1. Language switcher: the theme swaps only the content frame when moving
//    between pages, so the switcher links rendered with the first page go
//    stale. Each click maps the page being read to the chosen edition by
//    swapping the locale prefix (the editions mirror each other, immersive#612)
//    and stores the choice for head_end.html's browser-language redirect.
// 2. Labels the theme renders from site-wide config (the outline title and
//    the search button) are set from the page's edition.
(function () {
  var config = window.guideEdition || {};
  var base = config.baseurl || "";
  var labels = config.labels || {};
  var locales = ["ca", "es", "fr", "it", "pt"];

  function pageSuffix() {
    var path = window.location.pathname;
    if (base && path.indexOf(base) === 0) path = path.slice(base.length);
    var match = path.match(/^\/([a-z]{2})(\/.*)?$/);
    if (match && locales.indexOf(match[1]) !== -1) return match[2] || "/";
    return path || "/";
  }

  function editionUrl(code) {
    var suffix = pageSuffix();
    return base + (code === "en" ? "" : "/" + code) + suffix;
  }

  function refreshSwitcher() {
    document.querySelectorAll("[data-guide-lang]").forEach(function (link) {
      link.setAttribute("href", editionUrl(link.getAttribute("data-guide-lang")));
    });
  }

  function localizeChrome() {
    var outline = document.getElementById("doc-outline-aria-label");
    if (outline && labels.outline) outline.textContent = labels.outline;
    // The theme copies the outline title into the phone bar before this runs.
    var localOutline = document.querySelector("#vp-local-outline-button .menu-text");
    if (localOutline && labels.outline && localOutline.textContent.trim() === "On this page") {
      localOutline.textContent = labels.outline;
    }
    var searchText = document.querySelector("#vp-search-button .text");
    if (searchText && labels.search) searchText.textContent = labels.search;
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("[data-guide-lang]");
    if (!link) return;
    var code = link.getAttribute("data-guide-lang");
    try { localStorage.setItem("guide-lang", code); } catch (e) {}
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      link.setAttribute("href", editionUrl(code));
      return;
    }
    event.preventDefault();
    window.location.href = editionUrl(code);
  });

  // Close the navbar language menu on an outside click.
  document.addEventListener("click", function (event) {
    document.querySelectorAll(".guide-lang__menu[open]").forEach(function (menu) {
      if (!menu.contains(event.target)) menu.removeAttribute("open");
    });
  });

  function refresh() {
    refreshSwitcher();
    localizeChrome();
  }

  document.addEventListener("turbo:frame-load", refresh);
  document.addEventListener("turbo:load", refresh);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refresh);
  } else {
    refresh();
  }
})();
