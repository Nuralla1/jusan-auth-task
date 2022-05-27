import { Service } from "../../service";

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
  const loader = document.querySelector(".load-back-ground") as HTMLDivElement;
  const saveBtn = document.querySelector(".save-btn") as HTMLButtonElement;
  const status = document.querySelector("#status") as HTMLDivElement;

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
    alert(error);
  }
  saveBtn.addEventListener("click", async () => {
    checkEmail(email.value);
    checkLogin(invalidLogin, login.value);
    checkName(myName.value);
    checkSurname(surname.value);
    checkPhoneNum(phoneNum.value);
    checkPassword(invalidPass, password.value);
    if (
      checkEmail(email.value) &&
      checkLogin(invalidLogin, login.value) &&
      checkName(myName.value) &&
      checkSurname(surname.value) &&
      checkPhoneNum(phoneNum.value) &&
      checkPassword(invalidPass, password.value)
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
    checkEmail(email.value);
  });
  email.addEventListener("focus", () => {
    checkEmail(email.value);
  });

  login.addEventListener("blur", () => {
    checkLogin(invalidLogin, login.value);
  });
  login.addEventListener("focus", () => {
    checkLogin(invalidLogin, login.value);
  });

  myName.addEventListener("blur", () => {
    checkName(myName.value);
  });
  myName.addEventListener("focus", () => {
    checkName(myName.value);
  });

  surname.addEventListener("blur", () => {
    checkSurname(surname.value);
  });
  surname.addEventListener("focus", () => {
    checkSurname(surname.value);
  });

  phoneNum.addEventListener("blur", () => {
    checkPhoneNum(phoneNum.value);
  });
  phoneNum.addEventListener("focus", () => {
    checkPhoneNum(phoneNum.value);
  });

  password.addEventListener("blur", () => {
    checkPassword(invalidPass, password.value);
  });
  password.addEventListener("focus", () => {
    checkPassword(invalidPass, password.value);
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

  function checkEmail(value: string) {
    const emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegx.test(value)) {
      const msg = "Email нейдействителен.";
      return showRecommendation(invalidEmail, msg, false);
    } else {
      return showRecommendation(invalidEmail, "", true);
    }
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

  function checkName(value: string) {
    const nameRegx = /^[a-z-а-я]+$/i;

    if (!nameRegx.test(value)) {
      if (value === "") {
        const msg = "Поле не должно быть пустым.";
        return showRecommendation(invalidName, msg, false);
      }
      for (let c of value) {
        if (/\d/.test(c) || /\s/.test(c)) {
          const msg = "Имя не должно содержать цифр и пробелов.";
          return showRecommendation(invalidName, msg, false);
        }
        if (/[!@#$%^&*)(+=._<>\\/?]/.test(c)) {
          const msg = "Имя не должно содержать cпецсимволов, кроме дефиса.";
          return showRecommendation(invalidName, msg, false);
        }
      }
    } else {
      return showRecommendation(invalidName, "", true);
    }
  }

  function checkSurname(value: string) {
    const nameRegx = /^[a-z-а-я]+$/i;

    if (!nameRegx.test(value)) {
      if (value === "") {
        const msg = "Поле не должно быть пустым.";
        return showRecommendation(invalidSurname, msg, false);
      }
      for (let c of value) {
        if (/\d/.test(c) || /\s/.test(c)) {
          const msg = "Фамилия не должна содержать цифр и пробелов.";
          return showRecommendation(invalidSurname, msg, false);
        }
        if (/[!@#$%^&*)(+=._<>\\/?]/.test(c)) {
          const msg = "Фамилия не должна содержать cпецсимволов, кроме дефиса.";
          return showRecommendation(invalidSurname, msg, false);
        }
      }
    } else {
      return showRecommendation(invalidSurname, "", true);
    }
  }

  function checkPhoneNum(value: string) {
    const phoneNumRegx = /^([+]?[\d]){8,15}$/;

    if (!phoneNumRegx.test(value)) {
      if (value.length < 8) {
        const msg = "Номер телефона не должен быть короче 8 символов.";
        return showRecommendation(invalidPhoneNum, msg, false);
      }
      if (value.length > 15) {
        const msg = "Номер телефона не должен быть длиннее 15 символов.";
        return showRecommendation(invalidPhoneNum, msg, false);
      }
      if (true) {
        const msg = "Номер телефона  должен состоять из цифр.";
        return showRecommendation(invalidPhoneNum, msg, false);
      }
    } else {
      return showRecommendation(invalidPhoneNum, "", true);
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

// const container = document.querySelector(".profile_info");
// const email = document.createElement("input");
// const myName = document.createElement("input");
// const surname = document.createElement("input");
// const login = document.createElement("input");
// const phoneNum = document.createElement("input");
// email.className = "email";
// myName.className = "name";
// surname.className = "surname";
// login.className = "login";
// phoneNum.className = "phoneNum";
// email.setAttribute("placeholder", "Почта");
// myName.setAttribute("placeholder", "Имя");
// surname.setAttribute("placeholder", "Фамилия");
// login.setAttribute("placeholder", "Логин");
// phoneNum.setAttribute("placeholder", "Телефон");

// const invalidEmail = document.createElement("span");
// const invalidLogin = document.createElement("span");
// const invalidName = document.createElement("span");
// const invalidSurname = document.createElement("span");
// const invalidPhoneNum = document.createElement("span");
// invalidEmail.setAttribute("id", "invalidEmail");
// invalidLogin.setAttribute("id", "invalidLogin");
// invalidName.setAttribute("id", "invalidName");
// invalidSurname.setAttribute("id", "invalidSurname");
// invalidPhoneNum.setAttribute("id", "invalidPhoneNum");

// container.children[0].appendChild(email);
// container.children[0].appendChild(invalidEmail);
// container.children[1].appendChild(myName);
// container.children[1].appendChild(invalidName);
// container.children[2].appendChild(surname);
// container.children[2].appendChild(invalidSurname);
// container.children[3].appendChild(login);
// container.children[3].appendChild(invalidLogin);
// container.children[4].appendChild(phoneNum);
// container.children[4].appendChild(invalidPhoneNum);
