import { Service } from "../../service/index";
import { Validation } from "../../validation";

export class Login {
  render() {
    let login = document.createElement("div");
    login.innerHTML = `
    <div class="main-container">
      <form class="form-container">
        <h2 class="form-header">Логин</h2>
        <div class="content">
          <input id="loginLog" type="text" placeholder="Логин" />
          <span id="invalidLoginLog" hidden></span>
        </div>
        <div class="content">
          <input id="passwordLog" type="password" placeholder="Пароль" />
          <span id="invalidPassLog" hidden></span>
        </div>
        <button class="signInBtn" type="submit">Войти</button>
      <a class="linkReg" href="/registration">Нет аккаунта? Регистрация</a>
      </form>
    </div>
      `;
    return login;
  }
}

export function loadLoginPage() {
  if (sessionStorage.getItem("Token")) {
    location.pathname = "/main";
  }
  const loader = document.querySelector(".load-back-ground") as HTMLDivElement;
  const signInBtn = document.querySelector(".signInBtn") as HTMLButtonElement;
  const validation = new Validation();

  const loginLog = document.getElementById("loginLog") as HTMLInputElement;
  const passwordLog = document.getElementById(
    "passwordLog"
  ) as HTMLInputElement;
  const invalidLoginLog = document.getElementById(
    "invalidLoginLog"
  ) as HTMLInputElement;
  const invalidPassLog = document.getElementById(
    "invalidPassLog"
  ) as HTMLInputElement;

  signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    validation.checkLogin(invalidLoginLog, loginLog.value);
    validation.checkPassword(invalidPassLog, passwordLog.value);
    if (
      validation.checkLogin(invalidLoginLog, loginLog.value) &&
      validation.checkPassword(invalidPassLog, passwordLog.value)
    ) {
      loader.hidden = false;
      interface Info {
        username: string;
        password: string;
      }
      const info = {} as Info;
      info.username = loginLog.value;
      info.password = passwordLog.value;
      const res = await Service.prototype.signInUser(
        "http://10.130.19.30/api/login/access-token",
        info
      );
      if (sessionStorage.length) {
        location.pathname = "/main";
      } else {
        alert(res);
      }
    }
    loader.hidden = true;
    loginLog.value = "";
    passwordLog.value = "";
  });

  loginLog.addEventListener("blur", () => {
    validation.checkLogin(invalidLoginLog, loginLog.value);
  });
  loginLog.addEventListener("focus", () => {
    validation.checkLogin(invalidLoginLog, loginLog.value);
  });

  passwordLog.addEventListener("blur", () => {
    validation.checkPassword(invalidPassLog, passwordLog.value);
  });
  passwordLog.addEventListener("focus", () => {
    validation.checkPassword(invalidPassLog, passwordLog.value);
  });
}
