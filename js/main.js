const order = ["music", "blog", "visual", "code", "professional", "worlds"];
const $ = (q) => document.querySelector(q);
let selected = null;
const tooltip = $("#tooltip"),
  art = $("#artLayer");
function activate(id) {
  if (!sections[id]) return;
  selected = id;
  const s = sections[id];
  $("#discover").style.setProperty("--panel-color", s.color);
  $("#panelKicker").textContent = s.kicker;
  $("#panelCounter").textContent =
    String(order.indexOf(id) + 1).padStart(2, "0") + " / 0" + order.length;
  $("#panelTitle").textContent = s.name;
  $("#panelDesc").textContent = s.short;
  $("#panelAction").innerHTML =
    'Descubrir este mundo <span aria-hidden="true">↗</span>';
  document
    .querySelectorAll(".brain-zone")
    .forEach((el) => el.classList.toggle("is-active", el.dataset.zone === id));
  document
    .querySelectorAll(".world")
    .forEach((el) =>
      el.classList.toggle("is-selected", el.dataset.zone === id),
    );
}
function showTip(el) {
  const box = el.querySelector(".zone-dot").getBoundingClientRect();
  const parent = art.getBoundingClientRect();
  tooltip.textContent = sections[el.dataset.zone].name;
  tooltip.style.left = box.left + box.width / 2 - parent.left + "px";
  tooltip.style.top = box.top - parent.top - 24 + "px";
  tooltip.classList.add("show");
}
document.querySelectorAll(".brain-zone").forEach((el) => {
  el.addEventListener("mouseenter", () => showTip(el));
  el.addEventListener("mouseleave", () => tooltip.classList.remove("show"));
  el.addEventListener("focus", () => showTip(el));
  el.addEventListener("blur", () => tooltip.classList.remove("show"));
  el.addEventListener("click", () => {
    tooltip.classList.remove("show");
    detail(el.dataset.zone);
  });
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      tooltip.classList.remove("show");
      detail(el.dataset.zone);
    }
  });
});
const details = $("#details");
function detail(id) {
  const s = sections[id];
  if (!s) return;
  activate(id);
  $("#dialogIcon").textContent = s.icon;
  $("#dialogIcon").style.color = s.color;
  $("#dialogKicker").textContent = s.kicker;
  $("#dialogTitle").textContent = s.name;
  $("#dialogDesc").textContent = s.long;
  const actions = $("#dialogActions");
  actions.replaceChildren(
    ...s.links.map(({ label, url }) => {
      const a = document.createElement("a");
      a.className = "dialog-btn";
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = label + " ↗";
      return a;
    }),
  );
  $("#dialogNote").textContent = s.links.length
    ? "Enlaces externos"
    : "Próximamente: estoy preparando esta sección.";
  details.showModal();
}
$("#panelAction").addEventListener("click", () => {
  if (selected) {
    detail(selected);
  } else {
    $("#universos").scrollIntoView({ behavior: "smooth" });
  }
});
$("#exploreBtn").addEventListener("click", () =>
  $("#universos").scrollIntoView({ behavior: "smooth" }),
);
document
  .querySelectorAll(".world")
  .forEach((el) => el.addEventListener("click", () => detail(el.dataset.zone)));
$("#closeDialog").addEventListener("click", () => details.close());
$("#dialogButton").addEventListener("click", () => details.close());
details.addEventListener("click", (e) => {
  if (e.target === details) details.close();
});
$("#year").textContent = new Date().getFullYear();
