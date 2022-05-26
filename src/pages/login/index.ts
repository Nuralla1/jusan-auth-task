import { Service } from "../../service/index";

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
  if (sessionStorage.length) {
    location.pathname = "/main";
  }
  const loader = document.querySelector(".load-back-ground") as HTMLDivElement;
  const signInBtn = document.querySelector(".signInBtn") as HTMLButtonElement;

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
    checkLogin(invalidLoginLog, loginLog.value);
    checkPassword(invalidPassLog, passwordLog.value);
    if (
      checkLogin(invalidLoginLog, loginLog.value) &&
      checkPassword(invalidPassLog, passwordLog.value)
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
    checkLogin(invalidLoginLog, loginLog.value);
  });
  loginLog.addEventListener("focus", () => {
    checkLogin(invalidLoginLog, loginLog.value);
  });

  passwordLog.addEventListener("blur", () => {
    checkPassword(invalidPassLog, passwordLog.value);
  });
  passwordLog.addEventListener("focus", () => {
    checkPassword(invalidPassLog, passwordLog.value);
  });

  function showRecommendation(
    span: HTMLElement,
    recommendMsg: string,
    hiddenResult: boolean
  ) {
    span.textContent = recommendMsg;
    span.hidden = hiddenResult;
    return hiddenResult;
  }

  function checkLogin(span: HTMLElement, value: string) {
    const loginRegx = /(?!^\d+$)^[-\w]{3,15}$/i;

    if (!loginRegx.test(value)) {
      if (value.length < 3) {
        const msg = "Логин не должен быть короче 3 символов.";
        return showRecommendation(span, msg, false);
      }
      if (value.length > 15) {
        const msg = "Логин не должен быть длиннее 15 символов.";
        return showRecommendation(span, msg, false);
      }
      if (/^\d+$/.test(value)) {
        const msg = "Логин не должен состоять только из цифр.";
        return showRecommendation(span, msg, false);
      }
      for (let c of value) {
        if (/[а-я]/i.test(c)) {
          const msg = "Логин  должен состоять из латинских букв.";
          return showRecommendation(span, msg, false);
        }
        if (/[!@#$%^&*)(+=.<>?\\/]/.test(c) || /\s/.test(c)) {
          const msg =
            "Логин не должен содержать пробелов и спецсимволов, кроме нижнего подчеркивания и дефиса.";
          return showRecommendation(span, msg, false);
        }
      }
    } else {
      return showRecommendation(span, "", true);
    }
  }

  function checkPassword(span: HTMLElement, value: string) {
    const passwordRegx = /^(?=.*?[0-9])(?=.*?[!@#$%^&*)(+?=._<>\\/]).{8,30}$/i;

    if (!passwordRegx.test(value)) {
      if (value.length < 8) {
        const msg = "Пароль не должен быть короче 8 символов.";
        return showRecommendation(span, msg, false);
      }
      if (value.length > 30) {
        const msg = "Пароль не должен быть длиннее 30 символов.";
        return showRecommendation(span, msg, false);
      }
      if (true) {
        const msg = "Пароль  должен содержать хотябы один спецсимвол и цифру.";
        return showRecommendation(span, msg, false);
      }
    } else {
      return showRecommendation(span, "", true);
    }
  }
}
