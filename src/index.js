import { Login, loadLoginPage } from "./pages/login/index.js";
import { Error404 } from "./pages/404/index.js";
import { Error500 } from "./pages/500/index.js";
import { Registration, loadRegPage } from "./pages/registration/index.js";
import { loadMainPage, MainPage } from "./pages/main/index.js";
import { AddPost, loadAddPostPage } from "./pages/addPost/index.js";
import { loader } from "./pages/loading/index.js";

const routes = [
  {
    path: "/404",
    view: Error404,
  },
  {
    path: "/",
    view: Login,
  },
  {
    path: "/500",
    view: Error500,
  },
  {
    path: "/registration",
    view: Registration,
  },
  {
    path: "/main",
    view: MainPage,
  },
  {
    path: "/addpost",
    view: AddPost,
  },
];

const router = async () => {
  loader();
  let isMatch = routes.map((route) => {
    return {
      route: route,
      isMatch: route.path === location.pathname,
    };
  });
  let match = isMatch.find((route) => route.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  let matchedView = match.route.view;

  document
    .querySelector("#app")
    .appendChild(await matchedView.prototype.render());

  if (location.pathname === "/") {
    loadLoginPage();
  }
  if (location.pathname === "/registration") {
    loadRegPage();
  }
  if (location.pathname === "/addpost") {
    loadAddPostPage();
  }
  if (location.pathname === "/main") {
    loadMainPage();
  }
};

window.addEventListener("load", function () {
  router();
});
