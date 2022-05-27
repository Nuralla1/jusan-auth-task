export class Validation {
  showRecommendation(
    span: HTMLElement,
    recommendMsg: string,
    hiddenResult: boolean
  ) {
    span.textContent = recommendMsg;
    span.hidden = hiddenResult;
    return hiddenResult;
  }
  checkEmail(span: HTMLElement, value: string) {
    const emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegx.test(value)) {
      const msg = "Email нейдействителен.";
      return this.showRecommendation(span, msg, false);
    } else {
      return this.showRecommendation(span, "", true);
    }
  }

  checkLogin(span: HTMLElement, value: string) {
    const loginRegx = /(?!^\d+$)^[-\w]{3,15}$/i;

    if (!loginRegx.test(value)) {
      if (value.length < 3) {
        const msg = "Логин не должен быть короче 3 символов.";
        return this.showRecommendation(span, msg, false);
      }
      if (value.length > 15) {
        const msg = "Логин не должен быть длиннее 15 символов.";
        return this.showRecommendation(span, msg, false);
      }
      if (/^\d+$/.test(value)) {
        const msg = "Логин не должен состоять только из цифр.";
        return this.showRecommendation(span, msg, false);
      }
      for (let c of value) {
        if (/[а-я]/i.test(c)) {
          const msg = "Логин  должен состоять из латинских букв.";
          return this.showRecommendation(span, msg, false);
        }
        if (/[!@#$%^&*)(+=.<>?\\/]/.test(c) || /\s/.test(c)) {
          const msg =
            "Логин не должен содержать пробелов и спецсимволов, кроме нижнего подчеркивания и дефиса.";
          return this.showRecommendation(span, msg, false);
        }
      }
    } else {
      return this.showRecommendation(span, "", true);
    }
  }

  checkName(span: HTMLElement, value: string) {
    const nameRegx = /^[a-z-а-я]+$/i;

    if (!nameRegx.test(value)) {
      if (value === "") {
        const msg = "Поле не должно быть пустым.";
        return this.showRecommendation(span, msg, false);
      }
      for (let c of value) {
        if (/\d/.test(c) || /\s/.test(c)) {
          const msg = "Имя не должно содержать цифр и пробелов.";
          return this.showRecommendation(span, msg, false);
        }
        if (/[!@#$%^&*)(+=._<>\\/?]/.test(c)) {
          const msg = "Имя не должно содержать cпецсимволов, кроме дефиса.";
          return this.showRecommendation(span, msg, false);
        }
      }
    } else {
      return this.showRecommendation(span, "", true);
    }
  }

  checkSurname(span: HTMLElement, value: string) {
    const nameRegx = /^[a-z-а-я]+$/i;

    if (!nameRegx.test(value)) {
      if (value === "") {
        const msg = "Поле не должно быть пустым.";
        return this.showRecommendation(span, msg, false);
      }
      for (let c of value) {
        if (/\d/.test(c) || /\s/.test(c)) {
          const msg = "Фамилия не должна содержать цифр и пробелов.";
          return this.showRecommendation(span, msg, false);
        }
        if (/[!@#$%^&*)(+=._<>\\/?]/.test(c)) {
          const msg = "Фамилия не должна содержать cпецсимволов, кроме дефиса.";
          return this.showRecommendation(span, msg, false);
        }
      }
    } else {
      return this.showRecommendation(span, "", true);
    }
  }

  checkPhoneNum(span: HTMLElement, value: string) {
    const phoneNumRegx = /^([+]?[\d]){8,15}$/;

    if (!phoneNumRegx.test(value)) {
      if (value.length < 8) {
        const msg = "Номер телефона не должен быть короче 8 символов.";
        return this.showRecommendation(span, msg, false);
      }
      if (value.length > 15) {
        const msg = "Номер телефона не должен быть длиннее 15 символов.";
        return this.showRecommendation(span, msg, false);
      }
      if (true) {
        const msg = "Номер телефона  должен состоять из цифр.";
        return this.showRecommendation(span, msg, false);
      }
    } else {
      return this.showRecommendation(span, "", true);
    }
  }

  checkPassword(span: HTMLElement, value: string) {
    const passwordRegx = /^(?=.*?[0-9])(?=.*?[!@#$%^&*)(+?=._<>\\/]).{8,30}$/i;

    if (!passwordRegx.test(value)) {
      if (value.length < 8) {
        const msg = "Пароль не должен быть короче 8 символов.";
        return this.showRecommendation(span, msg, false);
      }
      if (value.length > 30) {
        const msg = "Пароль не должен быть длиннее 30 символов.";
        return this.showRecommendation(span, msg, false);
      }
      if (true) {
        const msg = "Пароль  должен содержать хотябы один спецсимвол и цифру.";
        return this.showRecommendation(span, msg, false);
      }
    } else {
      return this.showRecommendation(span, "", true);
    }
  }

  checkPasswordMatch(span: HTMLElement, value: string, pass: HTMLInputElement) {
    if (value === "") {
      const msg = "Поле не должно быть пустым.";
      return this.showRecommendation(span, msg, false);
    }
    if (!(pass.value === value)) {
      const msg = "Пароли не совпадают.";
      return this.showRecommendation(span, msg, false);
    } else {
      return this.showRecommendation(span, "", true);
    }
  }
}
