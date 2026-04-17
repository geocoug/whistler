const STORAGE_KEY = "whistler-theme";

function currentTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme: "light" | "dark") {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  syncIcons(theme);
}

function syncIcons(theme: "light" | "dark") {
  const dark = document.querySelectorAll<HTMLElement>(".theme-icon-dark");
  const light = document.querySelectorAll<HTMLElement>(".theme-icon-light");
  dark.forEach((el) => el.classList.toggle("hidden", theme === "light"));
  light.forEach((el) => el.classList.toggle("hidden", theme !== "light"));
}

const btn = document.getElementById("theme-toggle");
btn?.addEventListener("click", () => {
  const next = currentTheme() === "light" ? "dark" : "light";
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
});

// Initial icon sync (theme was already applied pre-paint in Base.astro).
syncIcons(currentTheme());
