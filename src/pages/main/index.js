import { Service } from "../../service";

export class MainPage {
  render() {
    let mainPage = document.createElement("div");
    mainPage.innerHTML = `
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
                Лента постов
                <div class="ok-status" hidden>Пост успешно добавлен!</div>
            </div>
            <div class="container">
            </div
          </div>
          <div class="footer">
            <div class="pagination">
            <button class="previous-btn">Previous</button>
            <input class="number-of-page"></input>
            <button class="next-btn">Next</button>
            </div>
          </div>
              `;
    return mainPage;
  }
}

export async function loadMainPage() {
  if (!sessionStorage.length) {
    location.pathname = "/";
  }
  const container = document.querySelector(".container");
  const exit = document.getElementById("exit");
  const prev = document.querySelector(".previous-btn");
  const next = document.querySelector(".next-btn");
  const pageInput = document.querySelector(".number-of-page");

  const LIMIT = 3;
  let skip = 0;
  let page = 1;

  let response = await Service.prototype.getItems(skip, LIMIT);
  renderPosts(response);
  pageInput.value = page;
  prev.disabled = true;

  let data = await Service.prototype.getItems(0, 1000);
  const possibleNumOfPages = Math.ceil(data.length / LIMIT);

  next.addEventListener("click", async () => {
    document.querySelector(".load-back-ground").hidden = false;
    page += 1;
    pageInput.value = page;
    skip += LIMIT;
    container.innerHTML = "";
    let response = await Service.prototype.getItems(skip, LIMIT);
    if (page !== possibleNumOfPages) {
      renderPosts(response);
      prev.disabled = false;
      document.querySelector(".load-back-ground").hidden = true;
    } else {
      renderPosts(response);
      next.disabled = true;
      document.querySelector(".load-back-ground").hidden = true;
    }
  });

  prev.addEventListener("click", async () => {
    document.querySelector(".load-back-ground").hidden = false;
    next.disabled = false;
    page -= 1;
    pageInput.value = page;
    skip -= LIMIT;
    container.innerHTML = "";
    let response = await Service.prototype.getItems(skip, LIMIT);
    if (page === 1) {
      renderPosts(response);
      prev.disabled = true;
      document.querySelector(".load-back-ground").hidden = true;
    } else {
      renderPosts(response);
      document.querySelector(".load-back-ground").hidden = true;
    }
  });

  exit.addEventListener("click", () => {
    sessionStorage.clear();
    location.pathname = "/";
  });

  function renderPosts(array) {
    for (let elem of array) {
      const post = document.createElement("div");
      const postInfo = document.createElement("div");
      const postAuthor = document.createElement("div");
      const postDate = document.createElement("div");
      const postContent = document.createElement("div");
      container.classList.add("container");
      postInfo.classList.add("post-info");
      postAuthor.classList.add("post-author");
      post.classList.add("post");
      postDate.classList.add("post-date");
      postContent.classList.add("post-content");
      postAuthor.textContent = elem.owner_name;
      postDate.textContent = "22.05.2022";
      postContent.textContent = elem.description;
      post.appendChild(postInfo);
      postInfo.appendChild(postAuthor);
      postInfo.appendChild(postDate);
      post.appendChild(postContent);
      container.appendChild(post);
    }
  }
}

// ETO RABOCHAYA STRUKTURA HTML MOEI MAIN PAGE
//                 <div class="post">
//                     <div class="post-info">
//                         <div class="post-author">@ALI</div>
//                         <div class="post-date">10.03.2022</div>
//                     </div>
//                     <div class="post-content">
//                     “Don’t walk in front of me… I may not follow
//                     Don’t walk behind me… I may not lead
//                     Walk beside me… just be my friend”
//                     </div>
//                 </div>
