const progress = document.querySelector(".progress");
function update() {
  const d = document.documentElement;
  progress.style.width =
    (d.scrollTop / (d.scrollHeight - d.clientHeight || 1)) * 100 + "%";
}
addEventListener("scroll", update, { passive: true });
update();
const observer = new IntersectionObserver(
  (items) =>
    items.forEach((i) => {
      if (i.isIntersecting) {
        i.target.classList.add("in");
        observer.unobserve(i.target);
      }
    }),
  { threshold: 0.09 },
);
document
  .querySelectorAll("[data-reveal]")
  .forEach((el) => observer.observe(el));
document.querySelectorAll(".value-trigger").forEach((button) =>
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".value-trigger").forEach((b) => {
      b.setAttribute("aria-expanded", "false");
      document.getElementById(
        b.getAttribute("aria-controls"),
      ).style.gridTemplateRows = "0fr";
    });
    if (!expanded) {
      button.setAttribute("aria-expanded", "true");
      document.getElementById(
        button.getAttribute("aria-controls"),
      ).style.gridTemplateRows = "1fr";
    }
  }),
);
const menu = document.querySelector(".menu-toggle"),
  mobile = document.querySelector(".mobile-nav");
menu.addEventListener("click", () => {
  const open = mobile.classList.toggle("open");
  menu.setAttribute("aria-expanded", open ? "true" : "false");
});
mobile.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobile.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
