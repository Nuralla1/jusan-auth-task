export class Error500 {
  render() {
    let erorr500 = document.createElement("div");
    erorr500.innerHTML = `
    <div class="main-containerErr">
        <div class="form-containerErr">
            <h2 class="error">500</h2>
            <p class="text">Ошибка сервера, пытаемся исправить</p>
            <a class="linkBack" href="/">Назад</a>
        </div>
    </div>
      `;
    return erorr500;
  }
}
