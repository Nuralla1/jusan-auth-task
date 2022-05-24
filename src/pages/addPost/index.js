import { Service } from "../../service";

export class AddPost {
  render() {
    let addPostPage = document.createElement("div");
    addPostPage.innerHTML = `
            <div class="main-page-container">
              <div class="header">
                  <div class="header-logo">👍 Best MVP</div>
                  <div class="header-rightpart">
                      <a class="link" href="/main">🚀 Главная</a>
                      <a class="link" href="/addpost">✅ Добавить пост</a>
                      <a id="exit" class="link" href="/">🔴 Выход</a>
                  </div>
              </div>
              <div class="title">
                  
                  <div class="error-status" hidden>Ошибка! Пост не может быть пустым</div>
              </div>
              <div class="container">
                  <div class="post">
                      <div class="add-post">
                        <p>Добавить пост</p>
                        <textarea class="add-post__text" maxlength="200"></textarea>
                        <span class="length-counter">0/200</span>
                        <button class="add-post-btn">Добавить</button>
                      </div>
                  </div>
              </div
            </div>
            <div class="footer">© 2022, Jusan Singularity</div>

                `;
    return addPostPage;
  }
}

export function loadAddPostPage() {
  if (!sessionStorage.length) {
    location.pathname = "/";
  }
  const exit = document.getElementById("exit");
  const input = document.querySelector(".add-post__text");
  const error = document.querySelector(".error-status");
  const addPostBtn = document.querySelector(".add-post-btn");
  const counter = document.querySelector(".length-counter");

  addPostBtn.addEventListener("click", async () => {
    if (input.value === "") {
      error.hidden = false;
      setTimeout(() => (error.hidden = true), 1500);
    } else {
      const obj = {
        title: "string",
        description: input.value,
      };
      input.value = "";
      counter.innerHTML = `${input.value.length}/200`;
      const response = await Service.prototype.createItem(
        "http://10.130.19.30/api/items/",
        obj
      );
      if (response.description != "undefined") {
        location.pathname = "/main";
        document.querySelector(".ok-status").hidden = false;
      } else {
        alert(response);
      }
    }
  });

  input.oninput = () => {
    counter.innerHTML = `${input.value.length}/200`;
  };

  exit.addEventListener("click", () => {
    sessionStorage.clear();
    location.pathname = "/";
  });
}
