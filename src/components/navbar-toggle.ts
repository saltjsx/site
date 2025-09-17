const toggleBtn = document.querySelector<HTMLButtonElement>('.navbar__toggle');
const menuWrapper = document.getElementById('navbar-menu') as HTMLDivElement | null;

if (toggleBtn && menuWrapper) {
  const setOpen = (open: boolean) => {
    toggleBtn.setAttribute('aria-expanded', String(open));
    menuWrapper.classList.toggle('is-open', open);
    menuWrapper.setAttribute('aria-hidden', String(!open));
  };

  const onToggle = (e: MouseEvent) => {
    e.stopPropagation();
    const open = toggleBtn.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
    if (open) {
      document.addEventListener('click', onDocClick);
      document.addEventListener('keydown', onKey);
    } else {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    }
  };

  const onDocClick = (e: MouseEvent) => {
    const t = e.target as EventTarget | null;
    if (t instanceof Node && !menuWrapper.contains(t) && t !== toggleBtn) {
      setOpen(false);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    }
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    }
  };

  toggleBtn.addEventListener('click', onToggle);
}
