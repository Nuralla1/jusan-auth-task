export class Error404 {
  render() {
    let erorr404 = document.createElement("div");
    erorr404.innerHTML = `
      <div class="main-containerErr">
        <div class="form-containerErr">
          <h2 class="error">404</h2>
          <p class="text">Страница не найдена</p>
          <a class="linkBack href="/" >Назад</a>
        </div>
      </div>
      `;
    return erorr404;
  }
}
