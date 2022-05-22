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
          <div class="pagination">PAGINATION</div>


                
            

              `;
    return mainPage;
  }
}

export async function LogicForMainPage() {
  const exit = document.getElementById("exit");

  const response = await Service.prototype.createGetRequestAddPost(
    "http://10.130.19.30/api/items/?skip=0&limit=100"
  );

  for (let elem of response.reverse()) {
    const container = document.querySelector(".container");
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

  exit.addEventListener("click", () => {
    sessionStorage.clear();
    location.pathname = "/";
  });
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
