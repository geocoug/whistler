// Tiny vanilla lightbox. Any element with [data-lightbox] opens it;
// the element can also carry data-lightbox-src (image url) or data-lightbox-embed (iframe src).
// If neither, the element's innerHTML is cloned (useful for cam embeds).

const overlay = document.getElementById("lightbox");
const content = overlay?.querySelector<HTMLElement>(".lightbox-content");
const closeBtn = overlay?.querySelector<HTMLButtonElement>(".lightbox-close");

function open(html: string) {
  if (!overlay || !content) return;
  content.innerHTML = html;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function close() {
  if (!overlay || !content) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  content.innerHTML = "";
  document.body.style.overflow = "";
}

closeBtn?.addEventListener("click", close);
overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) close();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") close();
});

document.addEventListener("click", (e) => {
  const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-lightbox]");
  if (!target) return;
  e.preventDefault();
  const label = target.dataset.lightboxTitle ?? "";
  const src = target.dataset.lightboxSrc;
  const embed = target.dataset.lightboxEmbed;
  let inner = "";
  if (src) {
    inner = `<img src="${src}" alt="${label}" style="width:100%;height:auto;border-radius:1rem;border:1px solid var(--border);" />`;
  } else if (embed) {
    inner = `<div class="surface-strong overflow-hidden" style="aspect-ratio: 16 / 9;"><iframe src="${embed}" style="width:100%;height:100%;border:0;" allow="autoplay; fullscreen" referrerpolicy="origin"></iframe></div>`;
  } else {
    inner = target.innerHTML;
  }
  open(
    `${label ? `<div class="mb-3 font-display text-lg">${label}</div>` : ""}${inner}`
  );
});
