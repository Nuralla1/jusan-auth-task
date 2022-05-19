const form = document.querySelector(".form-container");
const regBtn = document.querySelector(".regBtn");
const signInBtn = document.querySelector(".signInBtn");

const email = document.getElementById("email");
const login = document.getElementById("login");
const myName = document.getElementById("name");
const surname = document.getElementById("surname");
const phoneNum = document.getElementById("phoneNum");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("retryPassword");
const loginLog = document.getElementById("loginLog");
const passwordLog = document.getElementById("passwordLog");

const invalidEmail = document.getElementById("invalidEmail");
const invalidLogin = document.getElementById("invalidLogin");
const invalidName = document.getElementById("invalidName");
const invalidSurname = document.getElementById("invalidSurname");
const invalidPhoneNum = document.getElementById("invalidPhoneNum");
const invalidPass = document.getElementById("invalidPass");
const passNotMatch = document.getElementById("passNotMatch");
const invalidLoginLog = document.getElementById("invalidLoginLog");
const invalidPassLog = document.getElementById("invalidPassLog");

if (regBtn) {
  regBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkEmail(email.value);
    checkLogin(invalidLogin, login.value);
    checkName(myName.value);
    checkSurname(surname.value);
    checkPhoneNum(phoneNum.value);
    checkPassword(invalidPass, password.value);
    checkPasswordMatch(repeatPassword.value);
    if (
      checkEmail(email.value) &&
      checkLogin(invalidLogin, login.value) &&
      checkName(myName.value) &&
      checkSurname(surname.value) &&
      checkPhoneNum(phoneNum.value) &&
      checkPassword(invalidPass, password.value) &&
      checkPasswordMatch(repeatPassword.value)
    ) {
      const info = {};
      info.email = email.value;
      info.login = login.value;
      info.firstName = myName.value;
      info.surname = surname.value;
      info.phoneNum = phoneNum.value;
      info.password = password.value;
      info.repeatPassword = repeatPassword.value;
      console.log(info);
    }
    login.value = "";
    email.value = "";
    myName.value = "";
    surname.value = "";
    phoneNum.value = "";
    password.value = "";
    repeatPassword.value = "";
  });
}

if (
  email &&
  login &&
  myName &&
  surname &&
  phoneNum &&
  password &&
  repeatPassword
) {
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

  repeatPassword.addEventListener("blur", () => {
    checkPasswordMatch(repeatPassword.value);
  });
  repeatPassword.addEventListener("focus", () => {
    checkPasswordMatch(repeatPassword.value);
  });
}

if (signInBtn) {
  signInBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkLogin(invalidLoginLog, loginLog.value);
    checkPassword(invalidPassLog, passwordLog.value);
    if (
      checkLogin(invalidLoginLog, loginLog.value) &&
      checkPassword(invalidPassLog, passwordLog.value)
    ) {
      const info = {};
      info.login = loginLog.value;
      info.password = passwordLog.value;
      console.log(info);
    }
    loginLog.value = "";
    passwordLog.value = "";
  });
}

if (loginLog && passwordLog) {
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
}

function showRecommendation(span, recommendMsg, hiddenResult) {
  span.textContent = recommendMsg;
  span.hidden = hiddenResult;
  return hiddenResult;
}

function checkEmail(value) {
  const emailRegx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegx.test(value)) {
    const msg = "Email нейдействителен.";
    return showRecommendation(invalidEmail, msg, false);
  } else {
    return showRecommendation(invalidEmail, "", true);
  }
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

function checkName(value) {
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
      if (/[!@#\$%\^\&*\)\(+=._<>\\\/?]/.test(c)) {
        const msg = "Имя не должно содержать cпецсимволов, кроме дефиса.";
        return showRecommendation(invalidName, msg, false);
      }
    }
  } else {
    return showRecommendation(invalidName, "", true);
  }
}

function checkSurname(value) {
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
      if (/[!@#\$%\^\&*\)\(+=._<>\\\/?]/.test(c)) {
        const msg = "Фамилия не должна содержать cпецсимволов, кроме дефиса.";
        return showRecommendation(invalidSurname, msg, false);
      }
    }
  } else {
    return showRecommendation(invalidSurname, "", true);
  }
}

function checkPhoneNum(value) {
  const phoneNumRegx = /^([\+]?[\d]){8,15}$/;

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

function checkPasswordMatch(value) {
  if (value === "") {
    const msg = "Поле не должно быть пустым.";
    return showRecommendation(passNotMatch, msg, false);
  }
  if (!(password.value === value)) {
    const msg = "Пароли не совпадают.";
    return showRecommendation(passNotMatch, msg, false);
  } else {
    return showRecommendation(passNotMatch, "", true);
  }
}

//                                       ZAGOTOVKA ESLI NADO BUDET SDELAT' BTN DISABLED PRI NEPRAVIL'NIH DANNYH (NE ZABUD' SDELAT' BTN DISABLED)
// if (regBtn) {
//   window.addEventListener("click", () => {
//     everythingIsCorrectRegPage();
//   });
//   function everythingIsCorrectRegPage() {
//     if (
//       checkEmail(email.value) &&
//       checkLogin(invalidLogin, login.value) &&
//       checkName(myName.value) &&
//       checkSurname(surname.value) &&
//       checkPhoneNum(phoneNum.value) &&
//       checkPassword(invalidPass, password.value) &&
//       checkPasswordMatch(repeatPassword.value)
//     ) {
//       console.log("vnutri");
//       regBtn.disabled = false;
//     } else {
//       regBtn.disabled = true;
//     }
//   }
// }
