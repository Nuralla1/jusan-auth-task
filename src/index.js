import { Login, LogicForLoginPage } from "./pages/login/index.js";
import { Error404 } from "./pages/404/index.js";
import { Error500 } from "./pages/500/index.js";
import { Registration, LogicForRegPage } from "./pages/registration/index.js";
import { LogicForMainPage, MainPage } from "./pages/main/index.js";
import { AddPost, LogicForAddPostPage } from "./pages/addPost/index.js";
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
    let match = {
      route: routes[0],
      isMatch: true,
    };
  }
  let matchedView = match.route.view;

  document
    .querySelector("#app")
    .appendChild(await matchedView.prototype.render());

  if (location.pathname === "/") {
    LogicForLoginPage();
  }
  if (location.pathname === "/registration") {
    LogicForRegPage();
  }
  if (location.pathname === "/addpost") {
    LogicForAddPostPage();
  }
  if (location.pathname === "/main") {
    LogicForMainPage();
  }
};

window.addEventListener("load", function () {
  router();
});
