import { Service } from "../../service/index";
import { Validation } from "../../validation";

export class Registration {
  render() {
    let registration = document.createElement("div");
    registration.innerHTML = `
        <div class="main-container">
            <form class="form-container">
            <h2 class="form-header">Регистрация</h2>
              <div class="content">
              <input id="email" type="text" placeholder="email" />
              <span id="invalidEmail" hidden></span>
              </div>
              <div class="content">
              <input id="login" type="text" placeholder="Логин" />
              <span id="invalidLogin" hidden></span>
              </div>
              <div class="content">
              <input id="name" type="text" placeholder="Имя" />
              <span id="invalidName" hidden></span>
              </div>
              <div class="content">
                  <input id="surname" type="text" placeholder="Фамилия" />
                  <span id="invalidSurname" hidden></span>
                </div>
                <div class="content">
                  <input id="phoneNum" type="text" placeholder="Телефон" />
                  <span id="invalidPhoneNum" hidden></span>
                </div>
                <div class="content">
                  <input id="password" type="password" placeholder="Пароль" />
                  <span id="invalidPass" hidden></span>
                </div>
                <div class="content">
                  <input
                    id="retryPassword"
                    type="password"
                    placeholder="Повторите пароль"
                  />
                  <span id="passNotMatch" hidden></span>
                </div>
                <button class="regBtn" type="submit">Регистрация</button>
            </form>
        </div>
            `;
    return registration;
  }
}

export function loadRegPage() {
  if (sessionStorage.length) {
    location.pathname = "/main";
  }
  const validation = new Validation();
  const loader = document.querySelector(".load-back-ground") as HTMLDivElement;
  const regBtn = document.querySelector(".regBtn") as HTMLButtonElement;

  const email = document.getElementById("email") as HTMLInputElement;
  const login = document.getElementById("login") as HTMLInputElement;
  const myName = document.getElementById("name") as HTMLInputElement;
  const surname = document.getElementById("surname") as HTMLInputElement;
  const phoneNum = document.getElementById("phoneNum") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;
  const repeatPassword = document.getElementById(
    "retryPassword"
  ) as HTMLInputElement;

  const invalidEmail = document.getElementById(
    "invalidEmail"
  ) as HTMLSpanElement;
  const invalidLogin = document.getElementById(
    "invalidLogin"
  ) as HTMLSpanElement;
  const invalidName = document.getElementById("invalidName") as HTMLSpanElement;
  const invalidSurname = document.getElementById(
    "invalidSurname"
  ) as HTMLSpanElement;
  const invalidPhoneNum = document.getElementById(
    "invalidPhoneNum"
  ) as HTMLSpanElement;
  const invalidPass = document.getElementById("invalidPass") as HTMLSpanElement;
  const passNotMatch = document.getElementById(
    "passNotMatch"
  ) as HTMLSpanElement;

  regBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    validation.checkEmail(invalidEmail, email.value);
    validation.checkLogin(invalidLogin, login.value);
    validation.checkName(invalidName, myName.value);
    validation.checkSurname(invalidSurname, surname.value);
    validation.checkPhoneNum(invalidPhoneNum, phoneNum.value);
    validation.checkPassword(invalidPass, password.value);
    validation.checkPasswordMatch(passNotMatch, repeatPassword.value, password);
    if (
      validation.checkEmail(invalidEmail, email.value) &&
      validation.checkLogin(invalidLogin, login.value) &&
      validation.checkName(invalidName, myName.value) &&
      validation.checkSurname(invalidSurname, surname.value) &&
      validation.checkPhoneNum(invalidPhoneNum, phoneNum.value) &&
      validation.checkPassword(invalidPass, password.value) &&
      validation.checkPasswordMatch(
        passNotMatch,
        repeatPassword.value,
        password
      )
    ) {
      loader.hidden = false;
      interface Info {
        email: string;
        username: string;
        first_name: string;
        last_name: string;
        telephone: string;
        password: string;
      }
      const info = {} as Info;
      info.email = email.value;
      info.username = login.value;
      info.first_name = myName.value;
      info.last_name = surname.value;
      info.telephone = phoneNum.value;
      info.password = password.value;
      const response = await Service.prototype.registrateUser(
        "http://10.130.19.30/api/register/",
        info
      );
      loader.hidden = true;
      if (response.email) {
        location.pathname = "/";
      } else {
        alert(response);
      }
    }
    loader.hidden = true;
    login.value = "";
    email.value = "";
    myName.value = "";
    surname.value = "";
    phoneNum.value = "";
    password.value = "";
    repeatPassword.value = "";
  });
  email.addEventListener("blur", () => {
    validation.checkEmail(invalidEmail, email.value);
  });
  email.addEventListener("focus", () => {
    validation.checkEmail(invalidEmail, email.value);
  });

  login.addEventListener("blur", () => {
    validation.checkLogin(invalidLogin, login.value);
  });
  login.addEventListener("focus", () => {
    validation.checkLogin(invalidLogin, login.value);
  });

  myName.addEventListener("blur", () => {
    validation.checkName(invalidName, myName.value);
  });
  myName.addEventListener("focus", () => {
    validation.checkName(invalidName, myName.value);
  });

  surname.addEventListener("blur", () => {
    validation.checkSurname(invalidSurname, surname.value);
  });
  surname.addEventListener("focus", () => {
    validation.checkSurname(invalidSurname, surname.value);
  });

  phoneNum.addEventListener("blur", () => {
    validation.checkPhoneNum(invalidPhoneNum, phoneNum.value);
  });
  phoneNum.addEventListener("focus", () => {
    validation.checkPhoneNum(invalidPhoneNum, phoneNum.value);
  });

  password.addEventListener("blur", () => {
    validation.checkPassword(invalidPass, password.value);
  });
  password.addEventListener("focus", () => {
    validation.checkPassword(invalidPass, password.value);
  });

  repeatPassword.addEventListener("blur", () => {
    validation.checkPasswordMatch(passNotMatch, repeatPassword.value, password);
  });
  repeatPassword.addEventListener("focus", () => {
    validation.checkPasswordMatch(passNotMatch, repeatPassword.value, password);
  });
}
