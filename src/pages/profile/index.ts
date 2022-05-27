import { Service } from "../../service";
import { Validation } from "../../validation";

export class Profile {
  render() {
    let profilePage = document.createElement("div");
    profilePage.innerHTML = `
              <div class="main-page-container">
                <div class="header">
                    <div class="header-logo">👍 Best MVP</div>
                    <div class="header-rightpart">
                        <a class="link" href="/main">🚀 Главная</a>
                        <a class="link" href="/addpost">✅ Добавить пост</a>
                        <a class="link" href="/profile">👨‍ Мой профиль</a>
                        <a id="exit" class="link" href="/">🔴 Выход</a>
                    </div>
                </div>
                <div class="title">
                    
                    <div id="status" hidden ></div>
                </div>
                <div class="container">
                    <div class="post">
                        <div class="add-post">
                          <p>Мой профиль</p>
                          <div class="profile_info">
                            <div class="content">
                              <input placeholder="email" class="email"></input>
                              <span id="invalidEmail" hidden>email</span>
                            </div>
                            <div class="content">
                              <input placeholder="Имя" class="name"></input>
                              <span id="invalidName" hidden>name</span>
                            </div>
                            <div class="content">
                              <input placeholder="Фамилия" class="surname"></input>
                              <span id="invalidSurname" hidden>surname</span>
                            </div>
                            <div class="content">
                              <input placeholder="Логин" class="login"></input>
                              <span id="invalidLogin" hidden>login</span>
                            </div>
                            <div class="content">
                              <input placeholder="Телефон" class="phoneNum"></input>
                              <span id="invalidPhoneNum" hidden>number</span>
                            </div>
                            <div class="content">
                              <input placeholder="Пароль" class="password"></input>
                              <span id="invalidPassword" hidden>number</span>
                            </div>
                          </div>
                          <button class="save-btn">Сохранить</button>
                        </div>
                    </div>
                </div
              </div>
              <div class="footer">© 2022, Jusan Singularity</div>
  
                  `;
    return profilePage;
  }
}

export async function loadProfilePage() {
  if (!sessionStorage.getItem("Token")) {
    location.pathname = "/";
  }
  const loader = document.querySelector(".load-back-ground") as HTMLDivElement;
  const saveBtn = document.querySelector(".save-btn") as HTMLButtonElement;
  const status = document.querySelector("#status") as HTMLDivElement;
  const validation = new Validation();

  const email = document.querySelector(".email") as HTMLInputElement;
  const myName = document.querySelector(".name") as HTMLInputElement;
  const surname = document.querySelector(".surname") as HTMLInputElement;
  const login = document.querySelector(".login") as HTMLInputElement;
  const phoneNum = document.querySelector(".phoneNum") as HTMLInputElement;
  const password = document.querySelector(".password") as HTMLInputElement;

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
  const invalidPass = document.getElementById(
    "invalidPassword"
  ) as HTMLSpanElement;

  try {
    loader.hidden = false;
    const response = await Service.prototype.getUserData();
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const resJson = await response.json();
    loader.hidden = true;
    email.value = resJson.email;
    myName.value = resJson.first_name;
    surname.value = resJson.last_name;
    login.value = resJson.username;
    phoneNum.value = resJson.telephone;
    console.log(resJson);
  } catch (error) {
    location.pathname = "/";
    alert(error);
  }
  saveBtn.addEventListener("click", async () => {
    validation.checkEmail(invalidEmail, email.value);
    validation.checkLogin(invalidLogin, login.value);
    validation.checkName(invalidName, myName.value);
    validation.checkSurname(invalidSurname, surname.value);
    validation.checkPhoneNum(invalidPhoneNum, phoneNum.value);
    validation.checkPassword(invalidPass, password.value);
    if (
      validation.checkEmail(invalidEmail, email.value) &&
      validation.checkLogin(invalidLogin, login.value) &&
      validation.checkName(invalidName, myName.value) &&
      validation.checkSurname(invalidSurname, surname.value) &&
      validation.checkPhoneNum(invalidPhoneNum, phoneNum.value) &&
      validation.checkPassword(invalidPass, password.value)
    ) {
      type Info = {
        email: string;
        username: string;
        first_name: string;
        last_name: string;
        telephone: string;
        password: string;
      };
      const res = await Service.prototype.getUserData();
      const { email: emailInfo } = await res.json();
      const info = {} as Info;
      if (emailInfo === email.value) {
        info.username = login.value;
        info.first_name = myName.value;
        info.last_name = surname.value;
        info.telephone = phoneNum.value;
        info.password = password.value;
      } else {
        info.email = email.value;
        info.username = login.value;
        info.first_name = myName.value;
        info.last_name = surname.value;
        info.telephone = phoneNum.value;
        info.password = password.value;
      }
      try {
        loader.hidden = false;
        const response = await Service.prototype.updateUserData(info);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const resJson = await response.json();
        loader.hidden = true;
        console.log(resJson);
        showOkStatus();
        setTimeout(() => (location.pathname = "/profile"), 1000);
      } catch (error) {
        alert(error);
      }
      login.value = "";
      email.value = "";
      myName.value = "";
      surname.value = "";
      phoneNum.value = "";
      password.value = "";
    } else {
      showErrorStatus();
    }
  });

  function showOkStatus() {
    status.hidden = false;
    status.className = "ok-status";
    status.textContent = "Профиль успешно обновлен!";
    setTimeout(() => (status.hidden = true), 1000);
  }

  function showErrorStatus() {
    status.hidden = false;
    status.className = "error-status";
    status.textContent = "Неправильные параметры профиля!";
    setTimeout(() => (status.hidden = true), 1000);
  }

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
}
