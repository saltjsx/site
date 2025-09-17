(function () {
  var toggleBtn = document.querySelector(".navbar__toggle");
  var menuWrapper = document.getElementById("navbar-menu");
  if (!toggleBtn || !menuWrapper) return;

  // Helper to check if toggle button is visible (mobile only)
  function isToggleVisible() {
    return window.getComputedStyle(toggleBtn).display !== "none";
  }

  function setOpen(open) {
    if (!isToggleVisible()) {
      // Desktop: always show menu, never overlay, never is-open
      menuWrapper.classList.remove("is-open");
      menuWrapper.setAttribute("aria-hidden", "false");
      document.body.classList.remove("navbar-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      // Remove any leftover event listeners
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
      return;
    }
    // Mobile: toggle menu
    toggleBtn.setAttribute("aria-expanded", String(open));
    menuWrapper.classList.toggle("is-open", open);
    menuWrapper.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("navbar-open", open);
  }

  function onToggle(e) {
    // Only run toggle logic if toggle is visible (mobile)
    if (!isToggleVisible()) return;
    e.stopPropagation();
    var open = toggleBtn.getAttribute("aria-expanded") !== "true";
    setOpen(open);
    if (open) {
      document.addEventListener("click", onDocClick);
      document.addEventListener("keydown", onKey);
    } else {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    }
  }

  function onDocClick(e) {
    var t = e.target;
    if (!(t instanceof Node)) return;
    if (!menuWrapper.contains(t) && t !== toggleBtn) {
      setOpen(false);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    }
  }

  function onKey(e) {
    if (e.key === "Escape") {
      setOpen(false);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    }
  }

  // Always attach toggle handler (it will no-op on desktop)
  toggleBtn.addEventListener("click", onToggle);

  // On load and resize, enforce correct menu state for desktop/mobile
  function enforceMenuState() {
    // Always fully reset desktop state
    setOpen(false);
    if (!isToggleVisible()) {
      menuWrapper.classList.remove("is-open");
      menuWrapper.setAttribute("aria-hidden", "false");
      document.body.classList.remove("navbar-open");
      toggleBtn.setAttribute("aria-expanded", "false");
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    }
  }
  window.addEventListener("resize", enforceMenuState);
  // Also run on initial load
  enforceMenuState();
})();
