import { Service } from "../../service/index.js";

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

export function LogicForLoginPage() {
  const signInBtn = document.querySelector(".signInBtn");
  const loginLog = document.getElementById("loginLog");
  const passwordLog = document.getElementById("passwordLog");
  const invalidLoginLog = document.getElementById("invalidLoginLog");
  const invalidPassLog = document.getElementById("invalidPassLog");

  signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    checkLogin(invalidLoginLog, loginLog.value);
    checkPassword(invalidPassLog, passwordLog.value);
    if (
      checkLogin(invalidLoginLog, loginLog.value) &&
      checkPassword(invalidPassLog, passwordLog.value)
    ) {
      const info = {};
      info.username = loginLog.value;
      info.password = passwordLog.value;
      const response = await Service.prototype.createPostRequestLog(
        "http://10.130.19.30/api/login/access-token",
        info
      );
      sessionStorage.setItem("Token", response.access_token);
      if (sessionStorage.getItem("Token")) {
        location.pathname = "/main";
      } else {
        location.pathname = "/";
      }
    }
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

  function showRecommendation(span, recommendMsg, hiddenResult) {
    span.textContent = recommendMsg;
    span.hidden = hiddenResult;
    return hiddenResult;
  }

  function checkLogin(span, value) {
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
        if (/[!@#\$%\^\&*\)\(+=.<>?\\\/]/.test(c) || /\s/.test(c)) {
          const msg =
            "Логин не должен содержать пробелов и спецсимволов, кроме нижнего подчеркивания и дефиса.";
          return showRecommendation(span, msg, false);
        }
      }
    } else {
      return showRecommendation(span, "", true);
    }
  }

  function checkPassword(span, value) {
    const passwordRegx =
      /^(?=.*?[0-9])(?=.*?[!@#\$%\^\&*\)\(+?=._<>\\\/]).{8,30}$/i;

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
