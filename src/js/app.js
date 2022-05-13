const regBtn = document.querySelector(".regBtn");
const signInBtn = document.querySelector(".signInBtn");

const email = document.getElementById("email");
const login = document.getElementById("login");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const phoneNum = document.getElementById("phoneNum");
const password = document.getElementById("password");
const retryPassword = document.getElementById("retryPassword");
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

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nameReg = /^[a-z-а-я]+$/i;

regBtn.addEventListener("click", () => {
  const info = {};
  info.email = email.value;
  info.login = login.value;
  info.firstName = name.value;
  info.surname = surname.value;
  info.phoneNum = phoneNum.value;
  info.password = password.value;
  info.retryPassword = retryPassword.value;
  console.log(info);
});

email.addEventListener("blur", () => {
  checkEmail(email.value);
});
email.addEventListener("focus", () => {
  checkEmail(email.value);
});

name.addEventListener("blur", () => {
  checkName(name.value);
});
name.addEventListener("focus", () => {
  checkName(name.value);
});

surname.addEventListener("blur", () => {
  checkSurname(surname.value);
});
surname.addEventListener("focus", () => {
  checkSurname(surname.value);
});

function checkEmail(value) {
  if (!emailReg.test(value)) {
    invalidEmail.textContent = "your email is invalid";
    invalidEmail.hidden = false;
  } else {
    invalidEmail.hidden = true;
    invalidEmail.textContent = "";
  }
}

function checkName(value) {
  if (!nameReg.test(value)) {
    invalidName.textContent = "your name is invalid";
    invalidName.hidden = false;
  } else {
    invalidName.hidden = true;
    invalidName.textContent = "";
  }
}

function checkSurname(value) {
  if (!nameReg.test(value)) {
    invalidSurname.textContent = "your surname is invalid";
    invalidSurname.hidden = false;
  } else {
    invalidSurname.hidden = true;
    invalidSurname.textContent = "";
  }
}
