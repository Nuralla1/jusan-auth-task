export function loader() {
  const app = document.querySelector("#app");
  const loadBackGround = document.createElement("div");
  loadBackGround.classList.add("load-back-ground");
  loadBackGround.innerHTML = `<div class="spiner"></div>`;
  app.appendChild(loadBackGround);
  setTimeout(() => {
    loadBackGround.remove();
  }, 500);
}
