(function () {
  var toggleBtn = document.querySelector(".navbar__toggle");
  var menuWrapper = document.getElementById("navbar-menu");
  if (!toggleBtn || !menuWrapper) return;

  function setOpen(open) {
    toggleBtn.setAttribute("aria-expanded", String(open));
    menuWrapper.classList.toggle("is-open", open);
    menuWrapper.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("navbar-open", open);
  }

  function onToggle(e) {
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

  toggleBtn.addEventListener("click", onToggle);
})();
