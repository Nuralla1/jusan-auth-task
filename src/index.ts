import { Login, loadLoginPage } from "./pages/login/index";
import { Error404 } from "./pages/404/index";
import { Error500 } from "./pages/500/index";
import { Registration, loadRegPage } from "./pages/registration/index";
import { loadMainPage, MainPage } from "./pages/main/index";
import { AddPost, loadAddPostPage } from "./pages/addPost/index";
import { Profile, loadProfilePage } from "./pages/profile";

type Route = {
  path: string;
  view: any;
};

const routes: Route[] = [
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
  {
    path: "/profile",
    view: Profile,
  },
];

const router = async () => {
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
    .querySelector("#app")!
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
  if (location.pathname === "/profile") {
    loadProfilePage();
  }
};

window.addEventListener("load", function () {
  router();
});
